// @generated
// This file was automatically generated and should not be edited.

import { inject, Injectable } from '@angular/core';

import { JamBaseService } from '../jam.base.service';
import type { Jam } from '../model/jam-rest-data';
import type { JamParameters } from '../model/jam-rest-params';

@Injectable()
export class JamGenreService {
	private readonly base = inject(JamBaseService);

	/**
	 * Get a Genre by Id // Rights needed: stream
	 */
	async id(parameters: JamParameters.GenreIdParameters): Promise<Jam.Genre> {
		return this.base.requestData<Jam.Genre>('/genre/id', parameters);
	}

	/**
	 * Search Genres // Rights needed: stream
	 */
	async search(parameters: JamParameters.GenreSearchParameters): Promise<Jam.GenrePage> {
		return this.base.requestData<Jam.GenrePage>('/genre/search', parameters);
	}

	/**
	 * Get the Navigation Index for Genres // Rights needed: stream
	 */
	async index(parameters: JamParameters.GenreFilterParameters): Promise<Jam.GenreIndex> {
		return this.base.requestData<Jam.GenreIndex>('/genre/index', parameters);
	}

	/**
	 * Get Tracks of Genres // Rights needed: stream
	 */
	async tracks(parameters: JamParameters.GenreTracksParameters): Promise<Jam.TrackPage> {
		return this.base.requestData<Jam.TrackPage>('/genre/tracks', parameters);
	}

	/**
	 * Get Albums of Genres // Rights needed: stream
	 */
	async albums(parameters: JamParameters.GenreAlbumsParameters): Promise<Jam.AlbumPage> {
		return this.base.requestData<Jam.AlbumPage>('/genre/albums', parameters);
	}

	/**
	 * Get Artists of Genres // Rights needed: stream
	 */
	async artists(parameters: JamParameters.GenreArtistsParameters): Promise<Jam.ArtistPage> {
		return this.base.requestData<Jam.ArtistPage>('/genre/artists', parameters);
	}
}
