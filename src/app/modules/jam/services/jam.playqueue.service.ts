// @generated
// This file was automatically generated and should not be edited.

import { inject, Injectable } from '@angular/core';

import { JamBaseService } from '../jam.base.service';
import type { Jam } from '../model/jam-rest-data';
import type { JamParameters } from '../model/jam-rest-params';

@Injectable()
export class JamPlayQueueService {
	private readonly base = inject(JamBaseService);

	/**
	 * Get a PlayQueue for the calling user // Rights needed: stream
	 */
	async get(parameters: JamParameters.PlayQueueGetParameters): Promise<Jam.PlayQueue> {
		return this.base.requestData<Jam.PlayQueue>('/playqueue/get', parameters);
	}

	/**
	 * Create/update the PlayQueue for the calling user // Rights needed: stream
	 */
	async set(parameters: JamParameters.PlayQueueSetParameters): Promise<void> {
		return this.base.requestPostDataOK('/playqueue/set', parameters);
	}

	/**
	 * Clear the PlayQueue for the calling user // Rights needed: stream
	 */
	async clear(): Promise<void> {
		return this.base.requestPostDataOK('/playqueue/clear', {});
	}
}
