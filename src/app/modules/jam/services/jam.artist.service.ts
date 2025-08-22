// @generated
// This file was automatically generated and should not be edited.

import { inject, Injectable } from '@angular/core';

import { JamBaseService } from '../jam.base.service';
import type { Jam } from '../model/jam-rest-data';
import type { JamParameters } from '../model/jam-rest-params';

@Injectable()
export class JamArtistService {
	private readonly base = inject(JamBaseService);

	/**
	 * Get an Artist by Id // Rights needed: stream
	 */
	async id(parameters: JamParameters.ArtistIdParameters): Promise<Jam.Artist> {
		return this.base.requestData<Jam.Artist>('/artist/id', parameters);
	}

	/**
	 * Get the Navigation Index for Albums // Rights needed: stream
	 */
	async index(parameters: JamParameters.ArtistFilterParameters): Promise<Jam.ArtistIndex> {
		return this.base.requestData<Jam.ArtistIndex>('/artist/index', parameters);
	}

	/**
	 * Search Artists // Rights needed: stream
	 */
	async search(parameters: JamParameters.ArtistSearchParameters): Promise<Jam.ArtistPage> {
		return this.base.requestData<Jam.ArtistPage>('/artist/search', parameters);
	}

	/**
	 * Get Meta Data Info of an Artist by Id (External Service) // Rights needed: stream
	 */
	async info(parameters: JamParameters.ID): Promise<Jam.ExtendedInfoResult> {
		return this.base.requestData<Jam.ExtendedInfoResult>('/artist/info', parameters);
	}

	/**
	 * Get similar Artists of an Artist by Id (External Service) // Rights needed: stream
	 */
	async similar(parameters: JamParameters.ArtistSimilarParameters): Promise<Jam.ArtistPage> {
		return this.base.requestData<Jam.ArtistPage>('/artist/similar', parameters);
	}

	/**
	 * Get similar Tracks of an Artist by Id (External Service) // Rights needed: stream
	 */
	async similarTracks(parameters: JamParameters.ArtistSimilarTracksParameters): Promise<Jam.TrackPage> {
		return this.base.requestData<Jam.TrackPage>('/artist/similar/tracks', parameters);
	}

	/**
	 * Get Tracks of Artists // Rights needed: stream
	 */
	async tracks(parameters: JamParameters.ArtistTracksParameters): Promise<Jam.TrackPage> {
		return this.base.requestData<Jam.TrackPage>('/artist/tracks', parameters);
	}

	/**
	 * Get Albums of Artists // Rights needed: stream
	 */
	async albums(parameters: JamParameters.ArtistAlbumsParameters): Promise<Jam.AlbumPage> {
		return this.base.requestData<Jam.AlbumPage>('/artist/albums', parameters);
	}

	/**
	 * Get Series of Artists // Rights needed: stream
	 */
	async series(parameters: JamParameters.ArtistSeriesParameters): Promise<Jam.SeriesPage> {
		return this.base.requestData<Jam.SeriesPage>('/artist/series', parameters);
	}
}
