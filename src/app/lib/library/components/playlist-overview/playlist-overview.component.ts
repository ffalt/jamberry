import { Component, inject, type OnDestroy, type OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import type { Jam } from '@jam';
import { Subject, type Subscription, takeUntil } from 'rxjs';
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
export class PlaylistOverviewComponent implements OnInit, OnDestroy {
	id?: string;
	playlist?: Jam.Playlist;
	private readonly playlistService = inject(PlaylistService);
	private readonly navig = inject(NavigService);
	private readonly route = inject(ActivatedRoute);
	private readonly unsubscribe = new Subject<void>();
	private playlistID?: string;
	private subList?: Subscription;

	ngOnInit(): void {
		this.route.paramMap
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(paramMap => {
				this.id = paramMap.get('id') ?? undefined;
				this.recheck();
			});
	}

	ngOnDestroy(): void {
		if (this.subList) {
			this.subList.unsubscribe();
			this.subList = undefined;
		}
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}

	recheck(): void {
		if (this.subList) {
			this.subList.unsubscribe();
			this.subList = undefined;
		}
		if (this.id) {
			this.playlistID = this.id;
			this.subList = this.playlistService.playlistChange
				.notifier(this.playlistID)
				.pipe(takeUntil(this.unsubscribe))
				.subscribe(playlist => {
					if (!playlist) {
						this.navig.toPlaylists();
						return;
					}
					this.playlist = playlist;
				});
			this.refresh();
		}
	}

	refresh(): void {
		if (this.playlistID) {
			this.playlistService.refreshPlaylist(this.playlistID);
		}
	}
}
