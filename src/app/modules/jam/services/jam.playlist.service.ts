// @generated
// This file was automatically generated and should not be edited.

import { inject, Injectable } from '@angular/core';

import { JamBaseService } from '../jam.base.service';
import type { Jam } from '../model/jam-rest-data';
import type { JamParameters } from '../model/jam-rest-params';

@Injectable()
export class JamPlaylistService {
	private readonly base = inject(JamBaseService);

	/**
	 * Get a Playlist by Id // Rights needed: stream
	 */
	async id(parameters: JamParameters.PlaylistIdParameters): Promise<Jam.Playlist> {
		return this.base.requestData<Jam.Playlist>('/playlist/id', parameters);
	}

	/**
	 * Get the Navigation Index for Playlists // Rights needed: stream
	 */
	async index(parameters: JamParameters.PlaylistFilterParameters): Promise<Jam.PlaylistIndex> {
		return this.base.requestData<Jam.PlaylistIndex>('/playlist/index', parameters);
	}

	/**
	 * Search Playlists // Rights needed: stream
	 */
	async search(parameters: JamParameters.PlaylistSearchParameters): Promise<Jam.PlaylistPage> {
		return this.base.requestData<Jam.PlaylistPage>('/playlist/search', parameters);
	}

	/**
	 * Get Media Entries [Track/Episode] of Playlists // Rights needed: stream
	 */
	async entries(parameters: JamParameters.PlaylistEntriesParameters): Promise<Jam.PlaylistEntryPage> {
		return this.base.requestData<Jam.PlaylistEntryPage>('/playlist/entries', parameters);
	}

	/**
	 * Create a Playlist // Rights needed: stream
	 */
	async create(parameters: JamParameters.PlaylistMutateParameters): Promise<Jam.Playlist> {
		return this.base.requestPostData<Jam.Playlist>('/playlist/create', parameters);
	}

	/**
	 * Update a Playlist // Rights needed: stream
	 */
	async update(parameters: JamParameters.PlaylistUpdateParameters): Promise<Jam.Playlist> {
		return this.base.requestPostData<Jam.Playlist>('/playlist/update', parameters);
	}

	/**
	 * Remove a Playlist // Rights needed: stream
	 */
	async remove(parameters: JamParameters.ID): Promise<void> {
		return this.base.requestPostDataOK('/playlist/remove', parameters);
	}
}
