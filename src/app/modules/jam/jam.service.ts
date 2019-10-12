// THIS FILE IS GENERATED, DO NOT EDIT MANUALLY

import {Injectable} from '@angular/core';

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
import {JamImageService} from './jam.image.service';
import {JamMediaService} from './jam.media.service';
import {JamMetadataService} from './jam.metadata.service';
import {JamPlaylistService} from './jam.playlist.service';
import {JamPlayqueueService} from './jam.playqueue.service';
import {JamPodcastService} from './jam.podcast.service';
import {JamRadioService} from './jam.radio.service';
import {JamRootService} from './jam.root.service';
import {JamTrackService} from './jam.track.service';
import {JamUserService} from './jam.user.service';
import {JamVariousService} from './jam.various.service';

@Injectable()
export class JamService {

	constructor(
		public access: JamAccessService,
		public admin: JamAdminService,
		public album: JamAlbumService,
		public artist: JamArtistService,
		public auth: JamAuthService,
		public base: JamBaseService,
		public bookmark: JamBookmarkService,
		public chat: JamChatService,
		public episode: JamEpisodeService,
		public folder: JamFolderService,
		public image: JamImageService,
		public media: JamMediaService,
		public metadata: JamMetadataService,
		public playlist: JamPlaylistService,
		public playqueue: JamPlayqueueService,
		public podcast: JamPodcastService,
		public radio: JamRadioService,
		public root: JamRootService,
		public track: JamTrackService,
		public user: JamUserService,
		public various: JamVariousService
	) {
	}

}
