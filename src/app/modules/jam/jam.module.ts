// @generated
// This file was automatically generated and should not be edited.

import {provideHttpClient, withInterceptorsFromDi, withJsonpSupport} from '@angular/common/http';
import {type ModuleWithProviders, NgModule, type Provider} from '@angular/core';

import {JamAuthService} from './jam.auth.service';
import {JamBaseService} from './jam.base.service';
import {JamHttpService} from './jam.http.service';
import {JamService} from './jam.service';

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

export const jamProviders: Array<Provider> =
	[
		JamAuthService,
		JamBaseService,
		JamHttpService,
		JamAdminService,
		JamAlbumService,
		JamArtistService,
		JamArtworkService,
		JamAutocompleteService,
		JamBookmarkService,
		JamChatService,
		JamDownloadService,
		JamEpisodeService,
		JamFolderService,
		JamGenreService,
		JamImageService,
		JamMetaDataService,
		JamNowPlayingService,
		JamPingService,
		JamPlaylistService,
		JamPlayQueueService,
		JamPodcastService,
		JamRadioService,
		JamRootService,
		JamSeriesService,
		JamSessionService,
		JamStateService,
		JamStatsService,
		JamStreamService,
		JamTrackService,
		JamUserService,
		JamWaveformService,
		JamService
	];

@NgModule({
	imports: [],
	declarations: [],
	exports: [],
	providers: [provideHttpClient(withInterceptorsFromDi(), withJsonpSupport())]
})
export class JamModule {
	static forRoot(provider: Provider): ModuleWithProviders<JamModule> {
		return {
			ngModule: JamModule,
			providers: [provider, ...jamProviders]
		};
	}
}
