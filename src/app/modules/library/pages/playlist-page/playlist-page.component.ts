import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ContextMenuService} from '@app/modules/context-menu';
import {NavigService, NotifyService, PlayerService} from '@core/services';
import {Jam, JamService} from '@jam';
import {ActionsService, PlaylistService} from '@shared/services';
import {Subject, Subscription} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {
	ContextMenuPlaylistComponent,
	ContextMenuPlaylistComponentOptions
} from '../../components/context-menu-playlist/context-menu-playlist.component';

@Component({
	selector: 'app-page-playlist',
	templateUrl: 'playlist-page.component.html',
	styleUrls: ['playlist-page.component.scss']
})
export class PlaylistPageComponent implements OnInit, OnDestroy {
	playlist: Jam.Playlist;
	id: string;
	protected unsubscribe = new Subject();
	private playlistID: string;
	private subList: Subscription;

	constructor(
		public playlistService: PlaylistService,
		public navig: NavigService, public player: PlayerService, public actions: ActionsService,
		public jam: JamService, protected notify: NotifyService, protected route: ActivatedRoute,
		private contextMenuService: ContextMenuService
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

	onContextMenu($event: MouseEvent, item: Jam.Playlist): void {
		this.contextMenuService.open<ContextMenuPlaylistComponentOptions>(ContextMenuPlaylistComponent, item, $event, {
			canEdit: this.jam.auth.user && this.playlist && this.playlist.userID === this.jam.auth.user.id
		});
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
