import {ActionsService} from './actions/actions.service';
import {IndexService} from './index/index.service';
import {PlaylistDialogsService} from './playlist-dialogs/playlist-dialogs.service';
import {PlaylistService} from './playlist/playlist.service';
import {PodcastService} from './podcast/podcast.service';

export const services: Array<any> = [
	ActionsService, IndexService, PodcastService, PlaylistService, PlaylistDialogsService
];

export * from './playlist-dialogs/playlist-dialogs.service';
export * from './actions/actions.service';
export * from './index/index.service';
export * from './podcast/podcast.service';
export * from './playlist/playlist.service';
