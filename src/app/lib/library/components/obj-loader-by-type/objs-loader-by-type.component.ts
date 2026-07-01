import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { AlbumType, JamObjectType, type ListType } from '@jam';
import { EMPTY, switchMap } from 'rxjs';
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
export class ObjsLoaderByTypeComponent {
	readonly albumType = signal<AlbumType | undefined>(undefined);
	readonly listType = signal<ListType | undefined>(undefined);
	readonly jamType = signal<JamObjectType | undefined>(undefined);
	readonly listQuery = signal<{ listType: ListType; albumType?: AlbumType } | undefined>(undefined);
	readonly loader = signal<JamObjsLoader | undefined>(undefined);
	readonly changeTrigger = signal<string | undefined>(undefined);
	readonly loadAll = signal(false);
	readonly valid = signal(false);
	library = inject(LibraryService);
	protected readonly route = inject(ActivatedRoute);
	protected readonly playlistService = inject(PlaylistService);
	protected readonly podcastService = inject(PodcastService);
	private readonly lifeRef = inject(DestroyRef);

	constructor() {
		this.route.url
			.pipe(takeUntilDestroyed(this.lifeRef))
			.subscribe(value => {
				const type = value.length > 0 ? value[0].path : undefined;
				this.listType.set(type ? ListTypeUrlNamesKeys[type] : undefined);
			});

		if (this.route.parent) {
			this.route.parent.url.pipe(
				takeUntilDestroyed(this.lifeRef),
				switchMap(val => {
					this.resetState();
					const type = getUrlType(val);
					this.jamType.set(type?.type);
					this.handleJamType(type);
					const jamType = this.jamType();
					if (jamType === JamObjectType.playlist) {
						return this.playlistService.playlistsChange;
					}
					if (jamType === JamObjectType.podcast) {
						return this.podcastService.podcastsChange;
					}
					return EMPTY;
				})
			).subscribe(() => {
				this.changeTrigger.set(randomString());
			});
		}
	}

	private resetState(): void {
		this.valid.set(false);
		this.loadAll.set(false);
		this.albumType.set(undefined);
		this.loader.set(undefined);
	}

	private handleJamType(type: { type: JamObjectType; albumType?: AlbumType } | undefined): void {
		if (!this.jamType()) {
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

		const handler = handlers[this.jamType()!];
		if (handler) {
			handler();
		}
	}

	private handleFolderType(): void {
		this.loader.set(this.library.folderLoader);
		const listType = this.listType();
		if (listType) {
			this.listQuery.set({ listType, albumType: this.albumType() });
			this.valid.set(true);
		}
	}

	private handlePlaylistType(): void {
		const listType = this.listType();
		this.loader.set(this.library.playlistLoader);
		this.listQuery.set(listType ? { listType } : undefined);
		this.loadAll.set(!listType);
		this.valid.set(true);
	}

	private handlePodcastType(): void {
		const listType = this.listType();
		this.loader.set(this.library.podcastLoader);
		this.listQuery.set(listType ? { listType } : undefined);
		this.loadAll.set(!listType);
		this.valid.set(true);
	}

	private handleSeriesType(): void {
		this.loader.set(this.library.seriesLoader);
		const listType = this.listType();
		if (listType) {
			this.listQuery.set({ listType, albumType: this.albumType() });
			this.valid.set(true);
		}
	}

	private handleAlbumType(albumType?: AlbumType): void {
		this.loader.set(this.library.albumLoader);
		const listType = this.listType();
		if (listType) {
			this.albumType.set(albumType);
			this.valid.set(!!albumType);
			this.listQuery.set({ listType, albumType });
		}
	}

	private handleArtistType(): void {
		this.loader.set(this.library.artistLoader);
		const listType = this.listType();
		if (listType) {
			this.listQuery.set({ listType, albumType: AlbumType.album });
			this.valid.set(true);
		}
	}

	private handleGenreType(): void {
		this.loader.set(this.library.genreLoader);
		const listType = this.listType();
		if (listType) {
			this.listQuery.set({ listType });
			this.valid.set(true);
		}
	}
}
