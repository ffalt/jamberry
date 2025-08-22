// @generated
// This file was automatically generated and should not be edited.

import { inject, Injectable } from '@angular/core';

import { JamBaseService } from '../jam.base.service';
import type { Jam } from '../model/jam-rest-data';
import type { JamParameters } from '../model/jam-rest-params';

@Injectable()
export class JamSeriesService {
	private readonly base = inject(JamBaseService);

	/**
	 * Get a Series by Id // Rights needed: stream
	 */
	async id(parameters: JamParameters.SeriesIdParameters): Promise<Jam.Series> {
		return this.base.requestData<Jam.Series>('/series/id', parameters);
	}

	/**
	 * Get the Navigation Index for Series // Rights needed: stream
	 */
	async index(parameters: JamParameters.SeriesFilterParameters): Promise<Jam.SeriesIndex> {
		return this.base.requestData<Jam.SeriesIndex>('/series/index', parameters);
	}

	/**
	 * Search Series // Rights needed: stream
	 */
	async search(parameters: JamParameters.SeriesSearchParameters): Promise<Jam.SeriesPage> {
		return this.base.requestData<Jam.SeriesPage>('/series/search', parameters);
	}

	/**
	 * Get Meta Data Info of a Series by Id (External Service) // Rights needed: stream
	 */
	async info(parameters: JamParameters.ID): Promise<Jam.ExtendedInfoResult> {
		return this.base.requestData<Jam.ExtendedInfoResult>('/series/info', parameters);
	}

	/**
	 * Get Albums of Series // Rights needed: stream
	 */
	async albums(parameters: JamParameters.SeriesAlbumsParameters): Promise<Jam.AlbumPage> {
		return this.base.requestData<Jam.AlbumPage>('/series/albums', parameters);
	}

	/**
	 * Get Tracks of Series // Rights needed: stream
	 */
	async tracks(parameters: JamParameters.SeriesTracksParameters): Promise<Jam.TrackPage> {
		return this.base.requestData<Jam.TrackPage>('/series/tracks', parameters);
	}
}
