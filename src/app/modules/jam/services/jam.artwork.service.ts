// @generated
// This file was automatically generated and should not be edited.

import type { HttpEvent } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';

import { JamBaseService } from '../jam.base.service';
import type { Jam } from '../model/jam-rest-data';
import type { JamParameters } from '../model/jam-rest-params';

@Injectable()
export class JamArtworkService {
	private readonly base = inject(JamBaseService);

	/**
	 * Get an Artwork by Id // Rights needed: stream
	 */
	async id(parameters: JamParameters.ArtworkIdParameters): Promise<Jam.Artwork> {
		return this.base.requestData<Jam.Artwork>('/artwork/id', parameters);
	}

	/**
	 * Search Artworks // Rights needed: stream
	 */
	async search(parameters: JamParameters.ArtworkSearchParameters): Promise<Jam.ArtworkPage> {
		return this.base.requestData<Jam.ArtworkPage>('/artwork/search', parameters);
	}

	/**
	 * Create an Artwork // Rights needed: stream
	 */
	async createByUrl(parameters: JamParameters.ArtworkNewParameters): Promise<Jam.AdminChangeQueueInfo> {
		return this.base.requestPostData<Jam.AdminChangeQueueInfo>('/artwork/create', parameters);
	}

	/**
	 * Upload an Artwork // Rights needed: stream
	 */
	createByUpload(params: JamParameters.ArtworkCreateByUploadParameters, file: File): Observable<HttpEvent<Jam.AdminChangeQueueInfo>> {
		return this.base.upload('/artwork/upload', params, 'image', file);
	}

	/**
	 * Update an Artwork // Rights needed: stream
	 */
	update(params: JamParameters.ArtworkUpdateParameters, file: File): Observable<HttpEvent<Jam.AdminChangeQueueInfo>> {
		return this.base.upload('/artwork/update', params, 'image', file);
	}

	/**
	 * Rename an Artwork // Rights needed: stream
	 */
	async rename(parameters: JamParameters.ArtworkRenameParameters): Promise<Jam.AdminChangeQueueInfo> {
		return this.base.requestPostData<Jam.AdminChangeQueueInfo>('/artwork/rename', parameters);
	}

	/**
	 * Remove an Artwork // Rights needed: stream
	 */
	async remove(parameters: JamParameters.ID): Promise<Jam.AdminChangeQueueInfo> {
		return this.base.requestPostData<Jam.AdminChangeQueueInfo>('/artwork/remove', parameters);
	}
}
