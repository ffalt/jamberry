/* eslint-disable max-classes-per-file */
import {FolderTypesAlbum} from '@app/utils/jam-lists';
import {AlbumType, FolderType, Jam, JamObjectType} from '@jam';
import {LibraryService} from '@library/services';
import {HeaderInfo} from '@shared/components';
import {JamObject} from '@shared/model/helpers';
import {
	ContextMenuObjComponent,
	ContextMenuObjComponentOptions,
	ContextMenuObjComponentOptionsExtra
} from '../components/context-menu-obj/context-menu-obj.component';

export abstract class JamLibraryObject extends JamObject {
	abstract type: JamObjectType;
	childrenTypes?: Array<JamObjectType | string>;
	media?: Array<Jam.MediaBase>;
	tracks?: Array<Jam.Track>;
	albums?: Array<Jam.Album>;
	episodes?: Array<Jam.Episode>;

	protected constructor(public base: Jam.Base, protected library: LibraryService) {
		super(base);
	}

	abstract addToPlaylist(): void;

	abstract addToQueue(): void;

	abstract loadChildren(): Promise<void>;

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
		this.year = album.seriesNr ? `Episode ${album.seriesNr}` : `${album.year || ''}`;
		this.parent = album.artistName;
		this.mediaType = album.albumType;
		this.genre = album.genres?.length ? album.genres.map(g => g.name).join(' / ') : undefined;
	}

	navigTo(): void {
		this.library.navig.toAlbum(this.album);
	}

	play(): void {
		this.library.player.startAlbum(this.album);
	}

	navigToParent(): void {
		this.library.navig.toArtistID(this.album.artistID, this.album.artistName);
	}

	async toggleFav(): Promise<void> {
		return this.library.actions.toggleAlbumFav(this.album);
	}

	onContextMenu($event: MouseEvent, hideGoto?: boolean): void {
		this.library.contextMenuService.open<ContextMenuObjComponentOptions>(ContextMenuObjComponent, this, $event, {hideGoto});
	}

	async loadChildren(): Promise<void> {
		if (!this.tracks) {
			try {
				this.tracks = (await this.library.jam.album.tracks({ids: [this.base.id], trackIncTag: true, trackIncState: true})).items;
			} catch (e) {
				this.tracks = [];
				this.library.notify.error(e);
			}
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
		if (this.album.albumType === AlbumType.series) {
			return [
				{
					label: 'Artist', value: this.album.artistName, click: (): void => {
						this.navigToParent();
					}
				},
				{
					label: 'Series', value: this.album.seriesID ? this.album.series : undefined, click: (): void => {
						this.library.navig.toSeriesID(this.album.seriesID || '', this.album.series || '');
					}
				},
				{label: 'Episode', value: this.album.seriesNr}
			].filter(info => info.value !== undefined) as Array<HeaderInfo>;
		}
		return [
			{
				label: 'Artist', value: this.album.artistName, click: (): void => {
					this.navigToParent();
				}
			},
			{label: 'Year', value: this.album.year},
			{label: 'Genre', value: this.genre}
			// {label: 'Played', value: this.album.state.played || 0}
		].filter(info => info.value !== undefined) as Array<HeaderInfo>;
	}

}

export class JamFolderObject extends JamLibraryObject {
	type = JamObjectType.folder;
	childrenTypes = [JamObjectType.track, JamObjectType.folder];

	constructor(public folder: Jam.Folder, library: LibraryService) {
		super(folder, library);
		this.name = folder.name;
		this.mediaType = folder.type;
		this.genre = folder?.tag?.genres?.length ? folder.tag.genres.join(' / ') : undefined;
		switch (folder.type) {
			case FolderType.artist:
				this.name = folder.tag?.artist || '[Unknown Artist]';
				break;
			case FolderType.album:
			case FolderType.multialbum:
				this.name = folder.tag?.album || '[Unknown Album]';
				this.parent = folder.tag?.artist;
				this.year = folder.tag?.year ? `${folder.tag.year}` : undefined;
				break;
			default:
		}
	}

	navigTo(): void {
		this.library.navig.toFolder(this.folder);
	}

	play(): void {
		this.library.player.startFolder(this.folder);
	}

	navigToParent(): void {
		if (this.folder.parentID) {
			this.library.navig.toFolderID(this.folder.parentID, '');
		}
	}

	async toggleFav(): Promise<void> {
		return this.library.actions.toggleFolderFav(this.folder);
	}

	onContextMenu($event: MouseEvent, hideGoto?: boolean): void {
		this.library.contextMenuService.open<ContextMenuObjComponentOptions>(ContextMenuObjComponent, this, $event, {hideGoto});
	}

