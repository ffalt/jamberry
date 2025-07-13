// @generated
// This file was automatically generated and should not be edited.

import {Injectable, inject} from '@angular/core';

import {JamBaseService} from '../jam.base.service';
import type {Jam} from '../model/jam-rest-data';
import type {JamParameters} from '../model/jam-rest-params';

@Injectable()
export class JamAutocompleteService {
	private readonly base = inject(JamBaseService);

	/**
	 * Get compact Search Results for Autocomplete Features // Rights needed: stream
	 */
	async autocomplete(params: JamParameters.AutoCompleteFilterArgs): Promise<Jam.AutoComplete> {
		return this.base.requestData<Jam.AutoComplete>('/autocomplete', params);
	}
}
