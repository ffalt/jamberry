import {EventEmitter, Injectable} from '@angular/core';
import {getTypeByAlbumType} from '@app/utils/jam-lists';
import {AppService, NotifyService} from '@core/services';
import {Jam, JamObjectType, JamService} from '@jam';

export interface IndexEntry {
	id: string;
	link: string;
	name: string;
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

function buildIndexAlbumIndex(index: Jam.AlbumIndex, expanded: boolean, name: string, jam: JamService): Index | undefined {
	if (index) {
		return {
			type: JamObjectType.album,
			name,
			groups: index.groups.map(g => ({
				name: g.name,
				expanded,
				entries: g.entries.map(entry => ({
					id: entry.id,
					link: '/library/albums/id/' + entry.id,
					extraLink: '/library/artists/id/' + entry.artistID,
					name: entry.name,
					extra: entry.artist,
					visible: false,
					trackCount: entry.trackCount,
					image: jam.base.image_url(entry.id, 200)
				}))
			}))
		};
	}
}

function buildIndexFolderIndex(index: Jam.FolderIndex, expanded: boolean, name: string, jam: JamService): Index | undefined {
	if (index) {
		return {
			name,
			type: JamObjectType.folder,
			groups: index.groups.map(g => ({
				name: g.name,
				expanded,
				entries: g.entries.map(entry => ({
					id: entry.folderID,
					link: '/library/folders/id/' + entry.folderID,
					name: entry.name,
					visible: false,
					trackCount: entry.trackCount,
					image: jam.base.image_url(entry.folderID, 200)
				}))
			}))
		};
	}
}

function buildIndexArtistIndex(index: Jam.ArtistIndex, expanded: boolean, name: string, jam: JamService): Index | undefined {
	if (index) {
		return {
			name,
			type: JamObjectType.artist,
			groups: index.groups.map(g => ({
				name: g.name,
				expanded,
				entries: g.entries.map(entry => ({
					id: entry.artistID,
					link: '/library/artists/id/' + entry.artistID,
					name: entry.name,
					visible: false,
					trackCount: entry.trackCount,
					image: jam.base.image_url(entry.artistID, 200)
				}))
			}))
		};
	}
}

function buildIndexSeriesIndex(seriesIndex: Jam.SeriesIndex, expanded: boolean, name: string, jam: JamService): Index | undefined {
	if (seriesIndex) {
		return {
			name,
			type: JamObjectType.series,
			groups: seriesIndex.groups.map(g => ({
				name: g.name,
				expanded,
				entries: g.entries.map(entry => ({
					id: entry.seriesID,
					link: '/library/series/id/' + entry.seriesID,
					name: entry.name,
					visible: false,
					trackCount: entry.trackCount,
					image: jam.base.image_url(entry.seriesID, 200)
				}))
			}))
		};
	}
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

@Injectable()
export class IndexService {
	indexNotify = new EventEmitter<IndexCache>();
	private indexes: Array<IndexCache> = [];

	constructor(private app: AppService, private jam: JamService, private notify: NotifyService) {
	}

	findIndex(type: JamObjectType, query: any): IndexCache | undefined {
		return this.indexes.find(index => index.matches(type, query));
	}

	async getIndex(objType: JamObjectType, query: any): Promise<Index | undefined> {
		switch (objType) {
			case JamObjectType.folder:
				return buildIndexFolderIndex(
					await this.jam.folder.index(query),
					!this.app.smallscreen, 'Folders', this.jam);
			case JamObjectType.artist:
				return buildIndexArtistIndex(
					await this.jam.artist.index(query),
					!this.app.smallscreen, 'Artists', this.jam);
			case JamObjectType.series:
				return buildIndexSeriesIndex(
					await this.jam.series.index(query),
					!this.app.smallscreen, 'Series', this.jam);
			case JamObjectType.album:
				const type = getTypeByAlbumType(query.albumType);
				return buildIndexAlbumIndex(
					await this.jam.album.index(query),
					!this.app.smallscreen, type ? type.text : '', this.jam);
			default:
		}
	}

	requestIndex(objType: JamObjectType, query: any): Index | undefined {
		let item = this.findIndex(objType, query);
		if (item && item.index) {
			return item.index;
		}
		if (item) {
			return; // already requested
		}
		item = new IndexCache(objType, query);
		this.indexes.push(item);
		this.getIndex(objType, query)
			.then(index => {
				item.index = index;
				if (item.index) {
					this.indexNotify.emit(item);
				}
			})
			.catch(e => {
				this.notify.error(e);
			});
	}
}
