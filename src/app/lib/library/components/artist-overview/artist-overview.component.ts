import { Component, inject, type OnDestroy, type OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotifyService } from '@core/services/notify/notify.service';
import { type Jam, type JamParameters, JamService } from '@jam';
import { Subject, takeUntil } from 'rxjs';
import { JamAlbumObject } from '../../model/objects';
import { ObjGroupsViewComponent } from '../obj-groups-view/obj-groups-view.component';
import { TracksLoaderComponent } from '../tracks-loader/tracks-loader.component';
import { LibraryService } from '../../services/library/library.service';
import { LoadingComponent } from '@core/components/loading/loading.component';
import { InfoNoteComponent } from '@core/components/info-note/info-note.component';

@Component({
	selector: 'app-artist-overview',
	templateUrl: './artist-overview.component.html',
	styleUrls: ['./artist-overview.component.scss'],
	imports: [TracksLoaderComponent, ObjGroupsViewComponent, LoadingComponent, InfoNoteComponent]
})
export class ArtistOverviewComponent implements OnInit, OnDestroy {
	id?: string;
	artist?: Jam.Artist;
	albums?: Array<JamAlbumObject>;
	tracksQuery?: JamParameters.TrackFilterParameters;
	private readonly library = inject(LibraryService);
	private readonly notify = inject(NotifyService);
	private readonly jam = inject(JamService);
	private readonly route = inject(ActivatedRoute);
	private readonly unsubscribe = new Subject<void>();

	ngOnInit(): void {
		this.route.paramMap
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(paramMap => {
				this.id = paramMap.get('id') ?? undefined;
				this.refresh();
			});
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
				this.albums = (artist.albums ?? []).map(a => new JamAlbumObject(a, this.library));
				if (this.albums.length === 0) {
					this.tracksQuery = { artistIDs: [this.artist.id] };
				}
			})
			.catch((error: unknown) => {
				this.notify.error(error);
			});
	}
}
