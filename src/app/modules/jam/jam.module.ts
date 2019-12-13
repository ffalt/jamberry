// THIS FILE IS GENERATED, DO NOT EDIT MANUALLY

import {HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';
import {ModuleWithProviders, NgModule, Provider} from '@angular/core';

import {JamService} from './jam.service';

import {JamAccessService} from './jam.access.service';
import {JamAdminService} from './jam.admin.service';
import {JamAlbumService} from './jam.album.service';
import {JamArtistService} from './jam.artist.service';
import {JamAuthService} from './jam.auth.service';
import {JamBaseService} from './jam.base.service';
import {JamBookmarkService} from './jam.bookmark.service';
import {JamChatService} from './jam.chat.service';
import {JamEpisodeService} from './jam.episode.service';
import {JamFolderService} from './jam.folder.service';
import {JamHttpService} from './jam.http.service';
import {JamImageService} from './jam.image.service';
import {JamMediaService} from './jam.media.service';
import {JamMetadataService} from './jam.metadata.service';
import {JamPlaylistService} from './jam.playlist.service';
import {JamPlayqueueService} from './jam.playqueue.service';
import {JamPodcastService} from './jam.podcast.service';
import {JamRadioService} from './jam.radio.service';
import {JamRootService} from './jam.root.service';
import {JamSeriesService} from './jam.series.service';
import {JamTrackService} from './jam.track.service';
import {JamUserService} from './jam.user.service';
import {JamVariousService} from './jam.various.service';

export const jamProviders: Array<Provider> =
	[
		JamAccessService,
		JamAdminService,
		JamAlbumService,
		JamArtistService,
		JamAuthService,
		JamBaseService,
		JamBookmarkService,
		JamChatService,
		JamEpisodeService,
		JamFolderService,
		JamHttpService,
		JamImageService,
		JamMediaService,
		JamMetadataService,
		JamPlaylistService,
		JamPlayqueueService,
		JamPodcastService,
		JamRadioService,
		JamRootService,
		JamSeriesService,
		JamTrackService,
		JamUserService,
		JamVariousService,
		JamService
	];

@NgModule({
	imports: [
		HttpClientModule,
		HttpClientJsonpModule
	],
	declarations: [],
	exports: [],
	providers: jamProviders
})
export class JamModule {

	static forRoot(provider: Provider): ModuleWithProviders {
		return {
			ngModule: JamModule,
			providers: [provider, ...jamProviders]
		};
	}
}
