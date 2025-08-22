// @generated
// This file was automatically generated and should not be edited.

import { inject, Injectable } from '@angular/core';

import { JamBaseService } from '../jam.base.service';
import type { Jam } from '../model/jam-rest-data';
import type { JamParameters } from '../model/jam-rest-params';

@Injectable()
export class JamAlbumService {
	private readonly base = inject(JamBaseService);

	/**
	 * Get an Album by Id // Rights needed: stream
	 */
	async id(parameters: JamParameters.AlbumIdParameters): Promise<Jam.Album> {
		return this.base.requestData<Jam.Album>('/album/id', parameters);
	}

	/**
	 * Get the Navigation Index for Albums // Rights needed: stream
	 */
	async index(parameters: JamParameters.AlbumFilterParameters): Promise<Jam.AlbumIndex> {
		return this.base.requestData<Jam.AlbumIndex>('/album/index', parameters);
	}

	/**
	 * Search Albums // Rights needed: stream
	 */
	async search(parameters: JamParameters.AlbumSearchParameters): Promise<Jam.AlbumPage> {
		return this.base.requestData<Jam.AlbumPage>('/album/search', parameters);
	}

	/**
	 * Get Meta Data Info of an Album by Id (External Service) // Rights needed: stream
	 */
	async info(parameters: JamParameters.ID): Promise<Jam.ExtendedInfoResult> {
		return this.base.requestData<Jam.ExtendedInfoResult>('/album/info', parameters);
	}

	/**
	 * Get Tracks of Albums // Rights needed: stream
	 */
	async tracks(parameters: JamParameters.AlbumTracksParameters): Promise<Jam.TrackPage> {
		return this.base.requestData<Jam.TrackPage>('/album/tracks', parameters);
	}

	/**
	 * Get similar Tracks of an Album by Id (External Service) // Rights needed: stream
	 */
	async similarTracks(parameters: JamParameters.AlbumSimilarTracksParameters): Promise<Jam.TrackPage> {
		return this.base.requestData<Jam.TrackPage>('/album/similar/tracks', parameters);
	}
}
