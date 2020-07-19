// @generated
// This file was automatically generated and should not be edited.

import {Injectable} from '@angular/core';

import {JamBaseService} from '../jam.base.service';
import {Jam} from '../model/jam-rest-data';
import {JamParameters} from '../model/jam-rest-params';

@Injectable()
export class JamEpisodeService {

	constructor(private base: JamBaseService) {
	}

	/**
	 * Get a Episode by Id // Rights needed: stream
	 */
	async id(params: JamParameters.EpisodeIdArgs): Promise<Jam.Episode> {
		return this.base.requestData<Jam.Episode>('/episode/id', params);
	}

	/**
	 * Search Episodes // Rights needed: stream
	 */
	async search(params: JamParameters.EpisodeSearchArgs): Promise<Jam.EpisodePage> {
		return this.base.requestData<Jam.EpisodePage>('/episode/search', params);
	}

	/**
	 * Get a Episode Status by Id // Rights needed: stream
	 */
	async status(params: JamParameters.ID): Promise<Jam.EpisodeUpdateStatus> {
		return this.base.requestData<Jam.EpisodeUpdateStatus>('/episode/status', params);
	}

	/**
	 * Retrieve a Podcast Episode Media File // Rights needed: stream
	 */
	async retrieve(params: JamParameters.ID): Promise<void> {
		return this.base.requestPostDataOK('/episode/retrieve', params);
	}

}
