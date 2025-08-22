// @generated
// This file was automatically generated and should not be edited.

import { inject, Injectable } from '@angular/core';

import { JamBaseService } from '../jam.base.service';
import type { Jam } from '../model/jam-rest-data';
import type { JamParameters } from '../model/jam-rest-params';

@Injectable()
export class JamBookmarkService {
	private readonly base = inject(JamBaseService);

	/**
	 * Get a Bookmark by Id // Rights needed: stream
	 */
	async id(parameters: JamParameters.BookmarkIdParameters): Promise<Jam.Bookmark> {
		return this.base.requestData<Jam.Bookmark>('/bookmark/id', parameters);
	}

	/**
	 * Search Bookmarks // Rights needed: stream
	 */
	async search(parameters: JamParameters.BookmarkSearchParameters): Promise<Jam.BookmarkPage> {
		return this.base.requestData<Jam.BookmarkPage>('/bookmark/search', parameters);
	}

	/**
	 * Create a Bookmark // Rights needed: stream
	 */
	async create(parameters: JamParameters.BookmarkCreateParameters): Promise<Jam.Bookmark> {
		return this.base.requestPostData<Jam.Bookmark>('/bookmark/create', parameters);
	}

	/**
	 * Remove a Bookmark by Id // Rights needed: stream
	 */
	async remove(parameters: JamParameters.ID): Promise<void> {
		return this.base.requestPostDataOK('/bookmark/remove', parameters);
	}

	/**
	 * Remove Bookmarks by Media Id [Track/Episode] // Rights needed: stream
	 */
	async removeByMedia(parameters: JamParameters.ID): Promise<void> {
		return this.base.requestPostDataOK('/bookmark/removeByMedia', parameters);
	}
}
