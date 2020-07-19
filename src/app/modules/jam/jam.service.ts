// @generated
// This file was automatically generated and should not be edited.

import {Injectable} from '@angular/core';

import {JamAuthService} from './jam.auth.service';
import {JamBaseService} from './jam.base.service';

import {JamAdminService} from './services/jam.admin.service';
import {JamAlbumService} from './services/jam.album.service';
import {JamArtistService} from './services/jam.artist.service';
import {JamArtworkService} from './services/jam.artwork.service';
import {JamAutocompleteService} from './services/jam.autocomplete.service';
import {JamBookmarkService} from './services/jam.bookmark.service';
import {JamChatService} from './services/jam.chat.service';
import {JamDownloadService} from './services/jam.download.service';
import {JamEpisodeService} from './services/jam.episode.service';
import {JamFolderService} from './services/jam.folder.service';
import {JamGenreService} from './services/jam.genre.service';
import {JamImageService} from './services/jam.image.service';
import {JamMetaDataService} from './services/jam.metadata.service';
import {JamNowPlayingService} from './services/jam.nowplaying.service';
import {JamPingService} from './services/jam.ping.service';
import {JamPlaylistService} from './services/jam.playlist.service';
import {JamPlayQueueService} from './services/jam.playqueue.service';
import {JamPodcastService} from './services/jam.podcast.service';
import {JamRadioService} from './services/jam.radio.service';
import {JamRootService} from './services/jam.root.service';
import {JamSeriesService} from './services/jam.series.service';
import {JamSessionService} from './services/jam.session.service';
import {JamStateService} from './services/jam.state.service';
import {JamStatsService} from './services/jam.stats.service';
import {JamStreamService} from './services/jam.stream.service';
import {JamTrackService} from './services/jam.track.service';
import {JamUserService} from './services/jam.user.service';
import {JamWaveformService} from './services/jam.waveform.service';

@Injectable()
export class JamService {

	constructor(
		public auth: JamAuthService,
		public base: JamBaseService,
		public admin: JamAdminService,
		public album: JamAlbumService,
		public artist: JamArtistService,
		public artwork: JamArtworkService,
		public autocomplete: JamAutocompleteService,
		public bookmark: JamBookmarkService,
		public chat: JamChatService,
		public download: JamDownloadService,
		public episode: JamEpisodeService,
		public folder: JamFolderService,
		public genre: JamGenreService,
		public image: JamImageService,
		public metadata: JamMetaDataService,
		public nowplaying: JamNowPlayingService,
		public ping: JamPingService,
		public playlist: JamPlaylistService,
		public playqueue: JamPlayQueueService,
		public podcast: JamPodcastService,
		public radio: JamRadioService,
		public root: JamRootService,
		public series: JamSeriesService,
		public session: JamSessionService,
		public state: JamStateService,
		public stats: JamStatsService,
		public stream: JamStreamService,
		public track: JamTrackService,
		public user: JamUserService,
		public waveform: JamWaveformService
	) {
	}

}
