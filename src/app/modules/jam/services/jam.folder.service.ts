// @generated
// This file was automatically generated and should not be edited.

import { inject, Injectable } from '@angular/core';

import { JamBaseService } from '../jam.base.service';
import type { Jam } from '../model/jam-rest-data';
import type { JamParameters } from '../model/jam-rest-params';

@Injectable()
export class JamFolderService {
	private readonly base = inject(JamBaseService);

	/**
	 * Get a Folder by Id // Rights needed: stream
	 */
	async id(parameters: JamParameters.FolderIdParameters): Promise<Jam.Folder> {
		return this.base.requestData<Jam.Folder>('/folder/id', parameters);
	}

	/**
	 * Get the Navigation Index for Folders // Rights needed: stream
	 */
	async index(parameters: JamParameters.FolderFilterParameters): Promise<Jam.FolderIndex> {
		return this.base.requestData<Jam.FolderIndex>('/folder/index', parameters);
	}

	/**
	 * Search Folders // Rights needed: stream
	 */
	async search(parameters: JamParameters.FolderSearchParameters): Promise<Jam.FolderPage> {
		return this.base.requestData<Jam.FolderPage>('/folder/search', parameters);
	}

	/**
	 * Get Tracks of Folders // Rights needed: stream
	 */
	async tracks(parameters: JamParameters.FolderTracksParameters): Promise<Jam.TrackPage> {
		return this.base.requestData<Jam.TrackPage>('/folder/tracks', parameters);
	}

	/**
	 * Get Child Folders of Folders // Rights needed: stream
	 */
	async subfolders(parameters: JamParameters.FolderSubfoldersParameters): Promise<Jam.TrackPage> {
		return this.base.requestData<Jam.TrackPage>('/folder/subfolders', parameters);
	}

	/**
	 * Get Artworks of Folders // Rights needed: stream
	 */
	async artworks(parameters: JamParameters.FolderArtworksParameters): Promise<Jam.ArtworkPage> {
		return this.base.requestData<Jam.ArtworkPage>('/folder/artworks', parameters);
	}

	/**
	 * Get Meta Data Info of an Artist by Folder Id (External Service) // Rights needed: stream
	 */
	async artistInfo(parameters: JamParameters.ID): Promise<Jam.ExtendedInfoResult> {
		return this.base.requestData<Jam.ExtendedInfoResult>('/folder/artist/info', parameters);
	}

	/**
	 * Get Meta Data Info of an Album by Folder Id (External Service) // Rights needed: stream
	 */
	async albumInfo(parameters: JamParameters.ID): Promise<Jam.ExtendedInfoResult> {
		return this.base.requestData<Jam.ExtendedInfoResult>('/folder/album/info', parameters);
	}

	/**
	 * Get similar Artist Folders of a Folder by Id (External Service) // Rights needed: stream
	 */
	async artistsSimilar(parameters: JamParameters.FolderArtistsSimilarParameters): Promise<Jam.FolderPage> {
		return this.base.requestData<Jam.FolderPage>('/folder/artist/similar', parameters);
	}

	/**
	 * Get similar Tracks of a Artist Folder by Id (External Service) // Rights needed: stream
	 */
	async artistsSimilarTracks(parameters: JamParameters.FolderArtistsSimilarTracksParameters): Promise<Jam.TrackPage> {
		return this.base.requestData<Jam.TrackPage>('/folder/artist/similar/tracks', parameters);
	}

	/**
	 * Get a List of Folders with Health Issues // Rights needed: stream
	 */
	async health(parameters: JamParameters.FolderHealthParameters): Promise<Array<Jam.FolderHealth>> {
		return this.base.requestData<Array<Jam.FolderHealth>>('/folder/health', parameters);
	}

	/**
	 * Create a Folder // Rights needed: stream
	 */
	async create(parameters: JamParameters.FolderCreateParameters): Promise<Jam.AdminChangeQueueInfo> {
		return this.base.requestPostData<Jam.AdminChangeQueueInfo>('/folder/create', parameters);
	}

	/**
	 * Rename a folder // Rights needed: stream
	 */
	async rename(parameters: JamParameters.FolderRenameParameters): Promise<Jam.AdminChangeQueueInfo> {
		return this.base.requestPostData<Jam.AdminChangeQueueInfo>('/folder/rename', parameters);
	}

	/**
	 * Move a Folder // Rights needed: stream
	 */
	async move(parameters: JamParameters.FolderMoveParameters): Promise<Jam.AdminChangeQueueInfo> {
		return this.base.requestPostData<Jam.AdminChangeQueueInfo>('/folder/move', parameters);
	}

	/**
	 * Remove a Folder // Rights needed: stream
	 */
	async remove(parameters: JamParameters.ID): Promise<Jam.AdminChangeQueueInfo> {
		return this.base.requestPostData<Jam.AdminChangeQueueInfo>('/folder/remove', parameters);
	}
}
