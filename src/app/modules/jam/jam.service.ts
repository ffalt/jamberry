// @generated
// This file was automatically generated and should not be edited.

import { inject, Injectable } from '@angular/core';

import { JamAuthService } from './jam.auth.service';
import { JamBaseService } from './jam.base.service';

import { JamAdminService } from './services/jam.admin.service';
import { JamAlbumService } from './services/jam.album.service';
import { JamArtistService } from './services/jam.artist.service';
import { JamArtworkService } from './services/jam.artwork.service';
import { JamAutocompleteService } from './services/jam.autocomplete.service';
import { JamBookmarkService } from './services/jam.bookmark.service';
import { JamChatService } from './services/jam.chat.service';
import { JamDownloadService } from './services/jam.download.service';
import { JamEpisodeService } from './services/jam.episode.service';
import { JamFolderService } from './services/jam.folder.service';
import { JamGenreService } from './services/jam.genre.service';
import { JamImageService } from './services/jam.image.service';
import { JamMetaDataService } from './services/jam.metadata.service';
import { JamNowPlayingService } from './services/jam.nowplaying.service';
import { JamPingService } from './services/jam.ping.service';
import { JamPlaylistService } from './services/jam.playlist.service';
import { JamPlayQueueService } from './services/jam.playqueue.service';
import { JamPodcastService } from './services/jam.podcast.service';
import { JamRadioService } from './services/jam.radio.service';
import { JamRootService } from './services/jam.root.service';
import { JamSeriesService } from './services/jam.series.service';
import { JamSessionService } from './services/jam.session.service';
import { JamStateService } from './services/jam.state.service';
import { JamStatsService } from './services/jam.stats.service';
import { JamStreamService } from './services/jam.stream.service';
import { JamTrackService } from './services/jam.track.service';
import { JamUserService } from './services/jam.user.service';
import { JamWaveformService } from './services/jam.waveform.service';

@Injectable()
export class JamService {
	readonly auth = inject(JamAuthService);
	readonly base = inject(JamBaseService);
	readonly admin = inject(JamAdminService);
	readonly album = inject(JamAlbumService);
	readonly artist = inject(JamArtistService);
	readonly artwork = inject(JamArtworkService);
	readonly autocomplete = inject(JamAutocompleteService);
	readonly bookmark = inject(JamBookmarkService);
	readonly chat = inject(JamChatService);
	readonly download = inject(JamDownloadService);
	readonly episode = inject(JamEpisodeService);
	readonly folder = inject(JamFolderService);
	readonly genre = inject(JamGenreService);
	readonly image = inject(JamImageService);
	readonly metadata = inject(JamMetaDataService);
	readonly nowplaying = inject(JamNowPlayingService);
	readonly ping = inject(JamPingService);
	readonly playlist = inject(JamPlaylistService);
	readonly playqueue = inject(JamPlayQueueService);
	readonly podcast = inject(JamPodcastService);
	readonly radio = inject(JamRadioService);
	readonly root = inject(JamRootService);
	readonly series = inject(JamSeriesService);
	readonly session = inject(JamSessionService);
	readonly state = inject(JamStateService);
	readonly stats = inject(JamStatsService);
	readonly stream = inject(JamStreamService);
	readonly track = inject(JamTrackService);
	readonly user = inject(JamUserService);
	readonly waveform = inject(JamWaveformService);
}
