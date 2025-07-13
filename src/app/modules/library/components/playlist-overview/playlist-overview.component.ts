import {Component, type OnDestroy, type OnInit, inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NavigService} from '@core/services';
import type {Jam} from '@jam';
import {PlaylistService} from '@shared/services';
import {Subject, type Subscription} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
	selector: 'app-playlist-overview',
	templateUrl: './playlist-overview.component.html',
	styleUrls: ['./playlist-overview.component.scss'],
	standalone: false
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
		if (this.route) {
			this.route.params
				.pipe(takeUntil(this.unsubscribe)).subscribe(params => {
				this.id = params.id;
				this.recheck();
			});
		}
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
				.pipe(takeUntil(this.unsubscribe)).subscribe(playlist => {
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
