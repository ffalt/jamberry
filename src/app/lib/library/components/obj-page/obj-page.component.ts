import { Component, DestroyRef, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NotifyService } from '@core/services/notify/notify.service';
import { type Jam, JamObjectType, JamService } from '@jam';
import { getUrlType, type JamType } from '@utils/jam-lists';
import { JamAlbumObject, JamArtistObject, JamEpisodeObject, JamFolderObject, type JamLibraryObject, JamPlaylistObject, JamPodcastObject, JamSeriesObject, JamTrackObject } from '../../model/objects';
import { EpisodeStateButtonComponent } from '../episode-state-button/episode-state.button.component';
import { BackgroundImageDirective } from '@core/directives/background-image.directive';
import { LibraryService } from '../../services/library/library.service';
import { type HeaderInfo, HeaderJamBaseComponent } from '@core/components/header-jambase/header-jambase.component';
import type { HeaderTab } from '@core/components/header-tabs/header-tabs.component';
import { LoadingComponent } from '@core/components/loading/loading.component';
import { IconPlayComponent } from '@core/components/icons/icon-play.component';

@Component({
	selector: 'app-page-obj',
	templateUrl: './obj-page.component.html',
	styleUrls: ['./obj-page.component.scss'],
	imports: [BackgroundImageDirective, EpisodeStateButtonComponent, HeaderJamBaseComponent, IconPlayComponent, LoadingComponent, RouterModule]
})
export class ObjPageComponent {
	readonly obj = signal<JamLibraryObject | undefined>(undefined);
	readonly isPodcastEpisode = signal(false);
	readonly infos = signal<Array<HeaderInfo>>([]);
	readonly tabs = signal<Array<HeaderTab>>([]);
	private id?: string;
	private type?: JamType;
	private readonly jam = inject(JamService);
	private readonly notify = inject(NotifyService);
	private readonly route = inject(ActivatedRoute);
	private readonly lifeRef = inject(DestroyRef);
	private readonly library = inject(LibraryService);

	get asPodcastEpisode(): Jam.Episode | undefined {
		return this.obj() as Jam.Episode | undefined;
	}

	constructor() {
		this.route.url
			.pipe(takeUntilDestroyed(this.lifeRef))
			.subscribe(value => {
				this.type = getUrlType(value);
				this.isPodcastEpisode.set(this.type?.type === JamObjectType.episode);
			});
		this.route.paramMap
			.pipe(takeUntilDestroyed(this.lifeRef))
			.subscribe(paramMap => {
				this.id = paramMap.get('id') ?? undefined;
				this.refresh();
			});
	}

	display(obj?: JamLibraryObject): void {
		this.obj.set(obj);
		if (obj) {
			this.infos.set(obj.getInfos());
			this.tabs.set(this.type?.id ? this.library.buildIDTabs(this.type.id, obj.id) : []);
		}
	}

	refresh(): void {
		this.obj.set(undefined);
		if (!this.id || !this.type) {
			return;
		}
		this.get(this.id)
			.then(obj => {
				this.display(obj);
			})
			.catch((error: unknown) => {
				this.notify.error(error);
			});
	}

	async get(id: string): Promise<JamLibraryObject | undefined> {
		switch (this.type?.type) {
			case JamObjectType.album: {
				const album = await this.jam.album.id({ id, albumIncState: true });
				return new JamAlbumObject(album, this.library);
			}
			case JamObjectType.series: {
				const series = await this.jam.series.id({ id, seriesIncState: true });
				return new JamSeriesObject(series, this.library);
			}
			case JamObjectType.artist: {
				const artist = await this.jam.artist.id({ id, artistIncState: true });
				return new JamArtistObject(artist, this.library);
			}
			case JamObjectType.podcast: {
				const podcast = await this.jam.podcast.id({ id, podcastIncState: true });
				return new JamPodcastObject(podcast, this.library);
			}
			case JamObjectType.playlist: {
				const playlist = await this.jam.playlist.id({ id, playlistIncState: true });
				return new JamPlaylistObject(playlist, this.library);
			}
			case JamObjectType.track: {
				const track = await this.jam.track.id({ id, trackIncState: true, trackIncTag: true });
				return new JamTrackObject(track, this.library);
			}
			case JamObjectType.episode: {
				const episode = await this.jam.episode.id({ id, episodeIncState: true, episodeIncTag: true });
				return new JamEpisodeObject(episode, this.library);
			}
			case JamObjectType.folder: {
				const folder = await this.jam.folder.id({ id, folderIncState: true, folderIncTag: true });
				return new JamFolderObject(folder, this.library);
			}
			default: {
				return;
			}
		}
	}
}
