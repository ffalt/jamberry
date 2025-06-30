import {Component, OnDestroy, OnInit, inject, viewChild} from '@angular/core';
import {DialogOverlayService} from '@app/modules/dialog-overlay';
import {AdminFolderService, NotifyService} from '@core/services';
import {Jam, JamService} from '@jam';
import {DialogsService} from '@shared/services';
import {takeUntil} from 'rxjs/operators';
import {AdminBaseParentViewIdComponent} from '../../admin-base-parent-view-id/admin-base-parent-view-id.component';
import {DialogChooseFolderComponent, SelectFolder} from '../../dialog-choose-folder/dialog-choose-folder.component';
import {TrackListComponent} from '../../track-list/track-list.component';

@Component({
	selector: 'app-admin-folder-tracks',
	templateUrl: './admin-folder-tracks.component.html',
	styleUrls: ['./admin-folder-tracks.component.scss'],
	standalone: false
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
			.pipe(takeUntil(this.unsubscribe)).subscribe(change => {
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
				this.jam.track.remove({id})
					.then(item => {
						this.folderService.waitForQueueResult('Removing Track', item, [], [], [id]);
					})
					.catch(e => {
						this.notify.error(e);
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
		this.dialogOverlay.open({
			title: 'Move Tracks to',
			childComponent: DialogChooseFolderComponent,
			data,
			panelClass: 'overlay-panel-large-buttons',
			onOkBtn: async () => {
				const destination = data.folder;
				if (!destination) {
					return;
				}
				this.jam.track.move({ids, folderID: destination.id})
					.then(item => {
						this.folderService.waitForQueueResult('Moving Tracks', item, [],
							[destination.id].concat(this.folder?.parentID ? [this.folder.parentID] : []), ids);
					})
					.catch(e => {
						this.notify.error(e);
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
		this.jam.folder.id({id: this.id, folderIncTracks: true, trackIncTag: true, trackIncMedia: true})
			.then(data => {
				this.folder = data;
			})
			.catch(e => {
				this.notify.error(e);
			});
	}
}
