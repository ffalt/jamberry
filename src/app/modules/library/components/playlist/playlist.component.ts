import {Component, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {ContextMenuService} from '@app/modules/context-menu';
import {NavigService, NotifyService, PlayerService} from '@core/services';
import {Jam, JamService} from '@jam';
import {ActionsService, PlaylistService} from '@shared/services';
import {ContextMenuPlaylistComponent} from '../context-menu-playlist/context-menu-playlist.component';

@Component({
	selector: 'app-playlist',
	templateUrl: 'playlist.component.html',
	styleUrls: ['playlist.component.scss']
})
export class PlaylistComponent implements OnChanges {
	@Input() playlist: Jam.Playlist;
	tracks: Array<Jam.Track>;
	tracksExpanded: boolean = false;

	constructor(
		public navig: NavigService, public player: PlayerService, public actions: ActionsService,
		public jam: JamService, public playlistService: PlaylistService, public notify: NotifyService,
		private contextMenuService: ContextMenuService
	) {
	}

	onContextMenu($event: MouseEvent, item: Jam.Playlist): void {
		this.contextMenuService.open(ContextMenuPlaylistComponent, item, $event);
	}

	ngOnChanges(changes: SimpleChanges): void {
		this.tracks = undefined;
		this.tracksExpanded = false;
	}

	togglePlaylistTracks(): void {
		this.tracksExpanded = !this.tracksExpanded;
		if (!this.tracks) {
			const id = this.playlist.id;
			this.jam.playlist.tracks({ids: [id], trackTag: true, trackState: true})
				.then(data => {
					if (this.playlist && this.playlist.id === id) {
						this.tracks = data.items;
					}
				})
				.catch(e => {
					this.notify.error(e);
				});
		}
	}
}
