// @generated
// This file was automatically generated and should not be edited.

import { inject, Injectable } from '@angular/core';

import { JamBaseService } from '../jam.base.service';
import type { Jam } from '../model/jam-rest-data';
import type { JamParameters } from '../model/jam-rest-params';

@Injectable()
export class JamEpisodeService {
	private readonly base = inject(JamBaseService);

	/**
	 * Get a Episode by Id // Rights needed: stream
	 */
	async id(parameters: JamParameters.EpisodeIdParameters): Promise<Jam.Episode> {
		return this.base.requestData<Jam.Episode>('/episode/id', parameters);
	}

	/**
	 * Search Episodes // Rights needed: stream
	 */
	async search(parameters: JamParameters.EpisodeSearchParameters): Promise<Jam.EpisodePage> {
		return this.base.requestData<Jam.EpisodePage>('/episode/search', parameters);
	}

	/**
	 * Get a Episode Status by Id // Rights needed: stream
	 */
	async status(parameters: JamParameters.ID): Promise<Jam.EpisodeUpdateStatus> {
		return this.base.requestData<Jam.EpisodeUpdateStatus>('/episode/status', parameters);
	}

	/**
	 * Retrieve a Podcast Episode Media File // Rights needed: stream
	 */
	async retrieve(parameters: JamParameters.ID): Promise<void> {
		return this.base.requestPostDataOK('/episode/retrieve', parameters);
	}
}
