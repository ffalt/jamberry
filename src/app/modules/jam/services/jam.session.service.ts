// @generated
// This file was automatically generated and should not be edited.

import {Injectable, inject} from '@angular/core';

import {JamBaseService} from '../jam.base.service';
import {Jam} from '../model/jam-rest-data';
import {JamParameters} from '../model/jam-rest-params';

@Injectable()
export class JamSessionService {
	private readonly base = inject(JamBaseService);

	/**
	 * Check the Login State
	 */
	async session(): Promise<Jam.Session> {
		return this.base.requestData<Jam.Session>('/session', {});
	}

	/**
	 * Get a list of all sessions of the current user // Rights needed: stream
	 */
	async list(): Promise<Array<Jam.UserSession>> {
		return this.base.requestData<Array<Jam.UserSession>>('/session/list', {});
	}

	/**
	 * Remove a user session // Rights needed: stream
	 */
	async remove(params: JamParameters.ID): Promise<void> {
		return this.base.requestPostDataOK('/session/remove', params);
	}
}
