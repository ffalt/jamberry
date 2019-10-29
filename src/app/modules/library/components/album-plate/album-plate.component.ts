import {ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {ContextMenuService} from '@app/modules/context-menu';
import {NavigService, NotifyService, PlayerService} from '@core/services';
import {AlbumType, Jam, JamService, MUSICBRAINZ_VARIOUS_ARTISTS_NAME} from '@jam';
import {ActionsService} from '@shared/services';
import {ContextMenuAlbumComponent} from '../context-menu-album/context-menu-album.component';

@Component({
	selector: 'app-album-plate',
	templateUrl: './album-plate.component.html',
	styleUrls: ['./album-plate.component.scss']
})
export class AlbumPlateComponent implements OnChanges {
	@Input() album: Jam.Album;
	@Input() showArtist: boolean = false;
	@Input() limitArtist: Jam.Artist;
	AlbumType = AlbumType;
	showArtistLabel: boolean = false;
	isVariousArtists: boolean = false;
	tracks: Array<Jam.Track>;
	tracksExpanded: boolean = false;
	@ViewChild(ContextMenuAlbumComponent, {static: true}) albumMenu: ContextMenuAlbumComponent;

	constructor(
		public navig: NavigService,
		public player: PlayerService,
		public actions: ActionsService,
		protected notify: NotifyService,
		protected jam: JamService,
		private contextMenuService: ContextMenuService
	) {
	}

	onContextMenu($event: MouseEvent): void {
		this.contextMenuService.open(ContextMenuAlbumComponent, this.album, $event);
	}

	ngOnChanges(changes: SimpleChanges): void {
		this.tracks = undefined;
		this.tracksExpanded = false;
		if (this.album) {
			this.isVariousArtists = this.album.artist === MUSICBRAINZ_VARIOUS_ARTISTS_NAME;
		}
		this.showArtistLabel = this.showArtist || this.isVariousArtists;
	}

	toggleAlbumTracks(): void {
		this.tracksExpanded = !this.tracksExpanded;
		if (!this.tracks) {
			const id = this.album.id;
			this.jam.album.tracks({ids: [id], trackTag: true, trackState: true})
				.then(data => {
					if (this.album && this.album.id === id) {
						this.tracks = data.items;
						// if (this.limitArtist && !this.isVariousArtists) {
						// 	this.tracks = this.tracks.filter(t => t.artistID === this.limitArtist.id);
						// }
					}
				})
				.catch(e => {
					this.notify.error(e);
				});
		}
	}
}
