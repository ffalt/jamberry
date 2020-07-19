import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
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
	styleUrls: ['./admin-folder-tracks.component.scss']
})
export class AdminFolderTracksComponent extends AdminBaseParentViewIdComponent implements OnInit, OnDestroy {
	folder: Jam.Folder | undefined;
	@ViewChild(TrackListComponent, {static: false}) tracks: TrackListComponent;

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
		const selection = this.tracks.trackItems.filter(t => t.selected).map(t => t.track.id);
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
				this.jam.track.move({ids, folderID: data.folder.id})
					.then(item => {
						this.folderService.waitForQueueResult('Moving Tracks', item, [], [data.folder.id].concat(this.folder.parentID ? [this.folder.parentID] : []), ids);
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
		this.jam.folder.id({id: this.id, folderIncTracks: true, trackIncTag: true, trackIncMedia: true})
			.then(data => {
				this.folder = data;
			})
			.catch(e => {
				this.notify.error(e);
			});
	}

}