	async loadChildren(): Promise<void> {
		if (!this.tracks) {
			try {
				this.tracks = (await this.library.jam.folder.tracks({ids: [this.base.id], trackIncTag: true, trackIncState: true})).items;
			} catch (e) {
				this.tracks = [];
				this.library.notify.error(e);
			}
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
		return (FolderTypesAlbum.includes(this.folder.type) ?
				[
					{label: 'Artist', value: this.folder.tag?.artist},
					{label: 'Year', value: this.folder.tag?.year},
					{label: 'Genre', value: this.genre}
				] : []
		)
			// {label: 'Played', value: this.folder.state.played || 0}
			.filter(info => info.value !== undefined) as Array<HeaderInfo>;
	}

}

export class JamArtistObject extends JamLibraryObject {
	type = JamObjectType.artist;
	mediaType = JamObjectType.artist;
	childrenTypes = [JamObjectType.album, JamObjectType.series];

	constructor(public artist: Jam.Artist, library: LibraryService) {
		super(artist, library);
		this.name = this.artist.name;
		this.genre = artist.genres?.length ? artist.genres.map(g => g.name).join(' / ') : undefined;
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

	async toggleFav(): Promise<void> {
		return this.library.actions.toggleArtistFav(this.artist);
	}

	onContextMenu($event: MouseEvent, hideGoto?: boolean): void {
		this.library.contextMenuService.open<ContextMenuObjComponentOptions>(ContextMenuObjComponent, this, $event, {hideGoto});
	}

	async loadChildren(): Promise<void> {
		if (!this.albums) {
			try {
				this.albums = (await this.library.jam.artist.albums({ids: [this.base.id], albumIncState: true})).items;
			} catch (e) {
				this.library.notify.error(e);
			}
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
			{label: 'Genre', value: this.genre}
			// {label: 'Played', value: this.artist.state.played || 0}
		].filter(info => info.value !== undefined) as Array<HeaderInfo>;
	}
}

export class JamPlaylistObject extends JamLibraryObject {
	type = JamObjectType.playlist;
	childrenTypes = ['media'];

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

	async toggleFav(): Promise<void> {
		return this.library.actions.togglePlaylistFav(this.playlist);
	}

	onContextMenu($event: MouseEvent, hideGoto?: boolean): void {
		let extras: Array<ContextMenuObjComponentOptionsExtra> = [];
		if (this.playlist?.userID === this.library.jam.auth?.user?.id) {
			extras = [
				{
					text: 'Edit Playlist', icon: 'icon-edit', click: (): void => {
						this.library.playlistDialogsService.editPlaylist(this.playlist);
					}
				},
				{
					text: 'Remove Playlist', icon: 'icon-remove', click: (): void => {
						this.library.playlistDialogsService.removePlaylist(this.playlist);
					}
				}
			];
		}
		this.library.contextMenuService.open<ContextMenuObjComponentOptions>(ContextMenuObjComponent, this, $event, {extras, hideGoto});
	}

	async loadChildren(): Promise<void> {
		if (!this.tracks) {
			try {
				this.media = (await this.library.jam.playlist.entries({
					ids: [this.base.id],
					trackIncTag: true,
					trackIncState: true,
					episodeIncTag: true,
					episodeIncState: true
				})).items;
			} catch (e) {
				this.library.notify.error(e);
			}
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
	mediaType = JamObjectType.track;
	childrenTypes = [];

	constructor(public track: Jam.Track, library: LibraryService) {
		super(track, library);
		this.name = track.tag?.title || track.name;
		this.genre = track.tag?.genres ? track.tag.genres.join(' / ') : undefined;
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

	async toggleFav(): Promise<void> {
		return this.library.actions.toggleMediaBaseFav(this.track);
	}

	onContextMenu($event: MouseEvent, hideGoto?: boolean): void {
		this.library.contextMenuService.open<ContextMenuObjComponentOptions>(ContextMenuObjComponent, this, $event, {hideGoto});
	}

	async loadChildren(): Promise<void> {
		if (!this.tracks) {
			try {
				this.media = (await this.library.jam.playlist.entries({
					ids: [this.base.id],
					trackIncTag: true,
					trackIncState: true,
					episodeIncState: true,
					episodeIncTag: true
				})).items;
			} catch (e) {
				this.library.notify.error(e);
			}
		}
	}

	groupType(): string {
		return this.track.tag?.genres ? this.track.tag.genres.join(' / ') : '';
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
				label: 'Artist', value: this.track.tag?.artist, click: (): void => {
					this.library.navig.toArtistID(this.track.artistID || '', this.track.tag?.artist || '');
				}
			},
			{
				label: 'Album', value: this.track.tag?.album, click: (): void => {
					this.library.navig.toAlbumID(this.track.albumID || '', this.track.tag?.album || '');
				}
			},
			{label: 'Genre', value: this.genre}
			// {label: 'Played', value: this.track.state.played || 0}
		].filter(info => info.value !== undefined) as Array<HeaderInfo>;
	}
}

export class JamGenreObject extends JamLibraryObject {
	type = JamObjectType.genre;
	childrenTypes = [];

