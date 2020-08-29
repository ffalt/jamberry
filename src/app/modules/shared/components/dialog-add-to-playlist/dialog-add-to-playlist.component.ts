import {Component} from '@angular/core';
import {DialogOverlay, DialogOverlayDialogConfig, DialogOverlayRef} from '@app/modules/dialog-overlay';
import {NotifyService} from '@core/services';
import {Jam} from '@jam';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {PlaylistService} from '../../services/playlist/playlist.service';

export interface ChoosePlaylistData {
	getMedias(): Promise<Array<Jam.MediaBase>>;
}

@Component({
	selector: 'app-dialog-add-to-playlist',
	templateUrl: './dialog-add-to-playlist.component.html',
	styleUrls: ['./dialog-add-to-playlist.component.scss']
})
export class DialogChoosePlaylistComponent implements DialogOverlay<ChoosePlaylistData> {
	data?: ChoosePlaylistData;
	playlists?: Array<Jam.Playlist>;
	mediaList?: Array<Jam.MediaBase>;
	showTrackPreview: boolean = false;
	reference?: DialogOverlayRef;
	protected unsubscribe = new Subject();

	constructor(private notify: NotifyService, private playlistService: PlaylistService) {

	}

	dialogInit(reference: DialogOverlayRef, options: Partial<DialogOverlayDialogConfig<ChoosePlaylistData>>): void {
		this.data = options.data;
		this.reference = reference;
		this.playlistService.playlistsChange
			.pipe(takeUntil(this.unsubscribe)).subscribe(playlists => {
			this.playlists = playlists;
		});
		this.playlistService.getLists()
			.then(playlists => {
				this.playlists = playlists;
			})
			.catch(e => {
				this.notify.error(e);
			});
		this.start().catch(e => {
			this.notify.error(e);
		});
	}

	async start(): Promise<void> {
		if (this.data) {
			this.mediaList = await this.data.getMedias();
		}
	}

	remove(track: Jam.MediaBase): void {
		this.mediaList = this.mediaList ? this.mediaList.filter(item => item !== track) : [];
	}

	addTo(playlist: Jam.Playlist): void {
		if (this.mediaList) {
			this.playlistService.addToPlaylist(playlist, this.mediaList.map(t => t.id));
		}
		if (this.reference) {
			this.reference.close();
		}
	}
}
