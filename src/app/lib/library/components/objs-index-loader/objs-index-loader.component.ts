import { Component, inject, type OnDestroy, type OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotifyService } from '@core/services/notify/notify.service';
import { AlbumType, JamObjectType, type JamParameters } from '@jam';
import { type Index, type IndexCache, type IndexQueryByObjectType, IndexService } from '@core/services/index/index.service';
import { Subject, takeUntil } from 'rxjs';
import { getUrlType, type JamType, MUSICBRAINZ_VARIOUS_ARTISTS_ID } from '@utils/jam-lists';
import { IndexComponent } from '../index/index.component';
import { LoadingComponent } from '@core/components/loading/loading.component';

@Component({
	selector: 'app-obj-index-loader',
	templateUrl: './objs-index-loader.component.html',
	styleUrls: ['./objs-index-loader.component.scss'],
	imports: [IndexComponent, LoadingComponent]
})
export class ObjsIndexLoaderComponent implements OnInit, OnDestroy {
	index?: Index;
	objType?: keyof IndexQueryByObjectType;
	query?: JamParameters.ArtistFilterParameters | JamParameters.SeriesFilterParameters | JamParameters.FolderFilterParameters | JamParameters.AlbumFilterParameters;
	private readonly indexService = inject(IndexService);
	private readonly notify = inject(NotifyService);
	private readonly route = inject(ActivatedRoute);
	private readonly unsubscribe = new Subject<void>();

	request(type?: JamType): void {
		this.objType = undefined;
		this.query = undefined;
		if (type) {
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
	}

	ngOnInit(): void {
		if (this.route.parent) {
			this.route.parent.url
				.pipe(takeUntil(this.unsubscribe))
				.subscribe(value => {
					this.request(getUrlType(value));
				});
		}
		this.indexService.indexNotify
			.pipe(takeUntil(this.unsubscribe))
			.subscribe({
				next: (indexCache: IndexCache | undefined) => {
					if (indexCache && this.objType && indexCache.matches(this.objType, this.query)) {
						this.index = indexCache.index;
					}
				},
				error: (error: unknown) => {
					this.notify.error(error);
				}
			});
		this.refresh();
	}

	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}

	load(): void {
		if (this.objType && this.query) {
			this.index = this.indexService.requestIndex(this.objType, this.query);
		}
	}

	refresh(): void {
		this.index = undefined;
		this.load();
	}
}
