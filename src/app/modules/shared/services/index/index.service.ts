import {EventEmitter, Injectable} from '@angular/core';
import {JamAlbumTypes} from '@app/utils/jam-lists';
import {AppService, NotifyService} from '@core/services';
import {AlbumType, Jam, JamObjectType, JamParameters, JamService} from '@jam';

export interface IndexEntry {
	id: string;
	name: string;
	extra?: string;
	extraID?: string;
	extraMode?: JamObjectType;
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

function buildIndexAlbumIndex(albumIndex: Jam.AlbumIndex, expanded: boolean, name: string, jam: JamService): Index | undefined {
	if (albumIndex) {
		return {
			type: JamObjectType.album,
			name,
			groups: albumIndex.groups.map(g => ({
				name: g.name,
				expanded,
				entries: g.entries.map(entry => ({
					id: entry.id,
					name: entry.name,
					extra: entry.artist,
					extraID: entry.artistID,
					extraMode: JamObjectType.artist,
					visible: false,
					trackCount: entry.trackCount,
					image: jam.base.image_url(entry.id, 200)
				}))
			}))
		};
	}
}

function buildIndexFolderIndex(artistIndex: Jam.FolderIndex, expanded: boolean, name: string, jam: JamService): Index | undefined {
	if (artistIndex) {
		return {
			name,
			type: JamObjectType.folder,
			groups: artistIndex.groups.map(g => ({
				name: g.name,
				expanded,
				entries: g.entries.map(entry => ({
					id: entry.folderID,
					name: entry.name,
					visible: false,
					trackCount: entry.trackCount,
					image: jam.base.image_url(entry.folderID, 200)
				}))
			}))
		};
	}
}

function buildIndexArtistIndex(artistIndex: Jam.ArtistIndex, expanded: boolean, name: string, jam: JamService): Index | undefined {
	if (artistIndex) {
		return {
			name,
			type: JamObjectType.artist,
			groups: artistIndex.groups.map(g => ({
				name: g.name,
				expanded,
				entries: g.entries.map(entry => ({
					id: entry.artistID,
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
					name: entry.name,
					visible: false,
					trackCount: entry.trackCount,
					image: jam.base.image_url(entry.seriesID, 200)
				}))
			}))
		};
	}
}

interface IndexCache {
	index?: Index;
	query: any;
	mode: JamObjectType;
}

@Injectable()
export class IndexService {
	artistIndexNotify = new EventEmitter<IndexCache>();
	folderIndexNotify = new EventEmitter<IndexCache>();
	albumIndexNotify = new EventEmitter<IndexCache>();
	seriesIndexNotify = new EventEmitter<IndexCache>();
	private indexes: Array<IndexCache> = [];

	constructor(private app: AppService, private jam: JamService, private notify: NotifyService) {
	}

	findIndex(mode: JamObjectType, query: any): IndexCache | undefined {
		const q = JSON.stringify(query);
		return this.indexes.find(index => index.mode === mode && q === JSON.stringify(index.query));
	}

	requestAlbumIndex(query: JamParameters.AlbumIndex): Index | undefined {
		let item = this.findIndex(JamObjectType.album, query);
		if (item && item.index) {
			return item.index;
		}
		if (item) {
			return; // already requested
		}
		item = {mode: JamObjectType.album, query};
		this.indexes.push(item);
		this.jam.album.index(item.query)
			.then(index => {
				const albumType = JamAlbumTypes.find(t => t.id === query.albumType);
				item.index = buildIndexAlbumIndex(index, !this.app.smallscreen, albumType ? albumType.text : 'Albums', this.jam);
				this.albumIndexNotify.emit(item);
			})
			.catch(e => {
				this.notify.error(e);
			});
	}

	requestArtistIndex(query: JamParameters.ArtistIndex): Index | undefined {
		let item = this.findIndex(JamObjectType.artist, query);
		if (item && item.index) {
			return item.index;
		}
		if (item) {
			return; // already requested
		}
		item = {mode: JamObjectType.artist, query};
		this.indexes.push(item);
		this.jam.artist.index(item.query)
			.then(index => {
				item.index = buildIndexArtistIndex(index, !this.app.smallscreen, 'Artists', this.jam);
				this.artistIndexNotify.emit(item);
			})
			.catch(e => {
				this.notify.error(e);
			});
	}

	requestFolderIndex(): Index | undefined {
		const query = {level: 1};
		let item = this.findIndex(JamObjectType.folder, query);
		if (item && item.index) {
			return item.index;
		}
		if (item) {
			return; // already requested
		}
		item = {mode: JamObjectType.artist, query};
		this.indexes.push(item);
		this.jam.folder.index(item.query)
			.then(index => {
				item.index = buildIndexFolderIndex(index, !this.app.smallscreen, 'Folders', this.jam);
				this.folderIndexNotify.emit(item);
			})
			.catch(e => {
				this.notify.error(e);
			});
	}

	requestSeriesIndex(query: { albumType: AlbumType }): Index | undefined {
		let item = this.findIndex(JamObjectType.series, query);
		if (item && item.index) {
			return item.index;
		}
		if (item) {
			return; // already requested
		}
		item = {mode: JamObjectType.series, query};
		this.indexes.push(item);
		this.jam.series.index(item.query)
			.then(index => {
				item.index = buildIndexSeriesIndex(index, !this.app.smallscreen, 'Series', this.jam);
				this.seriesIndexNotify.emit(item);
			})
			.catch(e => {
				this.notify.error(e);
			});
	}
}
