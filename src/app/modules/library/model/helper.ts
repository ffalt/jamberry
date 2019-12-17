/* tslint:disable:max-classes-per-file */
import {AlbumType, FolderType, FolderTypesAlbum, Jam, JamObjectType, JamParameters, MUSICBRAINZ_VARIOUS_ARTISTS_ID} from '@jam';
import {LibraryService} from '@library/services';
import {HeaderInfo} from '@shared/components';
import {JamObject} from '@shared/model/helpers';
import {ContextMenuObjComponent, ContextMenuObjComponentOptions} from '../components/context-menu-obj/context-menu-obj.component';

export abstract class JamLibraryObject extends JamObject {
	type: JamObjectType;
	childrenTypes?: Array<JamObjectType>;
	tracks?: Array<Jam.Track>;
	albums?: Array<Jam.Album>;
	episodes?: Array<Jam.PodcastEpisode>;

	protected constructor(public base: Jam.Base, protected library: LibraryService) {
		super(base);
	}

	abstract addToPlaylist(): void;

	abstract addToQueue(): void;

	abstract loadChildren(): void;

	abstract groupType(): string;

	abstract getInfos(): Array<HeaderInfo>;

	download(): void {
		this.library.actions.download(this.base);
	}

}

export class JamAlbumObject extends JamLibraryObject {
	type = JamObjectType.album;
	childrenTypes = [JamObjectType.track];

	constructor(public album: Jam.Album, library: LibraryService) {
		super(album, library);
		this.year = album.seriesNr ? `Episode ${album.seriesNr}` : `${album.tag.year || ''}`;
		this.parent = album.artist;
		this.mediaType = album.albumType;
	}

	navigTo(): void {
		this.library.navig.toAlbum(this.album);
	}

	play(): void {
		this.library.player.startAlbum(this.album);
	}

	navigToParent(): void {
		this.library.navig.toArtistID(this.album.artistID, this.album.artist);
	}

	toggleFav(): void {
		this.library.actions.toggleAlbumFav(this.album);
	}

	onContextMenu($event: MouseEvent, hideGoto?: boolean): void {
		this.library.contextMenuService.open<ContextMenuObjComponentOptions>(ContextMenuObjComponent, this, $event, {hideGoto});
	}

	loadChildren(): void {
		if (!this.tracks) {
			const id = this.base.id;
			this.library.jam.album.tracks({ids: [id], trackTag: true, trackState: true})
				.then(data => {
					this.tracks = data.items;
				})
				.catch(e => {
					this.library.notify.error(e);
				});
		}
	}

	groupType(): string {
		return this.album.albumType;
	}

	addToPlaylist(): void {
		this.library.playlistDialogsService.addAlbum(this.album);
	}

	addToQueue(): void {
		this.library.player.addAlbum(this.album);
	}

	getInfos(): Array<HeaderInfo> {
		return [
			{
				label: 'Artist', value: this.album.artist, click: () => {
					this.navigToParent();
				}
			},
			{label: 'Year', value: this.album.tag.year},
			{label: 'Played', value: this.album.state.played || 0}
		].filter(info => info.value !== undefined);
	}

}

export class JamFolderObject extends JamLibraryObject {
	type = JamObjectType.folder;
	childrenTypes = [JamObjectType.track, JamObjectType.folder];

	constructor(public folder: Jam.Folder, library: LibraryService) {
		super(folder, library);
		switch (folder.type) {
			case FolderType.artist:
				this.name = folder.tag.artist;
				break;
			case FolderType.album:
			case FolderType.multialbum:
				this.name = folder.tag.album;
				this.parent = folder.tag.artist;
				this.year = folder.tag.year ? `${folder.tag.year}` : undefined;
				break;
			default:
				this.name = folder.name;
				break;
		}
	}

	navigTo(): void {
		this.library.navig.toFolder(this.folder);
	}

	play(): void {
		this.library.player.startFolder(this.folder);
	}

	navigToParent(): void {
		this.library.navig.toFolderID(this.folder.parentID, '');
	}

	toggleFav(): void {
		this.library.actions.toggleFolderFav(this.folder);
	}

	onContextMenu($event: MouseEvent, hideGoto?: boolean): void {
		this.library.contextMenuService.open<ContextMenuObjComponentOptions>(ContextMenuObjComponent, this, $event, {hideGoto});
	}

	loadChildren(): void {
		if (!this.tracks) {
			const id = this.base.id;
			this.library.jam.folder.tracks({ids: [id], trackTag: true, trackState: true})
				.then(data => {
					this.tracks = data.items;
				})
				.catch(e => {
					this.library.notify.error(e);
				});
		}
	}

	groupType(): string {
		return this.folder.type;
	}

	addToPlaylist(): void {
		this.library.playlistDialogsService.addFolder(this.folder);
	}

