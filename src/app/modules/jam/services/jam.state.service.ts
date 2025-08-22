// @generated
// This file was automatically generated and should not be edited.

import { inject, Injectable } from '@angular/core';

import { JamBaseService } from '../jam.base.service';
import type { Jam } from '../model/jam-rest-data';
import type { JamParameters } from '../model/jam-rest-params';

@Injectable()
export class JamStateService {
	private readonly base = inject(JamBaseService);

	/**
	 * Get User State (fav/rate/etc) [Album, Artist, Artwork, Episode, Folder, Root, Playlist, Podcast, Radio, Series, Track] // Rights needed: stream
	 */
	async state(parameters: JamParameters.ID): Promise<Jam.State> {
		return this.base.requestData<Jam.State>('/state/id', parameters);
	}

	/**
	 * Get User States (fav/rate/etc) [Album, Artist, Artwork, Episode, Folder, Root, Playlist, Podcast, Radio, Series, Track] // Rights needed: stream
	 */
	async states(parameters: JamParameters.StatesParameters): Promise<Jam.States> {
		return this.base.requestData<Jam.States>('/state/list', parameters);
	}

	/**
	 * Set/Unset Favorite [Album, Artist, Artwork, Episode, Folder, Root, Playlist, Podcast, Radio, Series, Track] // Rights needed: stream
	 */
	async fav(parameters: JamParameters.FavParameters): Promise<Jam.State> {
		return this.base.requestPostData<Jam.State>('/state/fav', parameters);
	}

	/**
	 * Rate [Album, Artist, Artwork, Episode, Folder, Root, Playlist, Podcast, Radio, Series, Track] // Rights needed: stream
	 */
	async rate(parameters: JamParameters.RateParameters): Promise<Jam.State> {
		return this.base.requestPostData<Jam.State>('/state/rate', parameters);
	}
}
