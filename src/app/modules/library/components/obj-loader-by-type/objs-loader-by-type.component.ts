import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {getUrlType, ListTypeUrlNamesKeys} from '@app/utils/jam-lists';
import {randomString} from '@app/utils/random';
import {AlbumType, JamObjectType, ListType} from '@jam';
import {LibraryService} from '@library/services';
import {PlaylistService, PodcastService} from '@shared/services';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {JamObjsLoader} from '../../model/loaders';

@Component({
	selector: 'app-objs-loader-page-by-type',
	templateUrl: './objs-loader-by-type.component.html',
	styleUrls: ['./objs-loader-by-type.component.scss']
})
export class ObjsLoaderByTypeComponent implements OnInit, OnDestroy {
	albumType: AlbumType;
	listType: ListType;
	jamType: JamObjectType;
	listQuery: { listType: ListType; albumType?: AlbumType };
	loader: JamObjsLoader;
	loadAll = false;
	valid = false;
	changeTrigger: string;
	protected unsubscribe = new Subject();
	protected unsubscribeRefresh = new Subject();

	constructor(protected route: ActivatedRoute, protected playlistService: PlaylistService, protected podcastService: PodcastService, public library: LibraryService) {
	}

	ngOnInit(): void {
		if (this.route && this.route.parent) {
			this.route.url
				.pipe(takeUntil(this.unsubscribe)).subscribe(val => {
				const type = val.length > 0 ? val[0].path : undefined;
				this.listType = ListTypeUrlNamesKeys[type];
			});
			this.route.parent.url
				.pipe(takeUntil(this.unsubscribe)).subscribe(val => {
				this.valid = false;
				this.loadAll = false;
				this.albumType = undefined;
				this.loader = undefined;
				const type = getUrlType(val);
				this.jamType = type.type;
				switch (this.jamType) {
					case JamObjectType.folder:
						this.loader = this.library.folderLoader;
						this.listQuery = {listType: this.listType, albumType: this.albumType};
						this.valid = true;
						break;
					case JamObjectType.playlist:
						this.loader = this.library.playlistLoader;
						if (this.listType) {
							this.listQuery = {listType: this.listType};
						} else {
							this.loadAll = true;
						}
						this.unsubscribeRefresh.next();
						this.unsubscribeRefresh.complete();
						this.playlistService.playlistsChange.pipe(takeUntil(this.unsubscribeRefresh)).subscribe(() => {
							this.changeTrigger = randomString();
						});
						this.valid = true;
						break;
					case JamObjectType.podcast:
						this.loader = this.library.podcastLoader;
						if (this.listType) {
							this.listQuery = {listType: this.listType};
						} else {
							this.loadAll = true;
						}
						this.unsubscribeRefresh.next();
						this.unsubscribeRefresh.complete();
						this.podcastService.podcastsChange.pipe(takeUntil(this.unsubscribeRefresh)).subscribe(() => {
							this.changeTrigger = randomString();
						});
						this.valid = true;
						break;
					case JamObjectType.series:
						this.loader = this.library.seriesLoader;
						this.listQuery = {listType: this.listType, albumType: this.albumType};
						this.valid = true;
						break;
					case JamObjectType.album:
						this.loader = this.library.albumLoader;
						this.albumType = type.albumType;
						this.valid = !!this.albumType;
						this.listQuery = {listType: this.listType, albumType: this.albumType};
						break;
					case JamObjectType.artist:
						this.loader = this.library.artistLoader;
						this.listQuery = {listType: this.listType, albumType: AlbumType.album};
						this.valid = true;
						break;
					default:
				}
			});
		}
	}

	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
		this.unsubscribeRefresh.next();
		this.unsubscribeRefresh.complete();
	}

}
