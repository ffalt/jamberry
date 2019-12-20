import {FolderEdit} from '@admin/admin.interface';
import {AdminBaseParentViewIdComponent} from '@admin/components/admin-base-parent-view-id/admin-base-parent-view-id.component';
import {DialogChooseFolderComponent, SelectFolder} from '@admin/components/dialog-choose-folder/dialog-choose-folder.component';
import {DialogFolderComponent} from '@admin/components/dialog-folder/dialog-folder.component';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DialogOverlayService} from '@app/modules/dialog-overlay';
import {AdminFolderService, DialogsService, NotifyService} from '@core/services';
import {Jam, JamService} from '@jam';
import {takeUntil} from 'rxjs/operators';

@Component({
	selector: 'app-admin-folder-folders',
	templateUrl: './admin-folder-folders.component.html',
	styleUrls: ['./admin-folder-folders.component.scss']
})
export class AdminFolderFoldersComponent extends AdminBaseParentViewIdComponent implements OnInit, OnDestroy {
	folder: Jam.Folder | undefined;

	constructor(
		route: ActivatedRoute, private jam: JamService, private notify: NotifyService, private folderService: AdminFolderService,
		private dialogsService: DialogsService, private dialogOverlay: DialogOverlayService
	) {
		super(route);
	}

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
		this.jam.folder.id({id: this.id, folderSubfolders: true, folderTag: true})
			.then(data => {
				this.folder = data;
			})
			.catch(e => {
				this.notify.error(e);
			});
	}

	newFolder(): void {
		const edit: FolderEdit = {folder: this.folder, name: ''};
		this.dialogOverlay.open({
			childComponent: DialogFolderComponent,
			title: 'New Folder',
			data: edit,
			onOkBtn: async () => {
				try {
					this.jam.folder.create({id: edit.folder.id, name: edit.name})
						.then(item => {
							this.folderService.waitForQueueResult('Creating Folder', item, [], [edit.folder.id]);
						})
						.catch(e => {
							this.notify.error(e);
						});
				} catch (e) {
					this.notify.error(e);
					return Promise.reject(e);
				}
			},
			onCancelBtn: async () => Promise.resolve()
		});
	}

	moveSubfolders(): void {
		const folderIDs = this.folder.folders.map(f => f.id);
		const refreshID = [this.id].concat(folderIDs);
		const data: SelectFolder = {
			selectID: this.id,
			disableIDs: refreshID
		};
		this.dialogOverlay.open({
			title: 'Move Subfolders to',
			childComponent: DialogChooseFolderComponent,
			data,
			panelClass: 'overlay-panel-large-buttons',
			onOkBtn: async () => {
				try {
					refreshID.push(data.folder.id);
					this.jam.folder.parent_update({ids: folderIDs, folderID: data.folder.id})
						.then(item => {
							this.folderService.waitForQueueResult('Moving Folders', item, [], refreshID);
						})
						.catch(e => {
							this.notify.error(e);
						});
				} catch (e) {
					this.notify.error(e);
					return Promise.reject(e);
				}
			},
			onCancelBtn: async () => Promise.resolve()
		});
	}

}
