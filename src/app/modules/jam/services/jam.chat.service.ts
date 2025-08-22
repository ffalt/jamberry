// @generated
// This file was automatically generated and should not be edited.

import { inject, Injectable } from '@angular/core';

import { JamBaseService } from '../jam.base.service';
import type { Jam } from '../model/jam-rest-data';
import type { JamParameters } from '../model/jam-rest-params';

@Injectable()
export class JamChatService {
	private readonly base = inject(JamBaseService);

	/**
	 * Get Chat Messages // Rights needed: stream
	 */
	async list(parameters: JamParameters.ChatFilterParameters): Promise<Array<Jam.Chat>> {
		return this.base.requestData<Array<Jam.Chat>>('/chat/list', parameters);
	}

	/**
	 * Post a Chat Message // Rights needed: stream
	 */
	async create(parameters: JamParameters.ChatCreateParameters): Promise<void> {
		return this.base.requestPostDataOK('/chat/create', parameters);
	}

	/**
	 * Remove a Chat Message // Rights needed: stream
	 */
	async remove(parameters: JamParameters.ChatRemoveParameters): Promise<void> {
		return this.base.requestPostDataOK('/chat/remove', parameters);
	}
}
