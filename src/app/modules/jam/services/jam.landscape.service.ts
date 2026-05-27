// @generated
// This file was automatically generated and should not be edited.

import { inject, Injectable } from '@angular/core';

import { JamBaseService } from '../jam.base.service';
import type { Jam } from '../model/jam-rest-data';
import type { JamParameters } from '../model/jam-rest-params';

@Injectable()
export class JamLandscapeService {
	private readonly base = inject(JamBaseService);

	/**
	 * Get Music Collection Landscape Data for visualization // Rights needed: stream
	 */
	async get(parameters: JamParameters.LandscapeParameters): Promise<Jam.LandscapeData> {
		return this.base.requestData<Jam.LandscapeData>('/landscape', parameters);
	}
}
