import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { NotifyService } from '@core/services/notify/notify.service';
import { type Jam, type JamParameters, JamService } from '@jam';
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
export class ArtistOverviewComponent {
	readonly artist = signal<Jam.Artist | undefined>(undefined);
	readonly albums = signal<Array<JamAlbumObject> | undefined>(undefined);
	readonly tracksQuery = signal<JamParameters.TrackFilterParameters | undefined>(undefined);
	private id?: string;
	private readonly library = inject(LibraryService);
	private readonly notify = inject(NotifyService);
	private readonly jam = inject(JamService);
	private readonly route = inject(ActivatedRoute);
	private readonly lifeRef = inject(DestroyRef);

	constructor() {
		this.route.paramMap
			.pipe(takeUntilDestroyed(this.lifeRef))
			.subscribe(paramMap => {
				this.id = paramMap.get('id') ?? undefined;
				this.refresh();
			});
	}

	refresh(): void {
		this.artist.set(undefined);
		this.albums.set(undefined);
		this.tracksQuery.set(undefined);
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
				this.artist.set(artist);
				const albumObjs = (artist.albums ?? []).map(a => new JamAlbumObject(a, this.library));
				this.albums.set(albumObjs);
				if (albumObjs.length === 0) {
					this.tracksQuery.set({ artistIDs: [artist.id] });
				}
			})
			.catch((error: unknown) => {
				this.notify.error(error);
			});
	}
}
