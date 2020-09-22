import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NavigService, NotifyService, PlayerService} from '@core/services';
import {Jam, JamParameters, JamService} from '@jam';
import {JamAlbumObject} from '@library/model/objects';
import {LibraryService} from '@library/services';
import {ActionsService} from '@shared/services';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
	selector: 'app-artist-overview',
	templateUrl: './artist-overview.component.html',
	styleUrls: ['./artist-overview.component.scss']
})
export class ArtistOverviewComponent implements OnInit, OnDestroy {
	id?: string;
	artist?: Jam.Artist;
	albums?: Array<JamAlbumObject>;
	tracksQuery?: JamParameters.TrackFilterArgs;
	protected unsubscribe = new Subject();

	constructor(
		public navig: NavigService,
		public player: PlayerService,
		public actions: ActionsService,
		protected library: LibraryService,
		protected notify: NotifyService,
		protected jam: JamService,
		protected route: ActivatedRoute
	) {
	}

	ngOnInit(): void {
		if (this.route) {
			this.route.params
				.pipe(takeUntil(this.unsubscribe)).subscribe(params => {
				this.id = params.id;
				this.refresh();
			});
		}
	}

	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}

	refresh(): void {
		this.artist = undefined;
		this.albums = undefined;
		this.tracksQuery = undefined;
		if (!this.id) {
			return;
		}
		this.jam.artist.id({
			id: this.id,
			artistIncState: true,
			artistIncAlbums: true,
			artistIncGenres: true,
			albumIncState: true,
			artistIncInfo: true
		})
			.then(artist => {
				this.artist = artist;
				this.albums = (artist.albums || []).map(a => new JamAlbumObject(a, this.library));
				if (this.albums.length === 0) {
					this.tracksQuery = {artistIDs: [this.artist.id]};
				}
			})
			.catch(e => {
				this.notify.error(e);
			});
	}

}
