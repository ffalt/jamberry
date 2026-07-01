import { Component, DestroyRef, inject, signal } from '@angular/core';
import type { DialogOverlay, DialogOverlayDialogConfig, DialogOverlayRef } from '@modules/dialog-overlay';
import type { Jam } from '@jam';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PlaylistService } from '../../services/playlist/playlist.service';
import { BackgroundTextComponent } from '../background-text/background-text.component';
import { LoadingComponent } from '../loading/loading.component';
import { DurationPipe } from '../../pipes/duration.pipe';
import { NotifyService } from '../../services/notify/notify.service';
import { IconRemoveComponent } from '@core/components/icons/icon-remove.component';
import { IconExpandCollapseComponent } from '@core/components/icons/icon-expand-collapse.component';

export interface ChoosePlaylistData {
	getMedias(): Promise<Array<Jam.MediaBase>>;
}

@Component({
	selector: 'app-dialog-add-to-playlist',
	templateUrl: './dialog-add-to-playlist.component.html',
	styleUrls: ['./dialog-add-to-playlist.component.scss'],
	imports: [BackgroundTextComponent, DurationPipe, IconExpandCollapseComponent, IconRemoveComponent, LoadingComponent]
})
export class DialogChoosePlaylistComponent implements DialogOverlay<ChoosePlaylistData> {
	data?: ChoosePlaylistData;
	readonly playlists = signal<Array<Jam.Playlist> | undefined>(undefined);
	readonly mediaList = signal<Array<Jam.MediaBase> | undefined>(undefined);
	showTrackPreview: boolean = false;
	reference?: DialogOverlayRef;
	private readonly lifeRef = inject(DestroyRef);
	private readonly notify = inject(NotifyService);
	private readonly playlistService = inject(PlaylistService);

	dialogInit(reference: DialogOverlayRef, options: Partial<DialogOverlayDialogConfig<ChoosePlaylistData>>): void {
		this.data = options.data;
		this.reference = reference;
		this.playlistService.playlistsChange
			.pipe(takeUntilDestroyed(this.lifeRef))
			.subscribe(playlists => {
				this.playlists.set(playlists);
			});
		this.playlistService.getLists()
			.then(playlists => {
				this.playlists.set(playlists);
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
			this.mediaList.set(await this.data.getMedias());
		}
	}

	remove(track: Jam.MediaBase): void {
		this.mediaList.update(list => list ? list.filter(item => item !== track) : []);
	}

	addTo(playlist: Jam.Playlist): void {
		const mediaList = this.mediaList();
		if (mediaList) {
			this.playlistService.addToPlaylist(playlist, mediaList.map(t => t.id));
		}
		if (this.reference) {
			this.reference.close();
		}
	}
}
