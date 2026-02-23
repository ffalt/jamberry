import { Component, inject, type OnDestroy } from '@angular/core';
import type { DialogOverlay, DialogOverlayDialogConfig, DialogOverlayRef } from '@modules/dialog-overlay';
import type { Jam } from '@jam';
import { Subject, takeUntil } from 'rxjs';
import { PlaylistService } from '../../services/playlist/playlist.service';
import { BackgroundTextComponent } from '../background-text/background-text.component';
import { ExpandCollapseIconComponent } from '../expand-collapse-icon/expand-collapse-icon.component';
import { LoadingComponent } from '../loading/loading.component';
import { DurationPipe } from '../../pipes/duration.pipe';
import { NotifyService } from '../../services/notify/notify.service';

export interface ChoosePlaylistData {
	getMedias(): Promise<Array<Jam.MediaBase>>;
}

@Component({
	selector: 'app-dialog-add-to-playlist',
	templateUrl: './dialog-add-to-playlist.component.html',
	styleUrls: ['./dialog-add-to-playlist.component.scss'],
	imports: [BackgroundTextComponent, ExpandCollapseIconComponent, LoadingComponent, DurationPipe]
})
export class DialogChoosePlaylistComponent implements DialogOverlay<ChoosePlaylistData>, OnDestroy {
	data?: ChoosePlaylistData;
	playlists?: Array<Jam.Playlist>;
	mediaList?: Array<Jam.MediaBase>;
	showTrackPreview: boolean = false;
	reference?: DialogOverlayRef;
	private readonly unsubscribe = new Subject<void>();
	private readonly notify = inject(NotifyService);
	private readonly playlistService = inject(PlaylistService);

	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}

	dialogInit(reference: DialogOverlayRef, options: Partial<DialogOverlayDialogConfig<ChoosePlaylistData>>): void {
		this.data = options.data;
		this.reference = reference;
		this.playlistService.playlistsChange
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(playlists => {
				this.playlists = playlists;
			});
		this.playlistService.getLists()
			.then(playlists => {
				this.playlists = playlists;
			})
			.catch((error: unknown) => {
				this.notify.error(error);
			});
		this.start()
			.catch((error: unknown) => {
				this.notify.error(error);
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
