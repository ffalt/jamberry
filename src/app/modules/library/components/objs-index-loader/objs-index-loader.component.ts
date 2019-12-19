import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {getUrlType, JamType} from '@app/utils/jam-lists';
import {NotifyService} from '@core/services';
import {AlbumType, JamObjectType, JamParameters, MUSICBRAINZ_VARIOUS_ARTISTS_ID} from '@jam';
import {Index, IndexService} from '@shared/services';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
	selector: 'app-obj-index-loader',
	templateUrl: './objs-index-loader.component.html',
	styleUrls: ['./objs-index-loader.component.scss']
})
export class ObjsIndexLoaderComponent implements OnInit, OnDestroy {
	index: Index;
	objType: JamObjectType;
	query: any;
	protected unsubscribe = new Subject();

	constructor(protected indexService: IndexService, protected notify: NotifyService, protected route: ActivatedRoute) {
	}

	request(type: JamType): void {
		this.objType = undefined;
		this.query = undefined;
		if (type) {
			this.objType = type.type;
			switch (type.type) {
				case JamObjectType.artist:
					const artistQuery: JamParameters.ArtistIndex = {albumType: AlbumType.album};
					this.query = artistQuery;
					break;
				case JamObjectType.series:
					const seriesQuery: JamParameters.SeriesIndex = {albumType: AlbumType.series};
					this.query = seriesQuery;
					break;
				case JamObjectType.folder:
					const folderQuery: JamParameters.FolderIndex = {level: 1};
					this.query = folderQuery;
					break;
				case JamObjectType.album:
					const albumQuery: JamParameters.AlbumIndex = {
						albumType: type.albumType,
						mbArtistID: type.albumType === AlbumType.compilation ? MUSICBRAINZ_VARIOUS_ARTISTS_ID : undefined
					};
					this.query = albumQuery;
					break;
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
				if (indexCache.matches(this.objType, this.query)) {
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