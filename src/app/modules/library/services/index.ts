import {IndexService} from './index/index.service';
import {PlaylistService} from './playlist/playlist.service';
import {PodcastService} from './podcast/podcast.service';

export const services: Array<any> = [
	IndexService, PodcastService, PlaylistService
];

export * from './index/index.service';
export * from './podcast/podcast.service';
export * from './playlist/playlist.service';
