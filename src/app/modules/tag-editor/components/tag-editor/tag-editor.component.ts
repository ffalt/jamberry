import {Component, HostListener, Input, OnChanges, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {ComponentCanDeactivate} from '@app/guards/pending-changes/pending-changes.guard';
import {DialogOverlayService} from '@app/modules/dialog-overlay';
import {CellEditor} from '@app/modules/tag-editor/components/cell-editor/cell-editor.class';
import {isDownArrowKey, isLeftRightArrowKeys, isRightArrowKey, isUpDownArrowKeys} from '@app/utils/keys';
import {AdminFolderService, AppService, NotifyService} from '@core/services';
import {FolderType, Jam, JamService, TrackOrderFields} from '@jam';
import {ContextMenuComponent, ContextMenuService} from '@app/modules/ngx-contextmenu';
import {TagEditor} from '../../model/tag-editor.class';
import {FilenameColumnID, RawTagEditCell, RawTagEditColumn, RawTagEditRow} from '../../model/tag-editor.types';
import {rebuildTag} from '../../model/tag-editor.utils';
import {AlbumValuesEdit, DialogAlbumComponent} from '../dialog-album/dialog-album.component';
import {DialogChooseColumnsComponent} from '../dialog-choose-columns/dialog-choose-columns.component';
import {DialogMatchReleaseComponent} from '../dialog-match-release/dialog-match-release.component';
import {ReleaseMatching} from '../match-release/match-release.component';

export interface SaveAction {
	edit: RawTagEditRow;
	track: Jam.Track;
	rawTag?: Jam.MediaTagRaw;
	filename?: string;
}

@Component({
	selector: 'app-admin-tag-editor',
	templateUrl: './tag-editor.component.html',
	styleUrls: ['./tag-editor.component.scss']
})
export class TagEditorComponent implements OnChanges, ComponentCanDeactivate {
	folder?: Jam.Folder;
	tracks?: Array<Jam.Track>;
	editor: TagEditor;
	canLoadRecursive = false;
	activeCol?: RawTagEditColumn;
	isSaving = false;
	@Input() id?: string;
	@ViewChildren(CellEditor) cellEditors!: QueryList<CellEditor>;
	@ViewChild('actionMenu', {static: false}) actionMenu?: ContextMenuComponent;

	constructor(
		private app: AppService, private folderService: AdminFolderService,	private contextMenuService: ContextMenuService,
		private jam: JamService, private notify: NotifyService, private dialogOverlay: DialogOverlayService) {
		this.editor = new TagEditor(jam);
	}

	onScroll(): void {
		//
	}

	@HostListener('window:beforeunload')
	canDeactivate(): boolean {
		return !this.isSaving;
	}

	ngOnChanges(): void {
		this.refresh();
	}

	refresh(): void {
		this.folder = undefined;
		this.tracks = undefined;
		this.activeCol = undefined;
		if (this.id) {
			this.jam.folder.id({
				id: this.id,
				folderIncFolders: true,
				folderIncTracks: true,
				folderIncParents: true,
				folderIncTag: true,
				trackIncTag: true,
				trackIncRawTag: true,
				folderChildIncTag: true
			})
				.then(data => {
					this.display(data);
					// 	this.brainz();
				})
				.catch(e => {
					this.notify.error(e);
				});
		}
	}

	loadRecursive(): void {
		if (!this.folder) {
			return;
		}
		this.canLoadRecursive = false;
		this.tracks = undefined;
		this.jam.track.search({childOfID: this.folder.id, trackIncTag: true, trackIncRawTag: true, orderBy: TrackOrderFields.filename})
			.then(tracks => {
				this.tracks = tracks.items;
				this.editor.build(this.tracks);
			})
			.catch(e => {
				this.notify.error(e);
			});
	}

	onCellEditorNavigationKeyDown(data: { cell: RawTagEditCell; event: KeyboardEvent }): void {
		if (isUpDownArrowKeys(data.event)) {
			const rowIndex = this.editor.edits.findIndex(e => e === data.cell.parent);
			const nextrow = this.editor.edits[rowIndex + (isDownArrowKey(data.event) ? 1 : -1)];
			if (nextrow) {
				const nextcell = nextrow.cells[data.cell.parent.cells.indexOf(data.cell)];
				if (nextcell) {
					const nexteditor = this.cellEditors.find(editor => editor.cell === nextcell);
					if (nexteditor) {
						setTimeout(() => {
							nexteditor.navigTo();
						});
					}
				}
			}
		} else if (isLeftRightArrowKeys(data.event)) {
			const nextcell = data.cell.parent.cells[data.cell.parent.cells.indexOf(data.cell) + (isRightArrowKey(data.event) ? 1 : -1)];
			if (nextcell) {
				const nexteditor = this.cellEditors.find(editor => editor.cell === nextcell);
				if (nexteditor) {
					setTimeout(() => {
						nexteditor.navigTo();
					});
				}
			}
		}
	}

	save(): void {
		if (this.isSaving) {
			return;
		}
		const edits = this.editor.edits.filter(ed => ed.changed);
		if (edits.length === 0) {
			return;
		}
		const saveActions: Array<SaveAction> = [];
		for (const edit of edits) {
			edit.saving = true;
			saveActions.push(this.prepareEditSave(edit));
		}
		const action = saveActions.shift();
		if (!action) {
			return;
		}
		this.isSaving = true;
		this.runSave(action, saveActions)
			.then(() => {
				this.isSaving = false;
			}).catch(e => {
			this.isSaving = false;
			for (const edit of edits) {
				edit.saving = false;
			}
			this.notify.error(e);
		});
	}

	prepareEditSave(edit: RawTagEditRow): SaveAction {
		const result: SaveAction = {
			edit,
			track: edit.track
		};
		let changedCells = edit.cells.filter(cell => cell.changed);
		const fileNameCell = changedCells.find(cell => cell.column.def.id === FilenameColumnID);
		if (fileNameCell) {
			changedCells = changedCells.filter(cell => cell.column.def.id !== FilenameColumnID);
			const filename = fileNameCell.frames[0].value.text;
			if (filename && edit.track.name !== filename) {
				result.filename = filename;
			}
		}
		if (changedCells.length > 0) {
			result.rawTag = rebuildTag(edit);
		}
		return result;
	}

	saveEdit(edit: RawTagEditRow): void {
		if (!edit.changed || this.isSaving) {
			return;
		}
		this.isSaving = true;
		const action = this.prepareEditSave(edit);
		this.runSave(action, [])
			.then(() => {
				this.isSaving = false;
			}).catch(e => {
			this.isSaving = false;
			this.notify.error(e);
		});
	}

	chooseColumns(): void {
		if (this.isSaving) {
			this.notify.error(Error('Saving is in progress'));
		}
		const data = {columns: this.editor.columns, resultColumns: []};
		this.dialogOverlay.open({
			title: 'Choose Columns',
			childComponent: DialogChooseColumnsComponent,
			panelClass: 'overlay-panel-large-buttons',
			data,
			onOkBtn: async () => {
				try {
					if (this.tracks) {
						this.editor.updateColumns(this.tracks, data.resultColumns);
					}
				} catch (e: any) {
					this.notify.error(e);
					return Promise.reject(e);
				}
			},
			onCancelBtn: async () => Promise.resolve()
		});
	}

	brainz(): void {
		if (!this.folder || !this.tracks) {
			return;
		}
		if (!this.canDeactivate()) {
			this.notify.error(Error('Saving is in progress'));
		}
		const matching: ReleaseMatching = {
			folder: this.folder,
			matchings: this.tracks.map(t =>
				({track: t})),
			apply: () => {
				for (const match of matching.matchings) {
					if (match.track && match.rawTag) {
						match.track.tagRaw = match.rawTag;
					}
				}
				if (this.tracks) {
					this.editor.build(this.tracks);
					for (const match of matching.matchings) {
						if (match.track && match.rawTag) {
							const edit = this.editor.edits.find(e => e.track === match.track);
							if (edit) {
								edit.changed = true;
								for (const cell of edit.cells) {
									if (cell.column.def.id !== FilenameColumnID) {
										cell.changed = true;
									}
								}
							}
						}
					}
				}
			}
		};
		this.dialogOverlay.open({
			title: 'Release Matching',
			childComponent: DialogMatchReleaseComponent,
			data: matching,
			panelClass: 'overlay-panel-large'
		});
	}

	editAlbumValues(): void {
		if (!this.canDeactivate()) {
			this.notify.error(Error('Saving is in progress'));
		}
		if (!this.tracks) {
			return;
		}
		const data: AlbumValuesEdit = {
			tracks: this.tracks
		};
		this.dialogOverlay.open({
			title: 'Edit Album Values',
			childComponent: DialogAlbumComponent,
			data,
			onOkBtn: async () => Promise.resolve(),
			onCancelBtn: async () => Promise.resolve()
		});
	}

	onContextMenu($event: MouseEvent) {
		this.contextMenuService.show.next({
			contextMenu: this.actionMenu,
			event: $event,
			item: undefined
		});
		$event.preventDefault();
		$event.stopPropagation();
	}

	private async runSave(action: SaveAction, actions: Array<SaveAction>): Promise<void> {
		try {
			if (action.filename) {
				const item = await this.jam.track.rename({id: action.track.id, name: action.filename});
				this.folderService.waitForQueueResult('Renaming Track', item, [action.track.parentID], [], [action.track.id]);
			}
			if (action.rawTag) {
				const item = await this.jam.track.rawTagSet({id: action.track.id, tag: action.rawTag});
				this.folderService.waitForQueueResult('Writing Track Tag', item, [action.track.parentID], [], [action.track.id]);
			}
			action.edit.saving = false;
			if (action.rawTag) {
				action.edit.tag = action.rawTag;
			}
			action.edit.changed = false;
		} catch (e: any) {
			return Promise.reject(e);
		}
		const next = actions.shift();
		if (next) {
			await this.runSave(next, actions);
		}
	}

	private display(folder: Jam.Folder): void {
		this.folder = folder;
		this.tracks = folder.tracks || []; // .sort((a, b) => a.name.localeCompare(b.name));
		this.editor.build(this.tracks);
		this.canLoadRecursive = this.tracks.length === 0 && (folder.folders || []).length > 0;
		if (this.canLoadRecursive && folder.type === FolderType.multialbum) {
			this.loadRecursive();
		}
	}

}
