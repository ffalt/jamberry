import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {Component, HostListener, Input, OnChanges, QueryList, SimpleChanges, ViewChild, ViewChildren} from '@angular/core';
import {ComponentCanDeactivate} from '@app/guards/pending-changes/pending-changes.guard';
import {DialogOverlayService} from '@app/modules/dialog-overlay';
import {CellEditor} from '@app/modules/tag-editor/components/cell-editor/cell-editor.class';
import {isDownArrowKey, isLeftRightArrowKeys, isRightArrowKey, isUpDownArrowKeys} from '@app/utils/keys';
import {AdminFolderService, AppService, NotifyService} from '@core/services';
import {FolderType, Jam, JamService} from '@jam';
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
	rawTag?: Jam.RawTag;
	filename?: string;
}

@Component({
	selector: 'app-admin-tag-editor',
	templateUrl: './tag-editor.component.html',
	styleUrls: ['./tag-editor.component.scss']
})
export class TagEditorComponent implements OnChanges, ComponentCanDeactivate {
	folder: Jam.Folder;
	tracks: Array<Jam.Track>;
	editor: TagEditor;
	canLoadRecursive = false;
	activeCol?: RawTagEditColumn;
	isSaving = false;
	@Input() id: string;
	@ViewChildren(CellEditor) cellEditors !: QueryList<CellEditor>;
	// @ViewChild(CdkVirtualScrollViewport, {static: false}) viewPort: CdkVirtualScrollViewport;
	// inverseOfTranslationTop: number = 0;

	constructor(
		private app: AppService, private folderService: AdminFolderService,
		private jam: JamService, private notify: NotifyService, private dialogOverlay: DialogOverlayService) {
		this.editor = new TagEditor(jam);
	}

	onScroll(): void {
		// this.inverseOfTranslationTop = this.viewPort ? -this.viewPort.getOffsetToRenderedContentStart() : 0;
		// setTimeout(() => {
		// 	this.inverseOfTranslationTop = this.viewPort ? -this.viewPort.getOffsetToRenderedContentStart() : 0;
		// });
	}

	// get inverseOfTranslation(): string {
	// const offset = this.viewPort.getOffsetToRenderedContentStart();

	// if (!this.viewPort || !this.viewPort['_renderedContentOffset']) {
	// 	return '-0px';
	// }
	// const offset = this.viewPort['_renderedContentOffset'];
	// return `-${offset}px`;
	// }

	@HostListener('window:beforeunload')
	canDeactivate(): boolean {
		return !this.isSaving;
	}

	ngOnChanges(changes: SimpleChanges): void {
		this.refresh();
	}

	refresh(): void {
		this.folder = undefined;
		this.tracks = undefined;
		this.activeCol = undefined;
		if (this.id) {
			this.jam.folder.id({
				id: this.id,
				folderSubfolders: true,
				folderTracks: true,
				folderParents: true,
				trackTag: true,
				trackRawTag: true
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

	trackByEditFn(index: number, item: RawTagEditRow): string {
		return item.track.id;
	}

	trackByColumnFn(index: number, item: RawTagEditColumn): string {
		return item.def.id + item.def.subid;
	}

	trackByCellFn(index: number, item: RawTagEditCell): string {
		return item.column.def.id + item.column.def.subid;
	}

	loadRecursive(): void {
		if (!this.folder) {
			return;
		}
		this.canLoadRecursive = false;
		this.tracks = undefined;
		this.jam.track.search({childOfID: this.folder.id, trackTag: true, trackRawTag: true})
			.then(tracks => {
				this.tracks = tracks.items.sort((a, b) => {
					const res = a.parentID.localeCompare(b.parentID);
					if (res !== 0) {
						return res;
					}
					return a.name.localeCompare(b.name);
				});
				this.editor.build(this.tracks);
			})
			.catch(e => {
				this.notify.error(e);
			});
	}

	onCellEditorNavigationKeyDown(data: { cell: RawTagEditCell, event: KeyboardEvent }): void {
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
		this.isSaving = true;
		const action = saveActions.shift();
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
					this.editor.updateColumns(this.tracks, data.resultColumns);
				} catch (e) {
					this.notify.error(e);
					return Promise.reject(e);
				}
			},
			onCancelBtn: async () => Promise.resolve()
		});
	}

	brainz(): void {
		if (!this.canDeactivate()) {
			this.notify.error(Error('Saving is in progress'));
		}
		const matching: ReleaseMatching = {
			matchings: this.tracks.map(t =>
				({track: t})),
			apply: () => {
				for (const match of matching.matchings) {
					if (match.track && match.rawTag) {
						match.track.tagRaw = match.rawTag;
					}
				}
				this.editor.build(this.tracks);
				for (const match of matching.matchings) {
					if (match.track && match.rawTag) {
						const edit = this.editor.edits.find(e => e.track === match.track);
						edit.changed = true;
						for (const cell of edit.cells) {
							if (cell.column.def.id !== FilenameColumnID) {
								cell.changed = true;
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

	private async runSave(action: SaveAction, actions: Array<SaveAction>): Promise<void> {
		try {
			if (action.filename) {
				const item = await this.jam.track.name_update({id: action.track.id, name: action.filename});
				this.folderService.waitForQueueResult('Renaming Track', item, [action.track.parentID], [], [action.track.id]);
			}
			if (action.rawTag) {
				const item = await this.jam.track.rawTag_update({id: action.track.id, tag: action.rawTag});
				this.folderService.waitForQueueResult('Writing Track Tag', item, [action.track.parentID], [], [action.track.id]);
			}
			action.edit.saving = false;
			action.edit.tag = action.rawTag;
			action.edit.changed = false;
		} catch (e) {
			return Promise.reject(e);
		}
		const next = actions.shift();
		if (next) {
			await this.runSave(next, actions);
		}
	}

	private display(folder: Jam.Folder): void {
		this.folder = folder;
		this.tracks = folder.tracks.sort((a, b) => a.name.localeCompare(b.name));
		this.editor.build(this.tracks);
		this.canLoadRecursive = this.tracks.length === 0 && folder.folders.length > 0;
		if (this.canLoadRecursive && folder.type === FolderType.multialbum) {
			this.loadRecursive();
		}
	}

}
