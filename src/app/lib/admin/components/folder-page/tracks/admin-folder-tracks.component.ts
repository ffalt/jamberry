import { Component, inject, type OnDestroy, type OnInit, viewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { type Jam, JamService } from '@jam';
import { takeUntil } from 'rxjs';
import { DialogOverlayService } from '@modules/dialog-overlay';
import { AdminBaseParentViewIdComponent } from '../../admin-base-parent-view-id/admin-base-parent-view-id.component';
import { DialogChooseFolderComponent, type SelectFolder } from '../../dialog-choose-folder/dialog-choose-folder.component';
import { TrackListComponent } from '../../track-list/track-list.component';
import { DialogsService } from '@core/services/dialogs/dialogs.service';
import { BackgroundTextListComponent } from '@core/components/background-text-list/background-text-list.component';
import { LoadingComponent } from '@core/components/loading/loading.component';
import { NotifyService } from '@core/services/notify/notify.service';
import { AdminFolderService } from '@core/services/admin-folder/admin-folder.service';

@Component({
	selector: 'app-admin-folder-tracks',
	templateUrl: './admin-folder-tracks.component.html',
	styleUrls: ['./admin-folder-tracks.component.scss'],
	imports: [RouterModule, TrackListComponent, BackgroundTextListComponent, LoadingComponent]
})
export class AdminFolderTracksComponent extends AdminBaseParentViewIdComponent implements OnInit, OnDestroy {
	folder: Jam.Folder | undefined;
	private readonly tracks = viewChild(TrackListComponent);
	private readonly jam = inject(JamService);
	private readonly notify = inject(NotifyService);
	private readonly folderService = inject(AdminFolderService);
	private readonly dialogsService = inject(DialogsService);
	private readonly dialogOverlay = inject(DialogOverlayService);

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
		if (!tracks?.trackItems || !this.folder?.tracks) {
			return [];
		}
		const selection = tracks.trackItems.filter(t => t.selected).map(t => t.track.id);
		return (selection.length > 0) ? selection : this.folder.tracks.map(t => t.id);
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
				this.jam.track.move({ ids, folderID: destination.id })
					.then(item => {
						this.folderService.waitForQueueResult('Moving Tracks', item, [],
							[destination.id, ...(this.folder?.parentID ? [this.folder.parentID] : [])], ids);
					})
					.catch((error: unknown) => {
						this.notify.error(error);
					});
				return Promise.resolve();
			},
			onCancelBtn: async () => Promise.resolve()
		});
	}

	refresh(): void {
		this.folder = undefined;
		if (!this.id) {
			return;
		}
		this.jam.folder.id({ id: this.id, folderIncTracks: true, trackIncTag: true, trackIncMedia: true })
			.then(data => {
				this.folder = data;
			})
			.catch((error: unknown) => {
				this.notify.error(error);
			});
	}
}
