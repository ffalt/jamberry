// @generated
// This file was automatically generated and should not be edited.

import {Injectable, inject} from '@angular/core';

import {JamBaseService} from '../jam.base.service';
import {Jam} from '../model/jam-rest-data';

@Injectable()
export class JamPingService {
	private readonly base = inject(JamBaseService);

	/**
	 * Is the Api online?
	 */
	async ping(): Promise<Jam.Ping> {
		return this.base.requestData<Jam.Ping>('/ping', {});
	}

}