	addToQueue(): void {
		this.library.player.addFolder(this.folder);
	}

	getInfos(): Array<HeaderInfo> {
		return [
			...(FolderTypesAlbum.includes(this.folder.type as FolderType) ?
					[
						{label: 'Artist', value: this.folder.tag.artist},
						{label: 'Year', value: this.folder.tag.year}
					] : []
			),
			{label: 'Played', value: this.folder.state.played || 0}
		].filter(info => info.value !== undefined);
	}

}

export class JamArtistObject extends JamLibraryObject {
	type = JamObjectType.artist;
	childrenTypes = [JamObjectType.album, JamObjectType.series];

	constructor(public artist: Jam.Artist, library: LibraryService) {
		super(artist, library);
		this.name = this.artist.name;
	}

	navigTo(): void {
		this.library.navig.toArtist(this.artist);
	}

	play(): void {
		this.library.player.startArtist(this.artist);
	}

	navigToParent(): void {
		//
	}

	toggleFav(): void {
		this.library.actions.toggleArtistFav(this.artist);
	}

	onContextMenu($event: MouseEvent, hideGoto?: boolean): void {
		this.library.contextMenuService.open<ContextMenuObjComponentOptions>(ContextMenuObjComponent, this, $event, {hideGoto});
	}

	loadChildren(): void {
		if (!this.albums) {
			const id = this.base.id;
			this.library.jam.artist.albums({ids: [id], albumTag: true, albumState: true})
				.then(data => {
					this.albums = data.items;
				})
				.catch(e => {
					this.library.notify.error(e);
				});
		}
	}

	groupType(): string {
		return this.artist.albumTypes.join('/');
	}

	addToPlaylist(): void {
		this.library.playlistDialogsService.addArtist(this.artist);
	}

	addToQueue(): void {
		this.library.player.addArtist(this.artist);
	}

	getInfos(): Array<HeaderInfo> {
		return [
			{label: 'Albums', value: this.artist.albumCount},
			{label: 'Tracks', value: this.artist.trackCount},
			{label: 'Played', value: this.artist.state.played || 0}
		].filter(info => info.value !== undefined);
	}
}

export class JamPlaylistObject extends JamLibraryObject {
	type = JamObjectType.playlist;
	childrenTypes = [JamObjectType.track];

	constructor(public playlist: Jam.Playlist, library: LibraryService) {
		super(playlist, library);
		this.name = this.playlist.name;
	}

	navigTo(): void {
		this.library.navig.toPlaylist(this.playlist);
	}

	play(): void {
		this.library.player.startPlaylist(this.playlist);
	}

	navigToParent(): void {
		//
	}

	toggleFav(): void {
		this.library.actions.togglePlaylistFav(this.playlist);
	}

	onContextMenu($event: MouseEvent, hideGoto?: boolean): void {
		let extras = [];
		if (this.library.jam.auth.user && this.playlist && this.playlist.userID === this.library.jam.auth.user.id) {
			extras = [
				{
					text: 'Edit Playlist', icon: 'icon-edit', click: () => {
						this.library.playlistDialogsService.editPlaylist(this.playlist);
					}
				},
				{
					text: 'Remove Playlist', icon: 'icon-remove', click: () => {
						this.library.playlistDialogsService.removePlaylist(this.playlist);
					}
				}
			];
		}
		this.library.contextMenuService.open<ContextMenuObjComponentOptions>(ContextMenuObjComponent, this, $event, {extras, hideGoto});
	}

	loadChildren(): void {
		if (!this.tracks) {
			const id = this.base.id;
			this.library.jam.playlist.tracks({ids: [id], trackTag: true, trackState: true})
				.then(data => {
					this.tracks = data.items;
				})
				.catch(e => {
					this.library.notify.error(e);
				});
		}
	}

	groupType(): string {
		return this.playlist.isPublic ? 'Public' : 'Private';
	}

	addToPlaylist(): void {
		this.library.playlistDialogsService.addPlaylist(this.playlist);
	}

	addToQueue(): void {
		this.library.player.addPlaylist(this.playlist);
	}

	getInfos(): Array<HeaderInfo> {
		return [];
	}
}

export class JamTrackObject extends JamLibraryObject {
	type = JamObjectType.track;
	childrenTypes = [];

	constructor(public track: Jam.Track, library: LibraryService) {
		super(track, library);
		this.name = this.track.tag.title || this.track.name;
	}

	navigTo(): void {
		this.library.navig.toTrack(this.track);
	}

	play(): void {
		this.library.player.startTrack(this.track);
	}

	navigToParent(): void {
		//
	}

	toggleFav(): void {
		this.library.actions.toggleTrackFav(this.track);
	}

	onContextMenu($event: MouseEvent, hideGoto?: boolean): void {
		this.library.contextMenuService.open<ContextMenuObjComponentOptions>(ContextMenuObjComponent, this, $event, {hideGoto});
	}

