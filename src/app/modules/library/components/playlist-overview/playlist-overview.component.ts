import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NavigService, NotifyService, PlayerService} from '@core/services';
import {Jam, JamService} from '@jam';
import {ActionsService, PlaylistService} from '@shared/services';
import {Subject, Subscription} from 'rxjs';
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
	protected unsubscribe = new Subject<void>();
	private playlistID?: string;
	private subList?: Subscription;

	constructor(
		public playlistService: PlaylistService,
		public navig: NavigService, public player: PlayerService, public actions: ActionsService,
		public jam: JamService, protected notify: NotifyService, protected route: ActivatedRoute
	) {
	}

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
