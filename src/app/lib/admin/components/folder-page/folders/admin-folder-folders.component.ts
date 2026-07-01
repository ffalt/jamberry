import { Component, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { type Jam, JamService } from '@jam';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DialogOverlayService } from '@modules/dialog-overlay';
import type { FolderEdit } from '../../../admin.interface';
import { AdminBaseParentViewIdComponent } from '../../admin-base-parent-view-id/admin-base-parent-view-id.component';
import { DialogChooseFolderComponent, type SelectFolder } from '../../dialog-choose-folder/dialog-choose-folder.component';
import { DialogFolderComponent } from '../../dialog-folder/dialog-folder.component';
import { FolderListComponent } from '../../folder-list/folder-list.component';
import { BackgroundTextListComponent } from '@core/components/background-text-list/background-text-list.component';
import { LoadingComponent } from '@core/components/loading/loading.component';
import { AdminFolderService } from '@core/services/admin-folder/admin-folder.service';
import { NotifyService } from '@core/services/notify/notify.service';
import { IconPlusComponent } from '@core/components/icons/icon-plus.component';
import { IconReloadComponent } from '@core/components/icons/icon-reload.component';
import { IconRightBoldComponent } from '@core/components/icons/icon-right-bold.component';

@Component({
	selector: 'app-admin-folder-folders',
	templateUrl: './admin-folder-folders.component.html',
	styleUrls: ['./admin-folder-folders.component.scss'],
	imports: [BackgroundTextListComponent, FolderListComponent, IconPlusComponent, IconReloadComponent, IconRightBoldComponent, LoadingComponent, RouterModule]
})
export class AdminFolderFoldersComponent extends AdminBaseParentViewIdComponent {
	readonly folder = signal<Jam.Folder | undefined>(undefined);
	private readonly jam = inject(JamService);
	private readonly notify = inject(NotifyService);
	private readonly folderService = inject(AdminFolderService);
	private readonly dialogOverlay = inject(DialogOverlayService);

	constructor() {
		super();
		this.folderService.foldersChange
			.pipe(takeUntilDestroyed(this.lifeRef))
			.subscribe(change => {
				if (change.id === this.id) {
					this.refresh();
				}
			});
	}

	override refresh(): void {
		this.folder.set(undefined);
		if (!this.id) {
			return;
		}
		this.jam.folder.id({ id: this.id, folderIncFolders: true, folderIncTag: true })
			.then(data => {
				this.folder.set(data);
			})
			.catch((error: unknown) => {
				this.notify.error(error);
			});
	}

	newFolder(): void {
		const folder = this.folder();
		if (!folder) {
			return;
		}
		const edit: FolderEdit = { folder, name: '' };
		this.dialogOverlay.open<FolderEdit>({
			childComponent: DialogFolderComponent,
			title: 'New Folder',
			data: edit,
			onOkBtn: async () => {
				try {
					this.jam.folder.create({ id: folder.id, name: edit.name })
						.then(item => {
							this.folderService.waitForQueueResult('Creating Folder', item, [], [folder.id]);
						})
						.catch((error: unknown) => {
							this.notify.error(error);
						});
				} catch (error) {
					this.notify.error(error);
					return Promise.reject(error);
				}
			},
			onCancelBtn: async () => Promise.resolve()
		});
	}

	moveSubfolders(): void {
		const folder = this.folder();
		if (!this.id || !folder?.folders) {
			return;
		}
		const id = this.id;
		const folderIDs = folder.folders.map(f => f.id);
		const refreshID = [id, ...folderIDs];
		const data: SelectFolder = {
			selectID: id,
			disableIDs: refreshID
		};
		this.dialogOverlay.open<SelectFolder>({
			childComponent: DialogChooseFolderComponent,
			title: 'Move Subfolders to',
			data,
			panelClass: 'overlay-panel-large-buttons',
			onOkBtn: async () => {
				try {
					const destination = data.folder;
					if (!destination) {
						return;
					}
					refreshID.push(destination.id);
					this.jam.folder.move({ ids: folderIDs, newParentID: destination.id })
						.then(item => {
							this.folderService.waitForQueueResult('Moving Folders', item, [], refreshID);
						})
						.catch((error: unknown) => {
							this.notify.error(error);
						});
				} catch (error) {
					this.notify.error(error);
					return Promise.reject(error);
				}
			},
			onCancelBtn: async () => Promise.resolve()
		});
	}
}
