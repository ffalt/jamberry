import {Component, type OnDestroy, type OnInit, inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {getUrlType, type JamType, MUSICBRAINZ_VARIOUS_ARTISTS_ID} from '@app/utils/jam-lists';
import {NotifyService} from '@core/services';
import {AlbumType, JamObjectType, type JamParameters} from '@jam';
import {type Index, IndexService} from '@shared/services';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
	selector: 'app-obj-index-loader',
	templateUrl: './objs-index-loader.component.html',
	styleUrls: ['./objs-index-loader.component.scss'],
	standalone: false
})
export class ObjsIndexLoaderComponent implements OnInit, OnDestroy {
	index?: Index;
	objType?: JamObjectType;
	query?: JamParameters.ArtistFilterArgs | JamParameters.SeriesFilterArgs | JamParameters.FolderFilterArgs | JamParameters.AlbumFilterArgs;
	private readonly indexService = inject(IndexService);
	private readonly notify = inject(NotifyService);
	private readonly route = inject(ActivatedRoute);
	private readonly unsubscribe = new Subject<void>();

	request(type?: JamType): void {
		this.objType = undefined;
		this.query = undefined;
		if (type) {
			this.objType = type.type;
			switch (type.type) {
				case JamObjectType.artist: {
					const artistQuery: JamParameters.ArtistFilterArgs = {albumTypes: [AlbumType.album]};
					this.query = artistQuery;
					break;
				}
				case JamObjectType.series: {
					const seriesQuery: JamParameters.SeriesFilterArgs = {albumTypes: [AlbumType.series]};
					this.query = seriesQuery;
					break;
				}
				case JamObjectType.folder: {
					const folderQuery: JamParameters.FolderFilterArgs = {level: 1};
					this.query = folderQuery;
					break;
				}
				case JamObjectType.genre: {
					const genreQuery: JamParameters.GenreFilterArgs = {};
					this.query = genreQuery;
					break;
				}
				case JamObjectType.album: {
					const albumQuery: JamParameters.AlbumFilterArgs = {
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
				.pipe(takeUntil(this.unsubscribe)).subscribe(val => {
				this.request(getUrlType(val));
			});
		}
		this.indexService.indexNotify
			.pipe(takeUntil(this.unsubscribe)).subscribe(
			indexCache => {
				if (indexCache && this.objType && indexCache.matches(this.objType, this.query)) {
					this.index = indexCache.index;
				}
			},
			e => {
				this.notify.error(e);
			}
		);
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