	loadChildren(): void {
		if (!this.tracks) {
			const id = this.base.id;
			this.library.jam.playlist.tracks({ids: [id], trackTag: true, trackState: true})
				.then(data => {
					this.tracks = data.items;
				})
				.catch(e => {
					this.library.notify.error(e);
				});
		}
	}

	groupType(): string {
		return this.track.tag.genre || '';
	}

	addToPlaylist(): void {
		this.library.playlistDialogsService.addTrack(this.track);
	}

	addToQueue(): void {
		this.library.player.addTrack(this.track);
	}

	getInfos(): Array<HeaderInfo> {
		return [
			{
				label: 'Artist', value: this.track.tag.artist, click: () => {
					this.library.navig.toArtistID(this.track.artistID, this.track.tag.artist);
				}
			},
			{
				label: 'Album', value: this.track.tag.album, click: () => {
					this.library.navig.toAlbumID(this.track.albumID, this.track.tag.album);
				}
			},
			{label: 'Played', value: this.track.state.played || 0}
		].filter(info => info.value !== undefined);
	}
}

export class JamSeriesObject extends JamLibraryObject {
	type = JamObjectType.series;
	childrenTypes = [JamObjectType.album];

	constructor(public series: Jam.Series, library: LibraryService) {
		super(series, library);
		this.name = this.series.name;
		this.parent = this.series.artist;
	}

	navigTo(): void {
		this.library.navig.toSeries(this.series);
	}

	play(): void {
		this.library.player.startSeries(this.series);
	}

	navigToParent(): void {
		this.library.navig.toArtistID(this.series.artistID, this.series.artist);
	}

	toggleFav(): void {
		this.library.actions.toggleSeriesFav(this.series);
	}

	onContextMenu($event: MouseEvent, hideGoto?: boolean): void {
		this.library.contextMenuService.open<ContextMenuObjComponentOptions>(ContextMenuObjComponent, this, $event, {hideGoto});
	}

	loadChildren(): void {
		if (!this.albums) {
			const id = this.base.id;
			this.library.jam.series.albums({ids: [id], albumTag: true, albumState: true})
				.then(data => {
					this.albums = data.items;
				})
				.catch(e => {
					this.library.notify.error(e);
				});
		}
	}

	groupType(): string {
		return this.series.albumTypes.join('/');
	}

	addToPlaylist(): void {
		this.library.playlistDialogsService.addSeries(this.series);
	}

	addToQueue(): void {
		this.library.player.addSeries(this.series);
	}

	getInfos(): Array<HeaderInfo> {
		return [
			{label: 'Albums', value: this.series.albumCount},
			{label: 'Tracks', value: this.series.trackCount},
			{label: 'Played', value: this.series.state.played || 0}
		].filter(info => info.value !== undefined);
	}
}

export class JamPodcastObject extends JamLibraryObject {
	type = JamObjectType.podcast;
	childrenTypes = [JamObjectType.episode];

	constructor(public podcast: Jam.Podcast, library: LibraryService) {
		super(podcast, library);
		this.name = this.podcast.name;
	}

	navigTo(): void {
		this.library.navig.toPodcast(this.podcast);
	}

	play(): void {
		this.library.player.startPodcast(this.podcast);
	}

	navigToParent(): void {
		//
	}

	toggleFav(): void {
		this.library.actions.togglePodcastFav(this.podcast);
	}

	onContextMenu($event: MouseEvent, hideGoto?: boolean): void {
		const extras =
			(this.library.jam.auth && this.library.jam.auth.user && this.library.jam.auth.user.roles && this.library.jam.auth.user.roles.podcast) ?
				[
					{
						text: 'Refresh Podcast Feed', icon: 'icon-rescan', click: () => {
							this.library.podcastService.checkPodcast(this.podcast);
						}
					},
					{
						text: 'Remove Podcast', icon: 'icon-remove', click: () => {
							this.library.podcastService.removePodcast(this.podcast);
						}
					}
				] :
				[];
		this.library.contextMenuService.open<ContextMenuObjComponentOptions>(ContextMenuObjComponent, this, $event, {extras, hideGoto});
	}

	loadChildren(): void {
		if (!this.episodes) {
			const id = this.base.id;
			this.library.jam.episode.search({podcastID: id, trackTag: true, trackState: true, amount: 10})
				.then(data => {
					this.episodes = data.items;
				})
				.catch(e => {
					this.library.notify.error(e);
				});
		}
	}

	groupType(): string {
		return '';
	}

	addToPlaylist(): void {
		this.library.playlistDialogsService.addPodcast(this.podcast);
	}

	addToQueue(): void {
		this.library.player.addPodcast(this.podcast);
	}

