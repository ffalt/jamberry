import {Component, type OnDestroy, type OnInit, inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NotifyService} from '@core/services';
import {type Jam, type JamParameters, JamService} from '@jam';
import {JamAlbumObject} from '@library/model/objects';
import {LibraryService} from '@library/services';
import {Subject, takeUntil} from 'rxjs';

@Component({
	selector: 'app-artist-overview',
	templateUrl: './artist-overview.component.html',
	styleUrls: ['./artist-overview.component.scss'],
	standalone: false
})
export class ArtistOverviewComponent implements OnInit, OnDestroy {
	id?: string;
	artist?: Jam.Artist;
	albums?: Array<JamAlbumObject>;
	tracksQuery?: JamParameters.TrackFilterArgs;
	private readonly library = inject(LibraryService);
	private readonly notify = inject(NotifyService);
	private readonly jam = inject(JamService);
	private readonly route = inject(ActivatedRoute);
	private readonly unsubscribe = new Subject<void>();

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
			.catch(error => this.notify.error(error));
	}
}
