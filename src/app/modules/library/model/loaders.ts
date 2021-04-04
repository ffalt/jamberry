/* eslint-disable max-classes-per-file */
import {MUSICBRAINZ_VARIOUS_ARTISTS_ID} from '@app/utils/jam-lists';
import {AlbumType, Jam, ListType} from '@jam';
import {
	JamAlbumObject,
	JamArtistObject,
	JamFolderObject,
	JamGenreObject,
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
	genreID?: string;
}

export abstract class JamObjsLoader {
	abstract typeName: string;

	constructor(protected library: LibraryService) {

	}

	abstract search(query: JamObjsLoaderSearchQuery, skip?: number, take?: number): Promise<{ list: Jam.Page; items: Array<JamLibraryObject> }>;

	abstract list(listQuery: { listType: ListType; albumType?: AlbumType }, skip?: number, take?: number): Promise<{ list: Jam.Page; items: Array<JamLibraryObject> }>;

	abstract all(skip?: number, take?: number): Promise<{ list: Jam.Page; items: Array<JamLibraryObject> }>;
}

export class AlbumsLoader extends JamObjsLoader {
	typeName = 'Albums';

	async search(query: JamObjsLoaderSearchQuery, skip?: number, take?: number): Promise<{ list: Jam.AlbumPage; items: Array<JamLibraryObject> }> {
		const list = await this.library.jam.album.search({
			query: query.query,
			genres: query.genre ? [query.genre] : undefined,
			genreIDs: query.genreID ? [query.genreID] : undefined,
			skip,
			take,
			albumIncState: true
		});
		return {list, items: list.items.map(o => new JamAlbumObject(o, this.library))};
	}

	async all(skip?: number, take?: number): Promise<{ list: Jam.AlbumPage; items: Array<JamLibraryObject> }> {
		const list = await this.library.jam.album.search({skip, take, albumIncState: true});
		return {list, items: list.items.map(o => new JamAlbumObject(o, this.library))};
	}

	async list(listQuery: { listType: ListType; albumType?: AlbumType }, skip?: number, take?: number): Promise<{ list: Jam.AlbumPage; items: Array<JamLibraryObject> }> {
		const artistID = listQuery.albumType === AlbumType.compilation ? MUSICBRAINZ_VARIOUS_ARTISTS_ID : undefined;
		const list = await this.library.jam.album.search({
			list: listQuery.listType, skip, take,
			albumIncState: true,
			albumTypes: listQuery.albumType ? [listQuery.albumType] : undefined,
			mbArtistIDs: artistID ? [artistID] : undefined
		});
		return {list, items: list.items.map(o => new JamAlbumObject(o, this.library))};
	}
}

export class ArtistsLoader extends JamObjsLoader {
	typeName = 'Artists';

	async search(query: JamObjsLoaderSearchQuery, skip?: number, take?: number): Promise<{ list: Jam.ArtistPage; items: Array<JamLibraryObject> }> {
		const list = await this.library.jam.artist.search({
			query: query.query,
			genres: query.genre ? [query.genre] : undefined,
			genreIDs: query.genreID ? [query.genreID] : undefined,
			skip, take, artistIncState: true
		});
		return {list, items: list.items.map(o => new JamArtistObject(o, this.library))};
	}

	async all(skip?: number, take?: number): Promise<{ list: Jam.ArtistPage; items: Array<JamLibraryObject> }> {
		const list = await this.library.jam.artist.search({skip, take, artistIncState: true});
		return {list, items: list.items.map(o => new JamArtistObject(o, this.library))};
	}

	async list(listQuery: { listType: ListType; albumType?: AlbumType }, skip?: number, take?: number): Promise<{ list: Jam.ArtistPage; items: Array<JamLibraryObject> }> {
		const list = await this.library.jam.artist.search({
			list: listQuery.listType, skip, take,
			artistIncState: true, albumTypes: listQuery.albumType ? [listQuery.albumType] : undefined
		});
		return {list, items: list.items.map(o => new JamArtistObject(o, this.library))};
	}
}

export class FoldersLoader extends JamObjsLoader {
	typeName = 'Folders';

	async search(query: JamObjsLoaderSearchQuery, skip?: number, take?: number): Promise<{ list: Jam.FolderPage; items: Array<JamLibraryObject> }> {
		const list = await this.library.jam.folder.search({
			query: query.query, genres: query.genre ? [query.genre] : undefined,
			skip, take, folderIncTag: true, folderIncState: true
		});
		return {list, items: list.items.map(o => new JamFolderObject(o, this.library))};
	}

	async all(skip?: number, take?: number): Promise<{ list: Jam.FolderPage; items: Array<JamLibraryObject> }> {
		const list = await this.library.jam.folder.search({skip, take, folderIncTag: true, folderIncState: true});
		return {list, items: list.items.map(o => new JamFolderObject(o, this.library))};
	}

