import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {getUrlType, JamType} from '@app/utils/jam-lists';
import {NavigService, NotifyService, PlayerService} from '@core/services';
import {JamObjectType, JamService} from '@jam';
import {
	JamAlbumObject,
	JamArtistObject,
	JamEpisodeObject, JamFolderObject, JamLibraryObject,
	JamPlaylistObject,
	JamPodcastObject,
	JamSeriesObject,
	JamTrackObject
} from '@library/model/objects';
import {LibraryService} from '@library/services';
import {HeaderInfo, HeaderTab} from '@shared/components';
import {ActionsService} from '@shared/services';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
	selector: 'app-page-obj',
	templateUrl: './obj-page.component.html',
	styleUrls: ['./obj-page.component.scss']
})
export class ObjPageComponent implements OnInit, OnDestroy {
	obj: JamLibraryObject;
	type: JamType;
	infos: Array<HeaderInfo> = [];
	id: string;
	tabs: Array<HeaderTab> = [];
	isPodcastEpisode: boolean = false;
	protected unsubscribe = new Subject();

	constructor(
		private library: LibraryService,
		public navig: NavigService, public player: PlayerService, public actions: ActionsService,
		protected jam: JamService, protected notify: NotifyService, protected route: ActivatedRoute
	) {
	}

	ngOnInit(): void {
		if (this.route) {
			this.route.url
				.pipe(takeUntil(this.unsubscribe)).subscribe(val => {
				this.type = getUrlType(val);
				this.isPodcastEpisode = this.type && this.type.type === JamObjectType.episode;
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

	display(obj: JamLibraryObject): void {
		this.obj = obj;
		if (obj) {
			this.infos = obj.getInfos();
			this.tabs = this.library.buildIDTabs(this.type.id, this.id);
		}
	}

	refresh(): void {
		this.obj = undefined;
		if (this.id && this.type) {
			this.get(this.id)
				.then(obj => {
					this.display(obj);
				})
				.catch(e => {
					this.notify.error(e);
				});
		}
	}

	async get(id: string): Promise<JamLibraryObject | undefined> {
		switch (this.type.type) {
			case JamObjectType.album:
				const album = await this.jam.album.id({id, albumState: true});
				return new JamAlbumObject(album, this.library);
			case JamObjectType.series:
				const series = await this.jam.series.id({id, seriesState: true});
				return new JamSeriesObject(series, this.library);
			case JamObjectType.artist:
				const artist = await this.jam.artist.id({id, artistState: true});
				return new JamArtistObject(artist, this.library);
			case JamObjectType.podcast:
				const podcast = await this.jam.podcast.id({id, podcastState: true});
				return new JamPodcastObject(podcast, this.library);
			case JamObjectType.playlist:
				const playlist = await this.jam.playlist.id({id, playlistState: true});
				return new JamPlaylistObject(playlist, this.library);
			case JamObjectType.track:
				const track = await this.jam.track.id({id, trackState: true, trackTag: true});
				return new JamTrackObject(track, this.library);
			case JamObjectType.episode:
				const episode = await this.jam.episode.id({id, trackState: true, trackTag: true});
				return new JamEpisodeObject(episode, this.library);
			case JamObjectType.folder:
				const folder = await this.jam.folder.id({id, folderState: true, folderTag: true});
				return new JamFolderObject(folder, this.library);
			default:
		}
	}

}
