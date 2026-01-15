import { EventEmitter, inject, Injectable } from '@angular/core';
import { getTypeByAlbumType } from '@utils/jam-lists';
import { ImageFormatType, type Jam, JamObjectType, type JamParameters, JamService } from '@jam';
import { AppService } from '../app/app.service';
import { NotifyService } from '../notify/notify.service';

export interface IndexQueryByObjectType {
	[JamObjectType.album]: JamParameters.AlbumFilterParameters;
	[JamObjectType.artist]: JamParameters.ArtistFilterParameters;
	[JamObjectType.series]: JamParameters.SeriesFilterParameters;
	[JamObjectType.genre]: JamParameters.GenreFilterParameters;
	[JamObjectType.folder]: JamParameters.FolderFilterParameters;
}

export type IndexQueryType<T extends keyof IndexQueryByObjectType> =
	IndexQueryByObjectType[T];

export interface IndexEntry {
	id: string;
	link: string;
	name: string;
	details?: string;
	extra?: string;
	extraLink?: string;
	trackCount: number;
	image: string;
}

export interface IndexGroup {
	name: string;
	expanded?: boolean;
	entries: Array<IndexEntry>;
}

export interface Index {
	name: string;
	type: JamObjectType;
	groups: Array<IndexGroup>;
}

function buildIndexAlbumIndex(index: Jam.AlbumIndex | undefined, expanded: boolean, name: string, jam: JamService): Index | undefined {
	if (!index) {
		return;
	}
	return {
		type: JamObjectType.album,
		name,
		groups: index.groups.map(g => ({
			name: g.name,
			expanded,
			entries: g.items.map(entry => ({
				id: entry.id,
				link: `/library/albums/id/${entry.id}`,
				extraLink: `/library/artists/id/${entry.artistID}`,
				name: entry.name,
				extra: entry.artist,
				visible: false,
				trackCount: entry.trackCount,
				image: jam.image.imageUrl({ id: entry.id, size: 200, format: ImageFormatType.webp })
			}))
		}))
	};
}

function buildIndexFolderIndex(index: Jam.FolderIndex | undefined, expanded: boolean, name: string, jam: JamService): Index | undefined {
	if (!index) {
		return;
	}
	return {
		name,
		type: JamObjectType.folder,
		groups: index.groups.map(g => ({
			name: g.name,
			expanded,
			entries: g.items.map(entry => ({
				id: entry.id,
				link: `/library/folders/id/${entry.id}`,
				name: entry.name,
				visible: false,
				trackCount: entry.trackCount,
				image: jam.image.imageUrl({ id: entry.id, size: 200, format: ImageFormatType.webp })
			}))
		}))
	};
}

function buildIndexArtistIndex(index: Jam.ArtistIndex | undefined, expanded: boolean, name: string, jam: JamService): Index | undefined {
	if (!index) {
		return;
	}
	return {
		name,
		type: JamObjectType.artist,
		groups: index.groups.map(g => ({
			name: g.name,
			expanded,
			entries: g.items.map(entry => ({
				id: entry.id,
				link: `/library/artists/id/${entry.id}`,
				name: entry.name,
				visible: false,
				trackCount: entry.trackCount,
				image: jam.image.imageUrl({ id: entry.id, size: 200, format: ImageFormatType.webp })
			}))
		}))
	};
}

function buildIndexSeriesIndex(seriesIndex: Jam.SeriesIndex | undefined, expanded: boolean, name: string, jam: JamService): Index | undefined {
	if (!seriesIndex) {
		return;
	}
	return {
		name,
		type: JamObjectType.series,
		groups: seriesIndex.groups.map(g => ({
			name: g.name,
			expanded,
			entries: g.items.map(entry => ({
				id: entry.id,
				link: `/library/series/id/${entry.id}`,
				name: entry.name,
				visible: false,
				trackCount: entry.trackCount,
				image: jam.image.imageUrl({ id: entry.id, size: 200, format: ImageFormatType.webp })
			}))
		}))
	};
}

