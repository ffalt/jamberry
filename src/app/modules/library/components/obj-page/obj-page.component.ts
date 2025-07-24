import {Component, type OnDestroy, type OnInit, inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {getUrlType, type JamType} from '@app/utils/jam-lists';
import {NotifyService} from '@core/services';
import {type Jam, JamObjectType, JamService} from '@jam';
import {
	JamAlbumObject,
	JamArtistObject,
	JamEpisodeObject,
	JamFolderObject,
	type JamLibraryObject,
	JamPlaylistObject,
	JamPodcastObject,
	JamSeriesObject,
	JamTrackObject
} from '@library/model/objects';
import {LibraryService} from '@library/services';
import type {HeaderInfo, HeaderTab} from '@shared/components';
import {Subject, takeUntil} from 'rxjs';

@Component({
	selector: 'app-page-obj',
	templateUrl: './obj-page.component.html',
	styleUrls: ['./obj-page.component.scss'],
	standalone: false
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

	ngOnInit(): void {
		if (this.route) {
			this.route.url
				.pipe(takeUntil(this.unsubscribe)).subscribe(val => {
				this.type = getUrlType(val);
				this.isPodcastEpisode = this.type?.type === JamObjectType.episode;
			});
			this.route.params
				.pipe(takeUntil(this.unsubscribe)).subscribe(params => {
				this.id = params.id;
				this.refresh();
			});
		}
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
				.then(obj => this.display(obj))
				.catch(error => this.notify.error(error));
		}
	}

	async get(id: string): Promise<JamLibraryObject | undefined> {
		switch (this.type?.type) {
			case JamObjectType.album: {
				const album = await this.jam.album.id({id, albumIncState: true});
				return new JamAlbumObject(album, this.library);
			}
			case JamObjectType.series: {
				const series = await this.jam.series.id({id, seriesIncState: true});
				return new JamSeriesObject(series, this.library);
			}
			case JamObjectType.artist: {
				const artist = await this.jam.artist.id({id, artistIncState: true});
				return new JamArtistObject(artist, this.library);
			}
			case JamObjectType.podcast: {
				const podcast = await this.jam.podcast.id({id, podcastIncState: true});
				return new JamPodcastObject(podcast, this.library);
			}
			case JamObjectType.playlist: {
				const playlist = await this.jam.playlist.id({id, playlistIncState: true});
				return new JamPlaylistObject(playlist, this.library);
			}
			case JamObjectType.track: {
				const track = await this.jam.track.id({id, trackIncState: true, trackIncTag: true});
				return new JamTrackObject(track, this.library);
			}
			case JamObjectType.episode: {
				const episode = await this.jam.episode.id({id, episodeIncState: true, episodeIncTag: true});
				return new JamEpisodeObject(episode, this.library);
			}
			case JamObjectType.folder: {
				const folder = await this.jam.folder.id({id, folderIncState: true, folderIncTag: true});
				return new JamFolderObject(folder, this.library);
			}
			default: {
				return;
			}
		}
	}

	get asPodcastEpisode(): Jam.Episode | undefined {
		return (this.obj as any) as Jam.Episode;
	}
}
