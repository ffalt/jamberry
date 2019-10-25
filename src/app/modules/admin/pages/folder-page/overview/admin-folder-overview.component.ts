import {AdminBaseParentViewIdComponent} from '@admin/components/admin-base-parent-view-id/admin-base-parent-view-id.component';
import {DialogAlbumImageComponent} from '@admin/components/dialog-album-image/dialog-album-image-component';
import {DialogArtistImageComponent} from '@admin/components/dialog-artist-image/dialog-artist-image-component';
import {DialogChooseFolderComponent, SelectFolder} from '@admin/components/dialog-choose-folder/dialog-choose-folder.component';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogOverlayService} from '@app/modules/dialog-overlay';
import {AdminFolderService, AppService, DialogsService, NotifyService} from '@core/services';
import {FolderType, FolderTypesAlbum, Jam, JamService} from '@jam';
import {takeUntil} from 'rxjs/operators';

@Component({
	selector: 'app-admin-folder',
	templateUrl: './admin-folder-overview.component.html',
	styleUrls: ['./admin-folder-overview.component.scss']
})
export class AdminFolderOverviewComponent extends AdminBaseParentViewIdComponent implements OnInit, OnDestroy {
	name: string = '';
	folder: Jam.Folder;
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
		const name = (this.name || '').trim();
		if (name.length === 0 || name === this.folder.name) {
			this.name = this.folder.name;
			return;
		}
		const id = this.id;
		this.jam.folder.name_update({id, name})
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
				folderTag: true,
				folderParents: true,
				folderArtworks: true,
				folderCounts: true
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

	searchAlbumImages(folder: Jam.Folder): void {
		this.dialogOverlay.open({
			title: 'Search Album Images',
			childComponent: DialogAlbumImageComponent,
			data: {folder},
			panelClass: 'overlay-panel-large-buttons'
		});
	}

	searchArtistImages(folder: Jam.Folder): void {
		this.dialogOverlay.open({
			title: 'Search Artist Images',
			childComponent: DialogArtistImageComponent,
			data: {folder},
			panelClass: 'overlay-panel-large-buttons'
		});
	}

	refreshArtworks(): void {
		if (this.folder) {
			const folder = this.folder;
			this.jam.folder.artworks({id: this.folder.id})
				.then(art => {
					folder.artworks = art;
				})
				.catch(e => {
					this.notify.error(e);
				});
		}
	}

	removeFolder(): void {
		const folder = this.folder;
		this.dialogsService.confirm('Remove Folder?', `Sure to remove Folder "${folder.name}"?`, () => {
			this.jam.folder.delete({id: folder.id})
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
		const data: SelectFolder = {
			selectID: this.id,
			disableIDs: [this.id]
		};
		this.dialogOverlay.open({
			title: 'Move Folder to',
			childComponent: DialogChooseFolderComponent,
			data,
			panelClass: 'overlay-panel-large-buttons',
			onOkBtn: async () => {
				try {
					this.jam.folder.parent_update({ids: [this.folder.id], folderID: data.folder.id})
						.then(item => {
							this.folderService.waitForQueueResult('Moving Folder', item, [this.folder.id], [this.folder.parentID, data.folder.id]);
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
		this.isAlbum = FolderTypesAlbum.includes(folder.type as FolderType);
		this.isArtist = folder.type === FolderType.artist;
	}

}
