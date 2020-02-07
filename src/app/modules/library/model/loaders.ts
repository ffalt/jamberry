/* tslint:disable:max-classes-per-file */
import {AlbumType, Jam, JamParameters, MUSICBRAINZ_VARIOUS_ARTISTS_ID} from '@jam';
import {
	JamAlbumObject,
	JamArtistObject,
	JamFolderObject,
	JamLibraryObject,
	JamPlaylistObject,
	JamPodcastObject,
	JamSeriesObject
} from '@library/model/objects';
import {LibraryService} from '@library/services';

export interface JamObjsLoaderSearchQuery {
	query?: string;
	albumType?: AlbumType;
	genre?: string;
}

export abstract class JamObjsLoader {
	typeName: string;

	constructor(protected library: LibraryService) {

	}

	abstract search(query: JamObjsLoaderSearchQuery, offset?: number, amount?: number): Promise<{ list: Jam.ListResult, items: Array<JamLibraryObject> }>;

	abstract list(listQuery: { listType: JamParameters.ListType, albumType?: AlbumType }, offset?: number, amount?: number): Promise<{ list: Jam.ListResult, items: Array<JamLibraryObject> }>;

	abstract all(offset?: number, amount?: number): Promise<{ list: Jam.ListResult, items: Array<JamLibraryObject> }>;
}

export class AlbumsLoader extends JamObjsLoader {
	typeName = 'Albums';

	async search(query: JamObjsLoaderSearchQuery, offset?: number, amount?: number): Promise<{ list: Jam.ListResult, items: Array<JamLibraryObject> }> {
		const list = await this.library.jam.album.search({
			query: query.query,
			genre: query.genre,
			offset,
			amount,
			albumState: true
		});
		return {list, items: list.items.map(o => new JamAlbumObject(o, this.library))};
	}

	async all(offset?: number, amount?: number): Promise<{ list: Jam.ListResult, items: Array<JamLibraryObject> }> {
		const list = await this.library.jam.album.search({offset, amount, albumState: true});
		return {list, items: list.items.map(o => new JamAlbumObject(o, this.library))};
	}

	async list(listQuery: { listType: JamParameters.ListType, albumType?: AlbumType }, offset?: number, amount?: number): Promise<{ list: Jam.ListResult, items: Array<JamLibraryObject> }> {
		const artistID = listQuery.albumType === AlbumType.compilation ? MUSICBRAINZ_VARIOUS_ARTISTS_ID : undefined;
		const list = await this.library.jam.album.list({
			list: listQuery.listType, offset, amount,
			albumState: true,
			albumType: listQuery.albumType,
			mbArtistID: artistID
		});
		return {list, items: list.items.map(o => new JamAlbumObject(o, this.library))};
	}
}

export class ArtistsLoader extends JamObjsLoader {
	typeName = 'Artists';

	async search(query: JamObjsLoaderSearchQuery, offset?: number, amount?: number): Promise<{ list: Jam.ListResult, items: Array<JamLibraryObject> }> {
		const list = await this.library.jam.artist.search({
			query: query.query,
			genre: query.genre,
			offset, amount, artistState: true
		});
		return {list, items: list.items.map(o => new JamArtistObject(o, this.library))};
	}

	async all(offset?: number, amount?: number): Promise<{ list: Jam.ListResult, items: Array<JamLibraryObject> }> {
		const list = await this.library.jam.artist.search({offset, amount, artistState: true});
		return {list, items: list.items.map(o => new JamArtistObject(o, this.library))};
	}

	async list(listQuery: { listType: JamParameters.ListType, albumType?: AlbumType }, offset?: number, amount?: number): Promise<{ list: Jam.ListResult, items: Array<JamLibraryObject> }> {
		const list = await this.library.jam.artist.list({
			list: listQuery.listType, offset, amount,
			artistState: true, albumType: listQuery.albumType
		});
		return {list, items: list.items.map(o => new JamArtistObject(o, this.library))};
	}
}

export class FoldersLoader extends JamObjsLoader {
	typeName = 'Folders';

	async search(query: JamObjsLoaderSearchQuery, offset?: number, amount?: number): Promise<{ list: Jam.ListResult, items: Array<JamLibraryObject> }> {
		const list = await this.library.jam.folder.search({
			query: query.query, genre: query.genre,
			offset, amount, folderTag: true, folderState: true
		});
		return {list, items: list.items.map(o => new JamFolderObject(o, this.library))};
	}

