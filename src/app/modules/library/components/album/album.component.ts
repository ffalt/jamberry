import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {NavigService, NotifyService, PlayerService} from '@core/services';
import {AlbumType, Jam, JamService, MUSICBRAINZ_VARIOUS_ARTISTS_NAME} from '@jam';
import {ActionsService} from '@shared/services';

@Component({
	selector: 'app-album',
	templateUrl: 'album.component.html',
	styleUrls: ['album.component.scss']
})
export class AlbumComponent implements OnChanges {
	@Input() album: Jam.Album;
	@Input() showArtist: boolean = false;
	@Input() limitArtist: Jam.Artist;
	AlbumType = AlbumType;
	isVariousArtists: boolean = false;
	tracks: Array<Jam.Track>;
	tracksExpanded: boolean = false;

	constructor(
		public navig: NavigService,
		public player: PlayerService,
		public actions: ActionsService,
		protected notify: NotifyService,
		protected jam: JamService
	) {
	}

	ngOnChanges(changes: SimpleChanges): void {
		this.tracks = undefined;
		this.tracksExpanded = false;
		if (this.album) {
			this.isVariousArtists = this.album.artist === MUSICBRAINZ_VARIOUS_ARTISTS_NAME;
		}
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
