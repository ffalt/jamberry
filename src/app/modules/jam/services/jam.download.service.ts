// @generated
// This file was automatically generated and should not be edited.

import {Injectable} from '@angular/core';

import {JamBaseService} from '../jam.base.service';
import {JamParameters} from '../model/jam-rest-params';

@Injectable()
export class JamDownloadService {

	constructor(private base: JamBaseService) {
	}

	/**
	 * Download Archive Binary [Album, Artist, Artwork, Episode, Folder, Playlist, Podcast, Series, Track] // Rights needed: stream
	 */
	downloadUrl(params: JamParameters.DownloadDownloadArgs): string {
		if (!params.id) { return ''; }
		return this.base.buildRequestUrl(`/download/${params.id}${params.format ? `.${params.format}` : ''}`, {});
	}

	/**
	 * Download Archive Binary [Album, Artist, Artwork, Episode, Folder, Playlist, Podcast, Series, Track] // Rights needed: stream
	 */
	async downloadBinary(params: JamParameters.DownloadDownloadArgs): Promise<{ buffer: ArrayBuffer; contentType: string }> {
		if (!params.id) { throw new Error('Invalid Parameter'); }
		return this.base.binary(`/download/${params.id}${params.format ? `.${params.format}` : ''}`, {});
	}

}
