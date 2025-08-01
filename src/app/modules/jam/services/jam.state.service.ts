// @generated
// This file was automatically generated and should not be edited.

import {Injectable, inject} from '@angular/core';

import {JamBaseService} from '../jam.base.service';
import type {Jam} from '../model/jam-rest-data';
import type {JamParameters} from '../model/jam-rest-params';

@Injectable()
export class JamStateService {
	private readonly base = inject(JamBaseService);

	/**
	 * Get User State (fav/rate/etc) [Album, Artist, Artwork, Episode, Folder, Root, Playlist, Podcast, Radio, Series, Track] // Rights needed: stream
	 */
	async state(params: JamParameters.ID): Promise<Jam.State> {
		return this.base.requestData<Jam.State>('/state/id', params);
	}

	/**
	 * Get User States (fav/rate/etc) [Album, Artist, Artwork, Episode, Folder, Root, Playlist, Podcast, Radio, Series, Track] // Rights needed: stream
	 */
	async states(params: JamParameters.StatesArgs): Promise<Jam.States> {
		return this.base.requestData<Jam.States>('/state/list', params);
	}

	/**
	 * Set/Unset Favorite [Album, Artist, Artwork, Episode, Folder, Root, Playlist, Podcast, Radio, Series, Track] // Rights needed: stream
	 */
	async fav(params: JamParameters.FavArgs): Promise<Jam.State> {
		return this.base.requestPostData<Jam.State>('/state/fav', params);
	}

	/**
	 * Rate [Album, Artist, Artwork, Episode, Folder, Root, Playlist, Podcast, Radio, Series, Track] // Rights needed: stream
	 */
	async rate(params: JamParameters.RateArgs): Promise<Jam.State> {
		return this.base.requestPostData<Jam.State>('/state/rate', params);
	}
}
