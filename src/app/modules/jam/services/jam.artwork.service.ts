// @generated
// This file was automatically generated and should not be edited.

import type {HttpEvent} from '@angular/common/http';
import {Injectable, inject} from '@angular/core';
import type {Observable} from 'rxjs';

import {JamBaseService} from '../jam.base.service';
import type {Jam} from '../model/jam-rest-data';
import type {JamParameters} from '../model/jam-rest-params';

@Injectable()
export class JamArtworkService {
	private readonly base = inject(JamBaseService);

	/**
	 * Get an Artwork by Id // Rights needed: stream
	 */
	async id(params: JamParameters.ArtworkIdArgs): Promise<Jam.Artwork> {
		return this.base.requestData<Jam.Artwork>('/artwork/id', params);
	}

	/**
	 * Search Artworks // Rights needed: stream
	 */
	async search(params: JamParameters.ArtworkSearchArgs): Promise<Jam.ArtworkPage> {
		return this.base.requestData<Jam.ArtworkPage>('/artwork/search', params);
	}

	/**
	 * Create an Artwork // Rights needed: stream
	 */
	async createByUrl(params: JamParameters.ArtworkNewArgs): Promise<Jam.AdminChangeQueueInfo> {
		return this.base.requestPostData<Jam.AdminChangeQueueInfo>('/artwork/create', params);
	}

	/**
	 * Upload an Artwork // Rights needed: stream
	 */
	createByUpload(params: JamParameters.ArtworkCreateByUploadArgs, file: File): Observable<HttpEvent<any>> {
		return this.base.upload('/artwork/upload', params, 'image', file);
	}

	/**
	 * Update an Artwork // Rights needed: stream
	 */
	update(params: JamParameters.ArtworkUpdateArgs, file: File): Observable<HttpEvent<any>> {
		return this.base.upload('/artwork/update', params, 'image', file);
	}

	/**
	 * Rename an Artwork // Rights needed: stream
	 */
	async rename(params: JamParameters.ArtworkRenameArgs): Promise<Jam.AdminChangeQueueInfo> {
		return this.base.requestPostData<Jam.AdminChangeQueueInfo>('/artwork/rename', params);
	}

	/**
	 * Remove an Artwork // Rights needed: stream
	 */
	async remove(params: JamParameters.ID): Promise<Jam.AdminChangeQueueInfo> {
		return this.base.requestPostData<Jam.AdminChangeQueueInfo>('/artwork/remove', params);
	}
}
