// @generated
// This file was automatically generated and should not be edited.

import { inject, Injectable } from '@angular/core';

import { JamBaseService } from '../jam.base.service';
import type { Jam } from '../model/jam-rest-data';
import type { JamParameters } from '../model/jam-rest-params';

@Injectable()
export class JamPodcastService {
	private readonly base = inject(JamBaseService);

	/**
	 * Get a Podcast by Id // Rights needed: stream
	 */
	async id(parameters: JamParameters.PodcastIdParameters): Promise<Jam.Podcast> {
		return this.base.requestData<Jam.Podcast>('/podcast/id', parameters);
	}

	/**
	 * Get the Navigation Index for Podcasts // Rights needed: stream
	 */
	async index(parameters: JamParameters.PodcastFilterParameters): Promise<Jam.PodcastIndex> {
		return this.base.requestData<Jam.PodcastIndex>('/podcast/index', parameters);
	}

	/**
	 * Search Podcasts // Rights needed: stream
	 */
	async search(parameters: JamParameters.PodcastSearchParameters): Promise<Jam.PodcastPage> {
		return this.base.requestData<Jam.PodcastPage>('/podcast/search', parameters);
	}

	/**
	 * Get Episodes of Podcasts // Rights needed: stream
	 */
	async episodes(parameters: JamParameters.PodcastEpisodesParameters): Promise<Jam.EpisodePage> {
		return this.base.requestData<Jam.EpisodePage>('/podcast/episodes', parameters);
	}

	/**
	 * Get a Podcast Status by Podcast Id // Rights needed: stream
	 */
	async status(parameters: JamParameters.ID): Promise<Jam.PodcastUpdateStatus> {
		return this.base.requestData<Jam.PodcastUpdateStatus>('/podcast/status', parameters);
	}

	/**
	 * Discover Podcasts via gpodder.net // Rights needed: stream
	 */
	async discover(parameters: JamParameters.PodcastDiscoverParameters): Promise<Array<Jam.PodcastDiscover>> {
		return this.base.requestData<Array<Jam.PodcastDiscover>>('/podcast/discover', parameters);
	}

	/**
	 * Discover Podcast Tags via gpodder.net // Rights needed: stream
	 */
	async podcastsDiscoverTags(parameters: JamParameters.PageParameters): Promise<Jam.PodcastDiscoverTagPage> {
		return this.base.requestData<Jam.PodcastDiscoverTagPage>('/podcast/discover/tags', parameters);
	}

	/**
	 * Discover Podcasts by Tag via gpodder.net // Rights needed: stream
	 */
	async podcastsDiscoverByTag(parameters: JamParameters.PodcastPodcastsDiscoverByTagParameters): Promise<Jam.PodcastDiscoverTagPage> {
		return this.base.requestData<Jam.PodcastDiscoverTagPage>('/podcast/discover/byTag', parameters);
	}

	/**
	 * Discover Top Podcasts via gpodder.net // Rights needed: stream
	 */
	async podcastsDiscoverTop(parameters: JamParameters.PageParameters): Promise<Jam.PodcastDiscoverTagPage> {
		return this.base.requestData<Jam.PodcastDiscoverTagPage>('/podcast/discover/top', parameters);
	}

	/**
	 * Create a Podcast // Rights needed: stream
	 */
	async create(parameters: JamParameters.PodcastCreateParameters): Promise<Jam.Podcast> {
		return this.base.requestPostData<Jam.Podcast>('/podcast/create', parameters);
	}

	/**
	 * Check Podcast Feeds for new Episodes // Rights needed: stream
	 */
	async refresh(parameters: JamParameters.PodcastRefreshParameters): Promise<void> {
		return this.base.requestPostDataOK('/podcast/refresh', parameters);
	}

	/**
	 * Remove a Podcast // Rights needed: stream
	 */
	async remove(parameters: JamParameters.ID): Promise<void> {
		return this.base.requestPostDataOK('/podcast/remove', parameters);
	}
}