	async all(offset?: number, amount?: number): Promise<{ list: Jam.ListResult, items: Array<JamLibraryObject> }> {
		const list = await this.library.jam.folder.search({offset, amount, folderTag: true, folderState: true});
		return {list, items: list.items.map(o => new JamFolderObject(o, this.library))};
	}

	async list(listQuery: { listType: JamParameters.ListType, albumType?: AlbumType }, offset?: number, amount?: number): Promise<{ list: Jam.ListResult, items: Array<JamLibraryObject> }> {
		const list = await this.library.jam.folder.list({list: listQuery.listType, offset, amount, folderTag: true, folderState: true});
		return {list, items: list.items.map(o => new JamFolderObject(o, this.library))};
	}
}

export class PlaylistsLoader extends JamObjsLoader {
	typeName = 'Playlists';

	async search(query: JamObjsLoaderSearchQuery, offset?: number, amount?: number): Promise<{ list: Jam.ListResult, items: Array<JamLibraryObject> }> {
		const list = await this.library.jam.playlist.search({query: query.query, offset, amount, playlistState: true});
		return {list, items: list.items.map(o => new JamPlaylistObject(o, this.library))};
	}

	async all(offset?: number, amount?: number): Promise<{ list: Jam.ListResult, items: Array<JamLibraryObject> }> {
		const list = await this.library.jam.playlist.search({offset, amount, playlistState: true});
		return {list, items: list.items.map(o => new JamPlaylistObject(o, this.library))};
	}

	async list(listQuery: { listType: JamParameters.ListType, albumType?: AlbumType }, offset?: number, amount?: number): Promise<{ list: Jam.ListResult, items: Array<JamLibraryObject> }> {
		const list = await this.library.jam.playlist.list({list: listQuery.listType, offset, amount, playlistState: true});
		return {list, items: list.items.map(o => new JamPlaylistObject(o, this.library))};
	}
}

export class PodcastsLoader extends JamObjsLoader {
	typeName = 'Podcasts';

	async search(query: JamObjsLoaderSearchQuery, offset?: number, amount?: number): Promise<{ list: Jam.ListResult, items: Array<JamLibraryObject> }> {
		const list = await this.library.jam.podcast.search({query: query.query, offset, amount, podcastState: true});
		return {list, items: list.items.map(o => new JamPodcastObject(o, this.library))};
	}

	async all(offset?: number, amount?: number): Promise<{ list: Jam.ListResult, items: Array<JamLibraryObject> }> {
		const list = await this.library.jam.podcast.search({offset, amount, podcastState: true});
		return {list, items: list.items.map(o => new JamPodcastObject(o, this.library))};
	}

	async list(listQuery: { listType: JamParameters.ListType, albumType?: AlbumType }, offset?: number, amount?: number): Promise<{ list: Jam.ListResult, items: Array<JamLibraryObject> }> {
		const list = await this.library.jam.podcast.list({list: listQuery.listType, offset, amount, podcastState: true});
		return {list, items: list.items.map(o => new JamPodcastObject(o, this.library))};
	}
}

export class SeriesLoader extends JamObjsLoader {
	typeName = 'Series';

	async search(query: JamObjsLoaderSearchQuery, offset?: number, amount?: number): Promise<{ list: Jam.ListResult, items: Array<JamLibraryObject> }> {
		const list = await this.library.jam.series.search({query: query.query, offset, amount, seriesState: true});
		return {list, items: list.items.map(o => new JamSeriesObject(o, this.library))};
	}

	async all(offset?: number, amount?: number): Promise<{ list: Jam.ListResult, items: Array<JamLibraryObject> }> {
		const list = await this.library.jam.series.search({offset, amount, seriesState: true});
		return {list, items: list.items.map(o => new JamSeriesObject(o, this.library))};
	}

	async list(listQuery: { listType: JamParameters.ListType, albumType?: AlbumType }, offset?: number, amount?: number): Promise<{ list: Jam.ListResult, items: Array<JamLibraryObject> }> {
		const list = await this.library.jam.series.list({list: listQuery.listType, offset, amount, seriesState: true});
		return {list, items: list.items.map(o => new JamSeriesObject(o, this.library))};
	}
}
