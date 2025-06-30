import {FolderEdit} from '@admin/admin.interface';
import {Component, OnDestroy, OnInit, inject} from '@angular/core';
import {DialogOverlayService} from '@app/modules/dialog-overlay';
import {AdminFolderService, NotifyService} from '@core/services';
import {Jam, JamService} from '@jam';
import {takeUntil} from 'rxjs/operators';
import {AdminBaseParentViewIdComponent} from '../../admin-base-parent-view-id/admin-base-parent-view-id.component';
import {DialogChooseFolderComponent, SelectFolder} from '../../dialog-choose-folder/dialog-choose-folder.component';
import {DialogFolderComponent} from '../../dialog-folder/dialog-folder.component';

@Component({
	selector: 'app-admin-folder-folders',
	templateUrl: './admin-folder-folders.component.html',
	styleUrls: ['./admin-folder-folders.component.scss'],
	standalone: false
})
export class AdminFolderFoldersComponent extends AdminBaseParentViewIdComponent implements OnInit, OnDestroy {
	folder: Jam.Folder | undefined;
	private readonly jam = inject(JamService);
	private readonly notify = inject(NotifyService);
	private readonly folderService = inject(AdminFolderService);
	private readonly dialogOverlay = inject(DialogOverlayService);

	ngOnInit(): void {
		super.ngOnInit();
		this.folderService.foldersChange
			.pipe(takeUntil(this.unsubscribe)).subscribe(change => {
			if (change.id === this.id) {
				this.refresh();
			}
		});
	}

	ngOnDestroy(): void {
		super.ngOnDestroy();
	}

	refresh(): void {
		this.folder = undefined;
		if (!this.id) {
			return;
		}
		this.jam.folder.id({id: this.id, folderIncFolders: true, folderIncTag: true})
			.then(data => {
				this.folder = data;
			})
			.catch(e => {
				this.notify.error(e);
			});
	}

	newFolder(): void {
		if (!this.folder) {
			return;
		}
		const folder = this.folder;
		const edit: FolderEdit = {folder, name: ''};
		this.dialogOverlay.open({
			childComponent: DialogFolderComponent,
			title: 'New Folder',
			data: edit,
			onOkBtn: async () => {
				try {
					this.jam.folder.create({id: folder.id, name: edit.name})
						.then(item => {
							this.folderService.waitForQueueResult('Creating Folder', item, [], [folder.id]);
						})
						.catch(e => {
							this.notify.error(e);
						});
				} catch (e: any) {
					this.notify.error(e);
					return Promise.reject(e);
				}
			},
			onCancelBtn: async () => Promise.resolve()
		});
	}

	moveSubfolders(): void {
		if (!this.id || !this.folder?.folders) {
			return;
		}
		const id = this.id;
		const folderIDs = this.folder.folders.map(f => f.id);
		const refreshID = [id].concat(folderIDs);
		const data: SelectFolder = {
			selectID: id,
			disableIDs: refreshID
		};
		this.dialogOverlay.open({
			title: 'Move Subfolders to',
			childComponent: DialogChooseFolderComponent,
			data,
			panelClass: 'overlay-panel-large-buttons',
			onOkBtn: async () => {
				try {
					const destination = data.folder;
					if (!destination) {
						return;
					}
					refreshID.push(destination.id);
					this.jam.folder.move({ids: folderIDs, newParentID: destination.id})
						.then(item => {
							this.folderService.waitForQueueResult('Moving Folders', item, [], refreshID);
						})
						.catch(e => {
							this.notify.error(e);
						});
				} catch (e: any) {
					this.notify.error(e);
					return Promise.reject(e);
				}
			},
			onCancelBtn: async () => Promise.resolve()
		});
	}
}
