import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NotifyService} from '@core/services';
import {Jam, JamParameters, JamService} from '@jam';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
	selector: 'app-artist-overview',
	templateUrl: './artist-overview.component.html',
	styleUrls: ['./artist-overview.component.scss']
})
export class ArtistOverviewComponent implements OnInit, OnDestroy {
	artist?: Jam.Artist;
	albums?: Array<Jam.Album>;
	tracksQuery?: JamParameters.TrackSearch;
	id: string;
	protected unsubscribe = new Subject();

	constructor(protected jam: JamService, protected notify: NotifyService, protected route: ActivatedRoute) {
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
			artistState: true,
			artistAlbums: true,
			albumState: true,
			albumTag: true,
			artistInfo: true
		})
			.then(artist => {
				this.artist = artist;
				this.albums = artist.albums;
				if (!this.albums || this.albums.length === 0) {
					this.tracksQuery = {artistID: this.artist.id};
				}
			})
			.catch(e => {
				this.notify.error(e);
			});
	}

}
