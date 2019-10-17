import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ContextMenuService} from '@app/modules/context-menu';
import {NavigService, NotifyService, PlayerService} from '@core/services';
import {Jam, JamService} from '@jam';
import {ContextMenuPlaylistComponent} from '@library/components';
import {PlaylistService} from '@shared/services';
import {ActionsService} from '@shared/services';
import {Subject, Subscription} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
	selector: 'app-page-playlist',
	templateUrl: 'playlist-page.component.html',
	styleUrls: ['playlist-page.component.scss']
})
export class PlaylistPageComponent implements OnInit, OnDestroy {
	playlist: Jam.Playlist;
	id: string;
	@ViewChild(ContextMenuPlaylistComponent, {static: true}) playlistMenu: ContextMenuPlaylistComponent;
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
		this.contextMenuService.show.next({contextMenu: this.playlistMenu.contextMenu, event: $event, item});
		$event.preventDefault();
		$event.stopPropagation();
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
		}
	}

	refresh(): void {
		if (this.playlistID) {
			this.playlistService.refreshPlaylist(this.playlistID);
		}
	}

}
