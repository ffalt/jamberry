import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { NotifyService } from '@core/services/notify/notify.service';
import { AlbumType, JamObjectType, type JamParameters } from '@jam';
import { type Index, type IndexCache, type IndexQueryByObjectType, IndexService } from '@core/services/index/index.service';
import { getUrlType, type JamType, MUSICBRAINZ_VARIOUS_ARTISTS_ID } from '@utils/jam-lists';
import { IndexComponent } from '../index/index.component';
import { LoadingComponent } from '@core/components/loading/loading.component';

@Component({
	selector: 'app-obj-index-loader',
	templateUrl: './objs-index-loader.component.html',
	styleUrls: ['./objs-index-loader.component.scss'],
	imports: [IndexComponent, LoadingComponent]
})
export class ObjsIndexLoaderComponent {
	readonly index = signal<Index | undefined>(undefined);
	private objType?: keyof IndexQueryByObjectType;
	private query?: JamParameters.ArtistFilterParameters | JamParameters.SeriesFilterParameters | JamParameters.FolderFilterParameters | JamParameters.AlbumFilterParameters;
	private readonly indexService = inject(IndexService);
	private readonly notify = inject(NotifyService);
	private readonly route = inject(ActivatedRoute);
	private readonly lifeRef = inject(DestroyRef);

	constructor() {
		if (this.route.parent) {
			this.route.parent.url
				.pipe(takeUntilDestroyed(this.lifeRef))
				.subscribe(value => {
					this.request(getUrlType(value));
				});
		}
		this.indexService.indexNotify
			.pipe(takeUntilDestroyed(this.lifeRef))
			.subscribe({
				next: (indexCache: IndexCache | undefined) => {
					if (indexCache && this.objType && indexCache.matches(this.objType, this.query)) {
						this.index.set(indexCache.index);
					}
				},
				error: (error: unknown) => {
					this.notify.error(error);
				}
			});
		this.refresh();
	}

	request(type?: JamType): void {
		this.objType = undefined;
		this.query = undefined;
		if (!type) {
			return;
		}
		this.objType = type.type as keyof IndexQueryByObjectType;
		switch (type.type) {
			case JamObjectType.artist: {
				const artistQuery: JamParameters.ArtistFilterParameters = { albumTypes: [AlbumType.album] };
				this.query = artistQuery;
				break;
			}
			case JamObjectType.series: {
				const seriesQuery: JamParameters.SeriesFilterParameters = { albumTypes: [AlbumType.series] };
				this.query = seriesQuery;
				break;
			}
			case JamObjectType.folder: {
				const folderQuery: JamParameters.FolderFilterParameters = { level: 1 };
				this.query = folderQuery;
				break;
			}
			case JamObjectType.genre: {
				const genreQuery: JamParameters.GenreFilterParameters = {};
				this.query = genreQuery;
				break;
			}
			case JamObjectType.album: {
				const albumQuery: JamParameters.AlbumFilterParameters = {
					albumTypes: type.albumType ? [type.albumType] : [],
					mbArtistIDs: type.albumType === AlbumType.compilation ? [MUSICBRAINZ_VARIOUS_ARTISTS_ID] : undefined
				};
				this.query = albumQuery;
				break;
			}
			default:
		}
		this.refresh();
	}

	load(): void {
		if (this.objType && this.query) {
			this.index.set(this.indexService.requestIndex(this.objType, this.query));
		}
	}

	refresh(): void {
		this.index.set(undefined);
		this.load();
	}
}