function buildIndexGenreIndex(genreIndex: Jam.GenreIndex | undefined, expanded: boolean, name: string, jam: JamService): Index | undefined {
	if (!genreIndex) {
		return;
	}
	return {
		name,
		type: JamObjectType.genre,
		groups: genreIndex.groups.map(g => ({
			name: g.name,
			expanded,
			entries: g.items.map(entry => ({
				id: entry.id,
				link: `/library/genres/id/${entry.id}`,
				name: entry.name,
				details: [
					{ name: 'Albums', count: entry.albumCount },
					{ name: 'Artists', count: entry.artistCount },
					{ name: 'Tracks', count: entry.trackCount }
				]
					.filter(d => d.count > 0)
					.map(d => `${d.name}: ${d.count}`).join(', '),
				visible: false,
				trackCount: entry.trackCount,
				image: jam.image.imageUrl({ id: entry.id, size: 200, format: ImageFormatType.webp })
			}))
		}))
	};
}

export class IndexCache {
	index?: Index;

	constructor(public type: JamObjectType, public query: any) {
	}

	isQuery(query: any): boolean {
		return JSON.stringify(query) === JSON.stringify(this.query);
	}

	matches(type: JamObjectType, query: any): boolean {
		return type === this.type && this.isQuery(query);
	}
}

@Injectable({
	providedIn: 'root'
})
export class IndexService {
	readonly indexNotify = new EventEmitter<IndexCache>();
	private readonly app = inject(AppService);
	private readonly jam = inject(JamService);
	private readonly notify = inject(NotifyService);
	private readonly indexes: Array<IndexCache> = [];

	findIndexCache(type: JamObjectType, query: any): IndexCache | undefined {
		return this.indexes.find(index => index.matches(type, query));
	}

	async getIndex<T extends keyof IndexQueryByObjectType>(objType: T, query: IndexQueryType<T>): Promise<Index | undefined> {
		switch (objType) {
			case JamObjectType.folder: {
				return buildIndexFolderIndex(
					await this.jam.folder.index(query as JamParameters.FolderFilterParameters),
					!this.app.smallscreen, 'Folders', this.jam);
			}
			case JamObjectType.artist: {
				return buildIndexArtistIndex(
					await this.jam.artist.index(query as JamParameters.ArtistFilterParameters),
					!this.app.smallscreen, 'Artists', this.jam);
			}
			case JamObjectType.series: {
				return buildIndexSeriesIndex(
					await this.jam.series.index(query as JamParameters.SeriesFilterParameters),
					!this.app.smallscreen, 'Series', this.jam);
			}
			case JamObjectType.genre: {
				return buildIndexGenreIndex(
					await this.jam.genre.index(query as JamParameters.GenreFilterParameters),
					!this.app.smallscreen, 'Genres', this.jam);
			}
			case JamObjectType.album: {
				const q = query as JamParameters.AlbumFilterParameters;
				const albumType = q.albumTypes?.at(0);
				const type = albumType ? getTypeByAlbumType(albumType) : undefined;
				return buildIndexAlbumIndex(
					await this.jam.album.index(q),
					!this.app.smallscreen, type ? type.text : 'Albums', this.jam);
			}
			default: {
				return;
			}
		}
	}

	requestIndex<T extends keyof IndexQueryByObjectType>(objType: T, query: IndexQueryType<T>): Index | undefined {
		const item = this.findIndexCache(objType, query);
		if (item?.index) {
			return item.index;
		}
		if (item) {
			return; // already requested
		}
		const result = new IndexCache(objType, query);
		this.indexes.push(result);
		this.getIndex(objType, query)
			.then(index => {
				result.index = index;
				if (result.index) {
					this.indexNotify.emit(result);
				}
			})
			.catch((error: unknown) => {
				this.notify.error(error);
			});
		return;
	}
}