	constructor(public genreObj: Jam.Genre, library: LibraryService) {
		super(genreObj, library);
	}

	navigTo(): void {
		this.library.navig.toGenre(this.genreObj);
	}

	play(): void {
		//
	}

	navigToParent(): void {
		//
	}

	async toggleFav(): Promise<void> {
		return this.library.actions.toggleGenreFav(this.genreObj);
	}

	onContextMenu($event: MouseEvent, hideGoto?: boolean): void {
		this.library.contextMenuService.open<ContextMenuObjComponentOptions>(ContextMenuObjComponent, this, $event, {hideGoto});
	}

	async loadChildren(): Promise<void> {
		//
	}

	groupType(): string {
		return '';
	}

	addToPlaylist(): void {
		//
	}

	addToQueue(): void {
		//
	}

	getInfos(): Array<HeaderInfo> {
		return [];
	}

}

export class JamSeriesObject extends JamLibraryObject {
	type = JamObjectType.series;
	mediaType = JamObjectType.series;
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

	async toggleFav(): Promise<void> {
		return this.library.actions.toggleSeriesFav(this.series);
	}

	onContextMenu($event: MouseEvent, hideGoto?: boolean): void {
		this.library.contextMenuService.open<ContextMenuObjComponentOptions>(ContextMenuObjComponent, this, $event, {hideGoto});
	}

	async loadChildren(): Promise<void> {
		if (!this.albums) {
			try {
				this.albums = (await this.library.jam.series.albums({ids: [this.base.id], albumIncState: true})).items;
			} catch (e) {
				this.library.notify.error(e);
			}
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
			{
				label: 'Artist', value: this.series.artist, click: (): void => {
					this.navigToParent();
				}
			},
			{label: 'Albums', value: this.series.albumCount},
			// {label: 'Tracks', value: this.series.trackCount},
			{label: 'Genre', value: this.genre}
			// {label: 'Played', value: this.series.state.played || 0}
		].filter(info => info.value !== undefined) as Array<HeaderInfo>;
	}
}

export class JamPodcastObject extends JamLibraryObject {
	type = JamObjectType.podcast;
	mediaType = JamObjectType.podcast;
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

	async toggleFav(): Promise<void> {
		return this.library.actions.togglePodcastFav(this.podcast);
	}

	onContextMenu($event: MouseEvent, hideGoto?: boolean): void {
		const extras =
			(this.library.jam.auth?.user?.roles.podcast) ?
				[
					{
						text: 'Refresh Podcast Feed', icon: 'icon-rescan', click: (): void => {
							this.library.podcastService.checkPodcast(this.podcast);
						}
					},
					{
						text: 'Remove Podcast', icon: 'icon-remove', click: (): void => {
							this.library.podcastService.removePodcast(this.podcast);
						}
					}
				] :
				[];
		this.library.contextMenuService.open<ContextMenuObjComponentOptions>(ContextMenuObjComponent, this, $event, {extras, hideGoto});
	}

	async loadChildren(): Promise<void> {
		if (!this.episodes) {
			try {
				this.episodes = (await this.library.jam.episode.search({
					podcastIDs: [this.base.id],
					episodeIncTag: true,
					episodeIncState: true,
					take: 10
				})).items;
			} catch (e) {
				this.library.notify.error(e);
			}
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
	mediaType = JamObjectType.episode;
	childrenTypes = [];

	constructor(public episode: Jam.Episode, library: LibraryService) {
		super(episode, library);
		this.name = this.episode.name;
		this.parent = this.episode.podcastName;
	}

	navigTo(): void {
		this.library.navig.toPodcastEpisode(this.episode);
	}

	play(): void {
		this.library.player.startEpisode(this.episode);
	}

	navigToParent(): void {
		this.library.navig.toPodcastID(this.episode.podcastID, this.episode.podcastName);
	}

	async toggleFav(): Promise<void> {
		return this.library.actions.toggleMediaBaseFav(this.episode);
	}

	onContextMenu($event: MouseEvent, hideGoto?: boolean): void {
		this.library.contextMenuService.open<ContextMenuObjComponentOptions>(ContextMenuObjComponent, this, $event, {hideGoto});
	}

	async loadChildren(): Promise<void> {
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
				label: 'Podcast', value: this.episode.podcastName, click: (): void => {
					this.navigToParent();
				}
			},
			{label: 'Played', value: this.episode.state?.played || 0}
		].filter(info => info.value !== undefined);
	}
}
