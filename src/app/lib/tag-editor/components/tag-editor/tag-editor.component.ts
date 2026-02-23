import { Component, inject, input, type OnChanges, viewChild, viewChildren } from '@angular/core';
import type { ComponentCanDeactivate } from '@core/guards/pending-changes/pending-changes.guard';
import { DialogOverlayService } from '@modules/dialog-overlay';
import { CellEditor } from '../cell-editor/cell-editor.class';
import { isDownArrowKey, isLeftRightArrowKeys, isRightArrowKey, isUpDownArrowKeys } from '@utils/keys';
import { FolderType, type Jam, JamService, TrackOrderFields } from '@jam';
import { TagEditor } from '../../model/tag-editor.class';
import { FilenameColumnID, type RawTagEditCell, type RawTagEditColumn, type RawTagEditRow } from '../../model/tag-editor.types';
import { rebuildTag } from '../../model/tag-editor.utils';
import { DialogChooseColumnsComponent, type SelectColumns } from '../dialog-choose-columns/dialog-choose-columns.component';
import { DialogMatchReleaseComponent } from '../dialog-match-release/dialog-match-release.component';
import type { ReleaseDataMatching, ReleaseMatching } from '../match-release/match-release.component';
import { CellEditorComponent } from '../cell-editor/cell-editor.component';
import { ColumnToolComponent } from '../column-tool/column-tool.component';
import { LoadingComponent } from '@core/components/loading/loading.component';
import { MusicbrainzIconComponent } from '@core/components/musicbrainz-icon/musicbrainz-icon.component';
import { AdminFolderService } from '@core/services/admin-folder/admin-folder.service';
import { NotifyService } from '@core/services/notify/notify.service';
import { ContextMenuModule } from '@modules/ngx-contextmenu/lib/ngx-contextmenu.module';
import { ContextMenuService } from '@modules/ngx-contextmenu/lib/contextmenu.service';
import type { ContextMenuComponent } from '@modules/ngx-contextmenu/lib/contextmenu.component';

export interface SaveAction {
	edit: RawTagEditRow;
	track: Jam.Track;
	rawTag?: Jam.MediaTagRaw;
	filename?: string;
}

@Component({
	selector: 'app-admin-tag-editor',
	templateUrl: './tag-editor.component.html',
	styleUrls: ['./tag-editor.component.scss'],
	host: {
		'(window:beforeunload)': 'canDeactivate()'
	},
	imports: [ContextMenuModule, CellEditorComponent, ColumnToolComponent, LoadingComponent, MusicbrainzIconComponent]
})
export class TagEditorComponent implements OnChanges, ComponentCanDeactivate {
	readonly id = input<string>();
	folder?: Jam.Folder;
	tracks?: Array<Jam.Track>;
	editor: TagEditor;
	canLoadRecursive = false;
	activeCol?: RawTagEditColumn;
	isSaving = false;
	private readonly cellEditors = viewChildren(CellEditor);
	private readonly actionMenu = viewChild<ContextMenuComponent>('actionMenu');
	private readonly folderService = inject(AdminFolderService);
	private readonly contextMenuService = inject(ContextMenuService);
	private readonly jam = inject(JamService);
	private readonly notify = inject(NotifyService);
	private readonly dialogOverlay = inject(DialogOverlayService);

