import { Component, inject, type OnDestroy, type OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlbumType, JamObjectType, type ListType } from '@jam';
import { Subject, takeUntil } from 'rxjs';
import { getUrlType, ListTypeUrlNamesKeys } from '@utils/jam-lists';
import { randomString } from '@utils/random';
import type { JamObjsLoader } from '../../model/loaders';
import { ObjsLoaderComponent } from '../objs-loader/objs-loader.component';
import { PlaylistService } from '@core/services/playlist/playlist.service';
import { PodcastService } from '@core/services/podcast/podcast.service';
import { LibraryService } from '../../services/library/library.service';

@Component({
	selector: 'app-objs-loader-page-by-type',
	templateUrl: './objs-loader-by-type.component.html',
	styleUrls: ['./objs-loader-by-type.component.scss'],
	imports: [ObjsLoaderComponent]
})
export class ObjsLoaderByTypeComponent implements OnInit, OnDestroy {
	albumType?: AlbumType;
	listType?: ListType;
	jamType?: JamObjectType;
	listQuery?: { listType: ListType; albumType?: AlbumType };
	loader?: JamObjsLoader;
	changeTrigger?: string;
	loadAll = false;
	valid = false;
	library = inject(LibraryService);
	protected readonly route = inject(ActivatedRoute);
	protected readonly playlistService = inject(PlaylistService);
	protected readonly podcastService = inject(PodcastService);
	private readonly unsubscribe = new Subject<void>();
	private unsubscribeRefresh = new Subject<void>();

	ngOnInit(): void {
		this.subscribe_to_url();
		this.subscribe_to_parent_url();
	}

	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
		this.unsubscribeRefresh.next();
		this.unsubscribeRefresh.complete();
	}

	private subscribe_to_url() {
		this.route.url
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(value => {
				const type = value.length > 0 ? value[0].path : undefined;
				this.listType = type ? ListTypeUrlNamesKeys[type] : undefined;
			});
	}

	private subscribe_to_parent_url() {
		if (!this.route.parent) {
			return;
		}
		this.route.parent.url
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(val => {
				this.resetState();
				const type = getUrlType(val);
				this.jamType = type?.type;
				this.handleJamType(type);
			});
	}

	private resetState(): void {
		this.valid = false;
		this.loadAll = false;
		this.albumType = undefined;
		this.loader = undefined;
	}

	private handleJamType(type: { type: JamObjectType; albumType?: AlbumType } | undefined): void {
		if (!this.jamType) {
			return;
		}

		const handlers: Partial<Record<JamObjectType, () => void>> = {
			[JamObjectType.folder]: () => {
				this.handleFolderType();
			},
			[JamObjectType.playlist]: () => {
				this.handlePlaylistType();
			},
			[JamObjectType.podcast]: () => {
				this.handlePodcastType();
			},
			[JamObjectType.series]: () => {
				this.handleSeriesType();
			},
			[JamObjectType.album]: () => {
				this.handleAlbumType(type?.albumType);
			},
			[JamObjectType.artist]: () => {
				this.handleArtistType();
			},
			[JamObjectType.genre]: () => {
				this.handleGenreType();
			}
		};

		const handler = handlers[this.jamType];
		if (handler) {
			handler();
		}
	}

	private handleFolderType(): void {
		this.loader = this.library.folderLoader;
		if (this.listType) {
			this.listQuery = { listType: this.listType, albumType: this.albumType };
			this.valid = true;
		}
	}

	private handlePlaylistType(): void {
		this.loader = this.library.playlistLoader;
		this.listQuery = this.listType ? { listType: this.listType } : undefined;
		this.loadAll = !this.listType;
		this.setupChangeListener(this.playlistService.playlistsChange);
		this.valid = true;
	}

	private handlePodcastType(): void {
		this.loader = this.library.podcastLoader;
		this.listQuery = this.listType ? { listType: this.listType } : undefined;
		this.loadAll = !this.listType;
		this.setupChangeListener(this.podcastService.podcastsChange);
		this.valid = true;
	}

	private handleSeriesType(): void {
		this.loader = this.library.seriesLoader;
		if (this.listType) {
			this.listQuery = { listType: this.listType, albumType: this.albumType };
			this.valid = true;
		}
	}

	private handleAlbumType(albumType?: AlbumType): void {
		this.loader = this.library.albumLoader;
		if (this.listType) {
			this.albumType = albumType;
			this.valid = !!this.albumType;
			this.listQuery = { listType: this.listType, albumType: this.albumType };
		}
	}

	private handleArtistType(): void {
		this.loader = this.library.artistLoader;
		if (this.listType) {
			this.listQuery = { listType: this.listType, albumType: AlbumType.album };
			this.valid = true;
		}
	}

	private handleGenreType(): void {
		this.loader = this.library.genreLoader;
		if (this.listType) {
			this.listQuery = { listType: this.listType };
			this.valid = true;
		}
	}

	private setupChangeListener(changeObservable: Subject<any>): void {
		this.unsubscribeRefresh.next();
		this.unsubscribeRefresh.complete();
		this.unsubscribeRefresh = new Subject<void>();
		changeObservable
			.pipe(takeUntil(this.unsubscribeRefresh))
			.subscribe(() => {
				this.changeTrigger = randomString();
			});
	}
}
