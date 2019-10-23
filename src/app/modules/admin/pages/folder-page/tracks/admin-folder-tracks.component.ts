import {AdminBaseParentViewIdComponent} from '@admin/components/admin-base-parent-view-id/admin-base-parent-view-id.component';
import {DialogChooseFolderComponent, SelectFolder} from '@admin/components/dialog-choose-folder/dialog-choose-folder.component';
import {TrackListComponent} from '@admin/components/track-list/track-list.component';
import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DialogOverlayService} from '@app/modules/dialog-overlay';
import {AdminFolderService, DialogsService, NotifyService} from '@core/services';
import {Jam, JamService} from '@jam';
import {takeUntil} from 'rxjs/operators';

@Component({
	selector: 'app-admin-folder-tracks',
	templateUrl: 'admin-folder-tracks.component.html',
	styleUrls: ['admin-folder-tracks.component.scss']
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
				this.jam.track.delete({id})
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
		return (this.tracks && this.tracks.selection && this.tracks.selection.selected && this.tracks.selection.selected.length > 0) ?
			this.tracks.selection.selected.map(trackItem => trackItem.track.id) :
			this.folder.tracks.map(t => t.id);
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
				this.jam.track.parent_update({ids, folderID: data.folder.id})
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
		this.jam.folder.id({id: this.id, folderTracks: true, trackTag: true, trackMedia: true})
			.then(data => {
				this.folder = data;
			})
			.catch(e => {
				this.notify.error(e);
			});
	}

}
