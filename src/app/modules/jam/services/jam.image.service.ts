// @generated
// This file was automatically generated and should not be edited.

import {Injectable, inject} from '@angular/core';

import {JamBaseService} from '../jam.base.service';
import type {JamParameters} from '../model/jam-rest-params';

@Injectable()
export class JamImageService {
	private readonly base = inject(JamBaseService);

	/**
	 * Image Binary [Album, Artist, Artwork, Episode, Folder, Root, Playlist, Podcast, Radio, Series, Track, User] // Rights needed: stream
	 */
	imageUrl(params: JamParameters.ImageArgs): string {
		if (!params.id) { return ''; }
		return this.base.buildRequestUrl(`/image/${params.id}${params.size ? `_${params.size}` : ''}${params.format ? `.${params.format}` : ''}`, {});
	}

	/**
	 * Image Binary [Album, Artist, Artwork, Episode, Folder, Root, Playlist, Podcast, Radio, Series, Track, User] // Rights needed: stream
	 */
	async imageBinary(params: JamParameters.ImageArgs): Promise<{ buffer: ArrayBuffer; contentType: string }> {
		if (!params.id) { throw new Error('Invalid Parameter'); }
		return this.base.binary(`/image/${params.id}${params.size ? `_${params.size}` : ''}${params.format ? `.${params.format}` : ''}`, {});
	}
}
