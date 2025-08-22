// @generated
// This file was automatically generated and should not be edited.

import { inject, Injectable } from '@angular/core';

import { JamBaseService } from '../jam.base.service';
import type { Jam } from '../model/jam-rest-data';
import type { JamParameters } from '../model/jam-rest-params';

@Injectable()
export class JamRadioService {
	private readonly base = inject(JamBaseService);

	/**
	 * Get a Radio by Id // Rights needed: stream
	 */
	async id(parameters: JamParameters.RadioIdParameters): Promise<Jam.Radio> {
		return this.base.requestData<Jam.Radio>('/radio/id', parameters);
	}

	/**
	 * Get the Navigation Index for Radios // Rights needed: stream
	 */
	async index(parameters: JamParameters.RadioFilterParameters): Promise<Jam.RadioIndex> {
		return this.base.requestData<Jam.RadioIndex>('/radio/index', parameters);
	}

	/**
	 * Search Radios // Rights needed: stream
	 */
	async search(parameters: JamParameters.RadioSearchParameters): Promise<Jam.RadioPage> {
		return this.base.requestData<Jam.RadioPage>('/radio/search', parameters);
	}

	/**
	 * Create a Radio // Rights needed: stream
	 */
	async create(parameters: JamParameters.RadioMutateParameters): Promise<void> {
		return this.base.requestPostDataOK('/radio/create', parameters);
	}

	/**
	 * Update a Radio // Rights needed: stream
	 */
	async update(parameters: JamParameters.RadioUpdateParameters): Promise<void> {
		return this.base.requestPostDataOK('/radio/update', parameters);
	}

	/**
	 * Remove a Radio // Rights needed: stream
	 */
	async remove(parameters: JamParameters.ID): Promise<void> {
		return this.base.requestPostDataOK('/radio/remove', parameters);
	}
}
