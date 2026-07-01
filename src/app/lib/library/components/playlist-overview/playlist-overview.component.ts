import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import type { Jam } from '@jam';
import { EMPTY, switchMap } from 'rxjs';
import { MediaPlaylistComponent } from '../tracks-playlist/media-playlist.component';
import { PlaylistService } from '@core/services/playlist/playlist.service';
import { InfoTextComponent } from '@core/components/info-text/info-text.component';
import { NavigService } from '@core/services/navig/navig.service';

@Component({
	selector: 'app-playlist-overview',
	templateUrl: './playlist-overview.component.html',
	styleUrls: ['./playlist-overview.component.scss'],
	imports: [MediaPlaylistComponent, InfoTextComponent]
})
export class PlaylistOverviewComponent {
	readonly playlist = signal<Jam.Playlist | undefined>(undefined);
	private id?: string;
	private readonly playlistService = inject(PlaylistService);
	private readonly navig = inject(NavigService);
	private readonly route = inject(ActivatedRoute);
	private readonly lifeRef = inject(DestroyRef);

	constructor() {
		this.route.paramMap
			.pipe(
				takeUntilDestroyed(this.lifeRef),
				switchMap(paramMap => {
					this.id = paramMap.get('id') ?? undefined;
					if (!this.id) {
						return EMPTY;
					}
					this.playlistService.refreshPlaylist(this.id);
					return this.playlistService.playlistChange.notifier(this.id);
				})
			)
			.subscribe(playlist => {
				if (!playlist) {
					this.navig.toPlaylists();
					return;
				}
				this.playlist.set(playlist);
			});
	}

	refresh(): void {
		if (this.id) {
			this.playlistService.refreshPlaylist(this.id);
		}
	}
}