	getInfos(): Array<HeaderInfo> {
		return [];
	}
}

export class JamEpisodeObject extends JamLibraryObject {
	type = JamObjectType.episode;
	childrenTypes = [];

	constructor(public episode: Jam.PodcastEpisode, library: LibraryService) {
		super(episode, library);
		this.name = this.episode.name;
		this.parent = this.episode.podcast;
	}

	navigTo(): void {
		this.library.navig.toPodcastEpisode(this.episode);
	}

	play(): void {
		this.library.player.startEpisode(this.episode);
	}

	navigToParent(): void {
		this.library.navig.toPodcastID(this.episode.podcastID, this.episode.podcast);
	}

	toggleFav(): void {
		this.library.actions.toggleEpisodeFav(this.episode);
	}

	onContextMenu($event: MouseEvent, hideGoto?: boolean): void {
		this.library.contextMenuService.open<ContextMenuObjComponentOptions>(ContextMenuObjComponent, this, $event, {hideGoto});
	}

	loadChildren(): void {
		//
	}

	groupType(): string {
		return this.episode.status;
	}

	addToPlaylist(): void {
		this.library.playlistDialogsService.addEpisode(this.episode);
	}

	addToQueue(): void {
		this.library.player.addEpisode(this.episode);
	}

	getInfos(): Array<HeaderInfo> {
		return [
			{
				label: 'Podcast', value: this.episode.podcast, click: () => {
					this.navigToParent();
				}
			},
			{label: 'Played', value: this.episode.state.played || 0}
		].filter(info => info.value !== undefined);
	}
}

export abstract class JamObjsLoader {
	typeName: string;

	constructor(protected library: LibraryService) {

	}

	abstract search(query: { query: string, albumType?: AlbumType }, offset?: number, amount?: number): Promise<{ list: Jam.ListResult, items: Array<JamLibraryObject> }>;

	abstract list(listQuery: { listType: JamParameters.ListType, albumType?: AlbumType }, offset?: number, amount?: number): Promise<{ list: Jam.ListResult, items: Array<JamLibraryObject> }>;

	abstract all(offset?: number, amount?: number): Promise<{ list: Jam.ListResult, items: Array<JamLibraryObject> }>;
}

export class AlbumsLoader extends JamObjsLoader {
	typeName = 'Albums';

	async search(query: { query: string, albumType?: AlbumType }, offset?: number, amount?: number): Promise<{ list: Jam.ListResult, items: Array<JamLibraryObject> }> {
		const list = await this.library.jam.album.search({query: query.query, offset, amount, albumTag: true, albumState: true});
		return {list, items: list.items.map(o => new JamAlbumObject(o, this.library))};
	}

	async all(offset?: number, amount?: number): Promise<{ list: Jam.ListResult, items: Array<JamLibraryObject> }> {
		const list = await this.library.jam.album.search({offset, amount, albumTag: true, albumState: true});
		return {list, items: list.items.map(o => new JamAlbumObject(o, this.library))};
	}

	async list(listQuery: { listType: JamParameters.ListType, albumType?: AlbumType }, offset?: number, amount?: number): Promise<{ list: Jam.ListResult, items: Array<JamLibraryObject> }> {
		const artistID = listQuery.albumType === AlbumType.compilation ? MUSICBRAINZ_VARIOUS_ARTISTS_ID : undefined;
		const list = await this.library.jam.album.list({
			list: listQuery.listType, offset, amount,
			albumState: true,
			albumTag: true,
			albumType: listQuery.albumType,
			mbArtistID: artistID
		});
		return {list, items: list.items.map(o => new JamAlbumObject(o, this.library))};
	}
}

export class ArtistsLoader extends JamObjsLoader {
	typeName = 'Artists';

	async search(query: { query: string, albumType?: AlbumType }, offset?: number, amount?: number): Promise<{ list: Jam.ListResult, items: Array<JamLibraryObject> }> {
		const list = await this.library.jam.artist.search({query: query.query, offset, amount, artistState: true});
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

	async search(query: { query: string, albumType?: AlbumType }, offset?: number, amount?: number): Promise<{ list: Jam.ListResult, items: Array<JamLibraryObject> }> {
		const list = await this.library.jam.folder.search({query: query.query, offset, amount, folderTag: true, folderState: true});
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

	async search(query: { query: string, albumType?: AlbumType }, offset?: number, amount?: number): Promise<{ list: Jam.ListResult, items: Array<JamLibraryObject> }> {
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

	async search(query: { query: string, albumType?: AlbumType }, offset?: number, amount?: number): Promise<{ list: Jam.ListResult, items: Array<JamLibraryObject> }> {
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

	async search(query: { query: string, albumType?: AlbumType }, offset?: number, amount?: number): Promise<{ list: Jam.ListResult, items: Array<JamLibraryObject> }> {
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
