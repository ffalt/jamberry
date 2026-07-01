import { Component, inject, signal, viewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { type Jam, JamService } from '@jam';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DialogOverlayService } from '@modules/dialog-overlay';
import { AdminBaseParentViewIdComponent } from '../../admin-base-parent-view-id/admin-base-parent-view-id.component';
import { DialogChooseFolderComponent, type SelectFolder } from '../../dialog-choose-folder/dialog-choose-folder.component';
import { TrackListComponent } from '../../track-list/track-list.component';
import { DialogsService } from '@core/services/dialogs/dialogs.service';
import { BackgroundTextListComponent } from '@core/components/background-text-list/background-text-list.component';
import { LoadingComponent } from '@core/components/loading/loading.component';
import { NotifyService } from '@core/services/notify/notify.service';
import { AdminFolderService } from '@core/services/admin-folder/admin-folder.service';
import { IconReloadComponent } from '@core/components/icons/icon-reload.component';
import { IconRightBoldComponent } from '@core/components/icons/icon-right-bold.component';
import { IconTrashComponent } from '@core/components/icons/icon-trash.component';

@Component({
	selector: 'app-admin-folder-tracks',
	templateUrl: './admin-folder-tracks.component.html',
	styleUrls: ['./admin-folder-tracks.component.scss'],
	imports: [BackgroundTextListComponent, IconReloadComponent, IconRightBoldComponent, IconTrashComponent, LoadingComponent, RouterModule, TrackListComponent]
})
export class AdminFolderTracksComponent extends AdminBaseParentViewIdComponent {
	readonly folder = signal<Jam.Folder | undefined>(undefined);
	private readonly tracks = viewChild(TrackListComponent);
	private readonly jam = inject(JamService);
	private readonly notify = inject(NotifyService);
	private readonly folderService = inject(AdminFolderService);
	private readonly dialogsService = inject(DialogsService);
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

	deleteTracks(): void {
		const ids = this.getTrackIDs();
		if (ids.length === 0) {
			return;
		}
		this.dialogsService.confirm('Remove Tracks?', `Sure to remove ${ids.length} Track${ids.length > 1 ? 's' : ''}?`, () => {
			for (const id of ids) {
				this.jam.track.remove({ id })
					.then(item => {
						this.folderService.waitForQueueResult('Removing Track', item, [], [], [id]);
					})
					.catch((error: unknown) => {
						this.notify.error(error);
					});
			}
		});
	}

	getTrackIDs(): Array<string> {
		const tracks = this.tracks();
		const folder = this.folder();
		if (!tracks?.trackItems || !folder?.tracks) {
			return [];
		}
		const selection = tracks.trackItems.filter(t => t.selected).map(t => t.track.id);
		return (selection.length > 0) ? selection : folder.tracks.map(t => t.id);
	}

	moveTracks(): void {
		const ids = this.getTrackIDs();
		if (ids.length === 0) {
			return;
		}
		const data: SelectFolder = {
			selectID: this.id
		};
		this.dialogOverlay.open<SelectFolder>({
			childComponent: DialogChooseFolderComponent,
			title: 'Move Tracks to',
			data,
			panelClass: 'overlay-panel-large-buttons',
			onOkBtn: async () => {
				const destination = data.folder;
				if (!destination) {
					return;
				}
				const folder = this.folder();
				this.jam.track.move({ ids, folderID: destination.id })
					.then(item => {
						this.folderService.waitForQueueResult('Moving Tracks', item, [],
							[destination.id, ...(folder?.parentID ? [folder.parentID] : [])], ids);
					})
					.catch((error: unknown) => {
						this.notify.error(error);
					});
				return Promise.resolve();
			},
			onCancelBtn: async () => Promise.resolve()
		});
	}

	override refresh(): void {
		this.folder.set(undefined);
		if (!this.id) {
			return;
		}
		this.jam.folder.id({ id: this.id, folderIncTracks: true, trackIncTag: true, trackIncMedia: true })
			.then(data => {
				this.folder.set(data);
			})
			.catch((error: unknown) => {
				this.notify.error(error);
			});
	}
}
