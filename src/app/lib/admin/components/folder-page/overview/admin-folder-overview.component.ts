import { CommonModule } from '@angular/common';
import { Component, inject, type OnDestroy, type OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FolderType, type Jam, JamService } from '@jam';
import { takeUntil } from 'rxjs';
import { DialogOverlayService } from '@modules/dialog-overlay';
import { isErrorWithCode } from '@utils/errors';
import { FolderTypesAlbum } from '@utils/jam-lists';
import { AdminBaseParentViewIdComponent } from '../../admin-base-parent-view-id/admin-base-parent-view-id.component';
import { ArtworkListComponent } from '../../artwork-list/artwork-list.component';
import { DialogChooseFolderComponent, type SelectFolder } from '../../dialog-choose-folder/dialog-choose-folder.component';
import { DialogFolderArtworkSearchComponent } from '../../dialog-folder-artwork-search/dialog-folder-artwork-search.component';
import { DialogUploadImageComponent } from '../../dialog-upload-image/dialog-upload-image.component';
import type { ArtworkSearch } from '../../folder-artwork-search/folder-artwork-search-image.component';
import { InlineEditComponent } from '../../inline-edit/inline-edit.component';
import { DialogsService } from '@core/services/dialogs/dialogs.service';
import { LoadingComponent } from '@core/components/loading/loading.component';
import { InfoNoteComponent } from '@core/components/info-note/info-note.component';
import { NotifyService } from '@core/services/notify/notify.service';
import { AdminFolderService } from '@core/services/admin-folder/admin-folder.service';

@Component({
	selector: 'app-admin-folder',
	templateUrl: './admin-folder-overview.component.html',
	styleUrls: ['./admin-folder-overview.component.scss'],
	imports: [CommonModule, RouterModule, FormsModule, ArtworkListComponent, InlineEditComponent, LoadingComponent, InfoNoteComponent]
})
export class AdminFolderOverviewComponent extends AdminBaseParentViewIdComponent implements OnInit, OnDestroy {
	name: string = '';
	folder?: Jam.Folder;
	isAlbum: boolean = false;
	isArtist: boolean = false;
	private readonly jam = inject(JamService);
	private readonly notify = inject(NotifyService);
	private readonly dialogsService = inject(DialogsService);
	private readonly dialogOverlay = inject(DialogOverlayService);
	private readonly folderService = inject(AdminFolderService);
	private readonly router = inject(Router);

	ngOnInit(): void {
		super.ngOnInit();
		this.folderService.foldersChange
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(change => {
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
		this.jam.folder.rename({ id, name })
			.then(item => {
				this.folderService.waitForQueueResult('Renaming Folder', item, [id]);
			})
			.catch((error: unknown) => {
				this.notify.error(error);
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
				.catch((error: unknown) => {
					if (isErrorWithCode(error) && (error.code === 404)) {
						this.router.navigate(['/admin/folder/']).catch((error: unknown) => {
							console.error(error);
						});
					} else {
						this.notify.error(error);
					}
				});
		}
	}

	uploadImage(): void {
		this.dialogOverlay.open<{ folder: Jam.Folder }>({
			childComponent: DialogUploadImageComponent,
			title: 'Upload Folder Images',
			data: { folder: this.folder! },
			panelClass: 'overlay-panel-large-buttons'
		});
	}

	searchImages(): void {
		this.dialogOverlay.open<ArtworkSearch>({
			childComponent: DialogFolderArtworkSearchComponent,
			title: 'Search Artwork Images',
			data: { folder: this.folder!, artworks: [] },
			panelClass: 'overlay-panel-large-buttons'
		});
	}

	removeFolder(): void {
		const folder = this.folder;
		if (!folder) {
			return;
		}
		this.dialogsService.confirm('Remove Folder?', `Sure to remove Folder "${folder.name}"?`, () => {
			this.jam.folder.remove({ id: folder.id })
				.then(item => {
					if (folder.parentID) {
						this.router.navigate([`/admin/folder/${folder.parentID}/overview`]).catch((error: unknown) => {
							console.error(error);
						});
					}
					this.folderService.waitForQueueResult('Removing Folder', item, [folder.id], folder.parentID ? [folder.parentID] : []);
				})
				.catch((error: unknown) => {
					this.notify.error(error);
				});
		});
	}

	moveFolder(): void {
		const folder = this.folder;
		if (!folder) {
			return;
		}
		const data: SelectFolder = { selectID: folder.id, disableIDs: [folder.id] };
		this.dialogOverlay.open<SelectFolder>({
			childComponent: DialogChooseFolderComponent,
			title: 'Move Folder to',
			data,
			panelClass: 'overlay-panel-large-buttons',
			onOkBtn: async () => {
				const destination = data.folder;
				if (!destination) {
					return;
				}
				try {
					this.jam.folder.move({ ids: [folder.id], newParentID: destination.id })
						.then(item => {
							this.folderService.waitForQueueResult('Moving Folder', item, [folder.id], [...(folder.parentID ? [folder.parentID] : []), destination.id]);
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

	private display(folder?: Jam.Folder): void {
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