	async list(listQuery: { listType: ListType; albumType?: AlbumType }, skip?: number, take?: number): Promise<{ list: Jam.FolderPage; items: Array<JamLibraryObject> }> {
		const list = await this.library.jam.folder.search({list: listQuery.listType, skip, take, folderIncTag: true, folderIncState: true});
		return {list, items: list.items.map(o => new JamFolderObject(o, this.library))};
	}
}

export class PlaylistsLoader extends JamObjsLoader {
	typeName = 'Playlists';

	async search(query: JamObjsLoaderSearchQuery, skip?: number, take?: number): Promise<{ list: Jam.PlaylistPage; items: Array<JamLibraryObject> }> {
		const list = await this.library.jam.playlist.search({query: query.query, skip, take, playlistIncState: true});
		return {list, items: list.items.map(o => new JamPlaylistObject(o, this.library))};
	}

	async all(skip?: number, take?: number): Promise<{ list: Jam.PlaylistPage; items: Array<JamLibraryObject> }> {
		const list = await this.library.jam.playlist.search({skip, take, playlistIncState: true});
		return {list, items: list.items.map(o => new JamPlaylistObject(o, this.library))};
	}

	async list(listQuery: { listType: ListType; albumType?: AlbumType }, skip?: number, take?: number): Promise<{ list: Jam.PlaylistPage; items: Array<JamLibraryObject> }> {
		const list = await this.library.jam.playlist.search({list: listQuery.listType, skip, take, playlistIncState: true});
		return {list, items: list.items.map(o => new JamPlaylistObject(o, this.library))};
	}
}

export class GenresLoader extends JamObjsLoader {
	typeName = 'Genres';

	async search(query: JamObjsLoaderSearchQuery, skip?: number, take?: number): Promise<{ list: Jam.GenrePage; items: Array<JamLibraryObject> }> {
		const list = await this.library.jam.genre.search({query: query.query, skip, take, genreState: true});
		return {list, items: list.items.map(o => new JamGenreObject(o, this.library))};
	}

	async all(skip?: number, take?: number): Promise<{ list: Jam.GenrePage; items: Array<JamLibraryObject> }> {
		const list = await this.library.jam.genre.search({skip, take, genreState: true});
		return {list, items: list.items.map(o => new JamGenreObject(o, this.library))};
	}

	async list(listQuery: { listType: ListType }, skip?: number, take?: number): Promise<{ list: Jam.GenrePage; items: Array<JamLibraryObject> }> {
		const list = await this.library.jam.genre.search({list: listQuery.listType, skip, take, genreState: true});
		return {list, items: list.items.map(o => new JamGenreObject(o, this.library))};
	}
}

export class PodcastsLoader extends JamObjsLoader {
	typeName = 'Podcasts';

	async search(query: JamObjsLoaderSearchQuery, skip?: number, take?: number): Promise<{ list: Jam.PodcastPage; items: Array<JamLibraryObject> }> {
		const list = await this.library.jam.podcast.search({query: query.query, skip, take, podcastIncState: true});
		return {list, items: list.items.map(o => new JamPodcastObject(o, this.library))};
	}

	async all(skip?: number, take?: number): Promise<{ list: Jam.PodcastPage; items: Array<JamLibraryObject> }> {
		const list = await this.library.jam.podcast.search({skip, take, podcastIncState: true});
		return {list, items: list.items.map(o => new JamPodcastObject(o, this.library))};
	}

	async list(listQuery: { listType: ListType; albumType?: AlbumType }, skip?: number, take?: number): Promise<{ list: Jam.PodcastPage; items: Array<JamLibraryObject> }> {
		const list = await this.library.jam.podcast.search({list: listQuery.listType, skip, take, podcastIncState: true});
		return {list, items: list.items.map(o => new JamPodcastObject(o, this.library))};
	}
}

export class SeriesLoader extends JamObjsLoader {
	typeName = 'Series';

	async search(query: JamObjsLoaderSearchQuery, skip?: number, take?: number): Promise<{ list: Jam.SeriesPage; items: Array<JamLibraryObject> }> {
		const list = await this.library.jam.series.search({query: query.query, skip, take, seriesIncState: true});
		return {list, items: list.items.map(o => new JamSeriesObject(o, this.library))};
	}

	async all(skip?: number, take?: number): Promise<{ list: Jam.SeriesPage; items: Array<JamLibraryObject> }> {
		const list = await this.library.jam.series.search({skip, take, seriesIncState: true});
		return {list, items: list.items.map(o => new JamSeriesObject(o, this.library))};
	}

	async list(listQuery: { listType: ListType; albumType?: AlbumType }, skip?: number, take?: number): Promise<{ list: Jam.SeriesPage; items: Array<JamLibraryObject> }> {
		const list = await this.library.jam.series.search({list: listQuery.listType, skip, take, seriesIncState: true});
		return {list, items: list.items.map(o => new JamSeriesObject(o, this.library))};
	}
}
