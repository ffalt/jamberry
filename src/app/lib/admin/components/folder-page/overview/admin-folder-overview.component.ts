import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FolderType, type Jam, JamService } from '@jam';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DialogOverlayRef, DialogOverlayService } from '@modules/dialog-overlay';
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
import { IconPictureComponent } from '@core/components/icons/icon-picture.component';
import { IconReloadComponent } from '@core/components/icons/icon-reload.component';
import { IconRightBoldComponent } from '@core/components/icons/icon-right-bold.component';
import { IconTrashComponent } from '@core/components/icons/icon-trash.component';
import { IconUploadCloudComponent } from '@core/components/icons/icon-upload-cloud.component';

@Component({
	selector: 'app-admin-folder',
	templateUrl: './admin-folder-overview.component.html',
	styleUrls: ['./admin-folder-overview.component.scss'],
	imports: [ArtworkListComponent, FormsModule, IconPictureComponent, IconReloadComponent, IconRightBoldComponent, IconTrashComponent, IconUploadCloudComponent, InfoNoteComponent, InlineEditComponent, LoadingComponent, RouterModule]
})
export class AdminFolderOverviewComponent extends AdminBaseParentViewIdComponent {
	name: string = '';
	readonly folder = signal<Jam.Folder | undefined>(undefined);
	readonly isArtist = computed(() => this.folder()?.type === FolderType.artist);
	readonly isAlbum = computed(() => {
		const f = this.folder();
		return f ? FolderTypesAlbum.includes(f.type) : false;
	});

	private readonly jam = inject(JamService);
	private readonly notify = inject(NotifyService);
	private readonly dialogsService = inject(DialogsService);
	private readonly dialogOverlay = inject(DialogOverlayService);
	private readonly folderService = inject(AdminFolderService);
	private readonly router = inject(Router);

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

	editFolderName(): void {
		const folder = this.folder();
		if (!folder) {
			return;
		}
		const name = (this.name || '').trim();
		if (name.length === 0 || name === folder.name) {
			this.name = folder.name;
			return;
		}
		const id = folder.id;
		this.jam.folder.rename({ id, name })
			.then(item => {
				this.folderService.waitForQueueResult('Renaming Folder', item, [id]);
			})
			.catch((error: unknown) => {
				this.notify.error(error);
			});
	}

	override refresh(): void {
		if (!this.id) {
			return;
		}
		this.jam.folder.id({
			id: this.id,
			folderIncTag: true,
			folderIncParents: true,
			folderIncArtworks: true,
			folderIncTrackInSubtreeCount: true,
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

	registerRefresh(ref: DialogOverlayRef): void {
		ref
			.afterClosed()
			.pipe(takeUntilDestroyed(this.lifeRef))
			.subscribe(() => {
				this.refresh();
			});
	}

	uploadImage(): void {
		this.registerRefresh(
			this.dialogOverlay.open<{ folder: Jam.Folder }>({
				childComponent: DialogUploadImageComponent,
				title: 'Upload Folder Images',
				data: { folder: this.folder()! }
			})
		);
	}

	searchImages(): void {
		this.registerRefresh(
			this.dialogOverlay.open<ArtworkSearch>({
				childComponent: DialogFolderArtworkSearchComponent,
				title: 'Search Artwork Images',
				data: { folder: this.folder()!, artworks: [] },
				panelClass: 'overlay-panel-large-buttons'
			})
		);
	}

	removeFolder(): void {
		const folder = this.folder();
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
		const folder = this.folder();
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
		this.name = folder?.name ?? '';
		this.folder.set(folder);
	}
}