	constructor() {
		this.editor = new TagEditor(this.jam);
	}

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
		const id = this.id();
		if (id) {
			this.jam.folder.id({
				id: id,
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
				})
				.catch((error: unknown) => {
					this.notify.error(error);
				});
		}
	}

	loadRecursive(): void {
		if (!this.folder) {
			return;
		}
		this.canLoadRecursive = false;
		this.tracks = undefined;
		this.jam.track.search({ childOfID: this.folder.id, trackIncTag: true, trackIncRawTag: true, orderBy: TrackOrderFields.filename })
			.then(tracks => {
				this.tracks = tracks.items;
				this.editor.build(this.tracks);
			})
			.catch((error: unknown) => {
				this.notify.error(error);
			});
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
			})
			.catch((error: unknown) => {
				this.isSaving = false;
				for (const edit of edits) {
					edit.saving = false;
				}
				this.notify.error(error);
			});
	}

	prepareEditSave(edit: RawTagEditRow): SaveAction {
		const result: SaveAction = {
			edit,
			track: edit.track
		};
		let changedCells = edit.cells.filter(cell => cell.changed);
		const fileNameCell: RawTagEditCell<{ text: string }> | undefined = changedCells.find(cell => cell.column.def.id === FilenameColumnID);
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
			})
			.catch((error: unknown) => {
				this.isSaving = false;
				this.notify.error(error);
			});
	}

	chooseColumns(): void {
		if (this.isSaving) {
			this.notify.error(new Error('Saving is in progress'));
			return;
		}
		const data = { columns: this.editor.columns, resultColumns: [] };
		this.dialogOverlay.open<SelectColumns>({
			childComponent: DialogChooseColumnsComponent,
			title: 'Choose Columns',
			panelClass: 'overlay-panel-large-buttons',
			data,
			onOkBtn: async () => {
				try {
					if (this.tracks) {
						this.editor.updateColumns(this.tracks, data.resultColumns);
					}
				} catch (error) {
					this.notify.error(error);
					return Promise.reject(error);
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
			this.notify.error(new Error('Saving is in progress'));
			return;
		}
		const matching: ReleaseMatching = {
			folder: this.folder,
			matchings: this.tracks.map(t => ({ track: t })),
			apply: () => {
				this.applyMatching(matching);
			}
		};
		this.dialogOverlay.open<ReleaseMatching>({
			childComponent: DialogMatchReleaseComponent,
			title: 'Release Matching',
			data: matching,
			panelClass: 'overlay-panel-large'
		});
	}

	onContextMenu($event: MouseEvent) {
		this.contextMenuService.show.next({
			contextMenu: this.actionMenu(),
			event: $event,
			item: undefined
		});
		$event.preventDefault();
		$event.stopPropagation();
	}

	onCellEditorNavigationKeyDown(data: { cell: RawTagEditCell<any>; event: KeyboardEvent }): void {
		if (isUpDownArrowKeys(data.event)) {
			this.onCellEditorNavigationKeyDownUpDown(data);
		} else if (isLeftRightArrowKeys(data.event)) {
			this.onCellEditorNavigationKeyDownLeftRight(data);
		}
	}

	private applyMatching(matching: ReleaseMatching) {
		for (const match of matching.matchings) {
			if (match.rawTag) {
				match.track.tagRaw = match.rawTag;
			}
		}
		if (this.tracks) {
			this.editor.build(this.tracks);
			this.applyMatchingTracks(matching);
		}
	}

	private applyMatchingTracks(matching: ReleaseMatching) {
		for (const match of matching.matchings) {
			if (match.rawTag) {
				this.applyMatchingTrack(match);
			}
		}
	}

	private applyMatchingTrack(match: ReleaseDataMatching) {
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

	private onCellEditorNavigationKeyDownLeftRight(data: { cell: RawTagEditCell<any>; event: KeyboardEvent }) {
		const nextIndex = data.cell.parent.cells.indexOf(data.cell) + (isRightArrowKey(data.event) ? 1 : -1);
		const nextcell = nextIndex >= 0 ? data.cell.parent.cells.at(nextIndex) : undefined;
		if (nextcell) {
			const nexteditor = this.cellEditors().find(editor => editor.cell() === nextcell);
			if (nexteditor) {
				setTimeout(() => {
					nexteditor.navigTo();
				});
			}
		}
	}

	private onCellEditorNavigationKeyDownUpDown(data: { cell: RawTagEditCell<any>; event: KeyboardEvent }) {
		const rowIndex = this.editor.edits.indexOf(data.cell.parent);
		const nextRowIndex = rowIndex + (isDownArrowKey(data.event) ? 1 : -1);
		const nextrow = nextRowIndex >= 0 ? this.editor.edits.at(nextRowIndex) : undefined;
		if (nextrow) {
			const nextcell = nextrow.cells.at(data.cell.parent.cells.indexOf(data.cell));
			if (nextcell) {
				const nexteditor = this.cellEditors().find(editor => editor.cell() === nextcell);
				if (nexteditor) {
					setTimeout(() => {
						nexteditor.navigTo();
					});
				}
			}
		}
	}

	private async runSave(action: SaveAction, actions: Array<SaveAction>): Promise<void> {
		try {
			if (action.filename) {
				const item = await this.jam.track.rename({ id: action.track.id, name: action.filename });
				this.folderService.waitForQueueResult('Renaming Track', item, [action.track.parentID], [], [action.track.id]);
			}
			if (action.rawTag) {
				const item = await this.jam.track.rawTagSet({ id: action.track.id, tag: action.rawTag });
				this.folderService.waitForQueueResult('Writing Track Tag', item, [action.track.parentID], [], [action.track.id]);
			}
			action.edit.saving = false;
			if (action.rawTag) {
				action.edit.tag = action.rawTag;
			}
			action.edit.changed = false;
		} catch (error) {
			return Promise.reject(error);
		}
		const next = actions.shift();
		if (next) {
			await this.runSave(next, actions);
		}
	}

	private display(folder: Jam.Folder): void {
		this.folder = folder;
		this.tracks = folder.tracks ?? [];
		this.editor.build(this.tracks);
		this.canLoadRecursive = this.tracks.length === 0 && (folder.folders ?? []).length > 0;
		if (this.canLoadRecursive && folder.type === FolderType.multialbum) {
			this.loadRecursive();
		}
	}
}
