// THIS FILE IS GENERATED, DO NOT EDIT MANUALLY

/* eslint-disable @typescript-eslint/camelcase */

import {Injectable} from '@angular/core';

import {JamBaseService} from './jam.base.service';
import {Jam} from './model/jam-rest-data';
import {JamParameters} from './model/jam-rest-params';

@Injectable()
export class JamPlayqueueService {

	constructor(private base: JamBaseService) {
	}

	/**
	 * get a playqueue for calling user
	 */
	async get(params: JamParameters.PlayQueue): Promise<Jam.PlayQueue> {
		return this.base.requestData<Jam.PlayQueue>('playqueue/get', params);
	}

	/**
	 * create/update the playqueue for calling user
	 */
	async update(params: JamParameters.PlayQueueSet): Promise<void> {
		return this.base.requestPostDataOK('playqueue/update', params);
	}

	/**
	 * delete the playqueue for calling user
	 */
	async delete(): Promise<void> {
		return this.base.requestPostDataOK('playqueue/delete', {});
	}

}
