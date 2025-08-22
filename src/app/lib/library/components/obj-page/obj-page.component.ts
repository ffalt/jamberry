import { Component, inject, type OnDestroy, type OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NotifyService } from '@core/services/notify/notify.service';
import { type Jam, JamObjectType, JamService } from '@jam';
import { Subject, takeUntil } from 'rxjs';
import { getUrlType, type JamType } from '@utils/jam-lists';
import { JamAlbumObject, JamArtistObject, JamEpisodeObject, JamFolderObject, type JamLibraryObject, JamPlaylistObject, JamPodcastObject, JamSeriesObject, JamTrackObject } from '../../model/objects';
import { EpisodeStateButtonComponent } from '../episode-state-button/episode-state.button.component';
import { BackgroundImageDirective } from '@core/directives/background-image.directive';
import { LibraryService } from '../../services/library/library.service';
import { type HeaderInfo, HeaderJamBaseComponent } from '@core/components/header-jambase/header-jambase.component';
import type { HeaderTab } from '@core/components/header-tabs/header-tabs.component';
import { LoadingComponent } from '@core/components/loading/loading.component';

@Component({
	selector: 'app-page-obj',
	templateUrl: './obj-page.component.html',
	styleUrls: ['./obj-page.component.scss'],
	imports: [RouterModule, EpisodeStateButtonComponent, BackgroundImageDirective, HeaderJamBaseComponent, LoadingComponent]
})
export class ObjPageComponent implements OnInit, OnDestroy {
	id?: string;
	obj?: JamLibraryObject;
	type?: JamType;
	infos: Array<HeaderInfo> = [];
	tabs: Array<HeaderTab> = [];
	isPodcastEpisode: boolean = false;
	private readonly jam = inject(JamService);
	private readonly notify = inject(NotifyService);
	private readonly route = inject(ActivatedRoute);
	private readonly unsubscribe = new Subject<void>();
	private readonly library = inject(LibraryService);

	get asPodcastEpisode(): Jam.Episode | undefined {
		return (this.obj as any) as Jam.Episode;
	}

	ngOnInit(): void {
		this.route.url
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(value => {
				this.type = getUrlType(value);
				this.isPodcastEpisode = this.type?.type === JamObjectType.episode;
			});
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

	display(obj?: JamLibraryObject): void {
		this.obj = obj;
		if (obj) {
			this.infos = obj.getInfos();
			this.tabs = this.type?.id ? this.library.buildIDTabs(this.type.id, obj.id) : [];
		}
	}

	refresh(): void {
		this.obj = undefined;
		if (this.id && this.type) {
			this.get(this.id)
				.then(obj => {
					this.display(obj);
				})
				.catch((error: unknown) => {
					this.notify.error(error);
				});
		}
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
