import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogOverlayService} from '@app/modules/dialog-overlay';
import {FolderTypesAlbum} from '@app/utils/jam-lists';
import {AdminFolderService, AppService, NotifyService} from '@core/services';
import {FolderType, Jam, JamService} from '@jam';
import {DialogsService} from '@shared/services';
import {takeUntil} from 'rxjs/operators';
import {AdminBaseParentViewIdComponent} from '../../admin-base-parent-view-id/admin-base-parent-view-id.component';
import {DialogChooseFolderComponent, SelectFolder} from '../../dialog-choose-folder/dialog-choose-folder.component';
import {DialogFolderArtworkSearchComponent} from '../../dialog-folder-artwork-search/dialog-folder-artwork-search.component';
import {DialogUploadImageComponent} from '../../dialog-upload-image/dialog-upload-image.component';

@Component({
	selector: 'app-admin-folder',
	templateUrl: './admin-folder-overview.component.html',
	styleUrls: ['./admin-folder-overview.component.scss']
})
export class AdminFolderOverviewComponent extends AdminBaseParentViewIdComponent implements OnInit, OnDestroy {
	name: string = '';
	folder?: Jam.Folder;
	isAlbum: boolean = false;
	isArtist: boolean = false;

	constructor(
		route: ActivatedRoute, private app: AppService, private jam: JamService, private notify: NotifyService,
		private dialogsService: DialogsService, private dialogOverlay: DialogOverlayService,
		private folderService: AdminFolderService, private router: Router) {
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

	editFolderName(): void {
		if (!this.folder) {
			return;
		}
		const name = (this.name || '').trim();
		if (name.length === 0 || name === this.folder.name) {
			this.name = this.folder.name;
			return;
		}
		const id = this.folder.id;
		this.jam.folder.rename({id, name})
			.then(item => {
				this.folderService.waitForQueueResult('Renaming Folder', item, [id]);
			})
			.catch(e => {
				this.notify.error(e);
			});
	}

	refresh(): void {
		if (this.id) {
			this.jam.folder.id({
				id: this.id,
				folderIncTag: true,
				folderIncParents: true,
				folderIncArtworks: true,
				folderIncChildFolderCount: true,
				folderIncTrackCount: true
			})
				.then(data => {
					this.display(data);
				})
				.catch(e => {
					if (e.code === 404) {
						this.router.navigate(['/admin/folder/'])
							.catch(err => {
								console.error(err);
							});
					} else {
						this.notify.error(e);
					}
				});
		}
	}

	uploadImage(): void {
		this.dialogOverlay.open({
			title: 'Upload Folder Images',
			childComponent: DialogUploadImageComponent,
			data: {folder: this.folder},
			panelClass: 'overlay-panel-large-buttons'
		});
	}

	searchImages(): void {
		this.dialogOverlay.open({
			title: 'Search Artwork Images',
			childComponent: DialogFolderArtworkSearchComponent,
			data: {folder: this.folder},
			panelClass: 'overlay-panel-large-buttons'
		});
	}

	removeFolder(): void {
		const folder = this.folder;
		if (!folder) {
			return;
		}
		this.dialogsService.confirm('Remove Folder?', `Sure to remove Folder "${folder.name}"?`, () => {
			this.jam.folder.remove({id: folder.id})
				.then(item => {
					if (folder.parentID) {
						this.router.navigate([`/admin/folder/${folder.parentID}/overview`])
							.catch(err => {
								console.error(err);
							});
					}
					this.folderService.waitForQueueResult('Removing Folder', item, [folder.id], folder.parentID ? [folder.parentID] : []);
				})
				.catch(e => {
					this.notify.error(e);
				});
		});
	}

	moveFolder(): void {
		const folder = this.folder;
		if (!folder) {
			return;
		}
		const data: SelectFolder = {selectID: folder.id, disableIDs: [folder.id]};
		this.dialogOverlay.open({
			title: 'Move Folder to',
			childComponent: DialogChooseFolderComponent,
			data,
			panelClass: 'overlay-panel-large-buttons',
			onOkBtn: async () => {
				const destination = data.folder;
				if (!destination) {
					return;
				}
				try {
					this.jam.folder.move({ids: [folder.id], newParentID: destination.id})
						.then(item => {
							this.folderService.waitForQueueResult('Moving Folder', item, [folder.id], (folder.parentID ? [folder.parentID] : []).concat([destination.id]));
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

	private display(folder: Jam.Folder): void {
		this.name = '';
		this.isAlbum = false;
		this.isArtist = false;
		this.folder = folder;
		if (!folder) {
			return;
		}
		this.name = folder.name;
		this.isAlbum = FolderTypesAlbum.includes(folder.type);
		this.isArtist = folder.type === FolderType.artist;
	}

}
