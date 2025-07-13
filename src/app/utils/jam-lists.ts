import type {UrlSegment} from '@angular/router';
import {AlbumType, FolderType, JamObjectType, ListType} from '@jam';

export const MUSICBRAINZ_VARIOUS_ARTISTS_ID = '89ad4ac3-39f7-470e-963a-56509c546377';
export const MUSICBRAINZ_VARIOUS_ARTISTS_NAME = 'Various Artists';

export enum JamUrlType {
	albums = 'albums',
	compilations = 'compilations',
	series = 'series',
	artists = 'artists',
	podcasts = 'podcasts',
	soundtracks = 'soundtracks',
	audiobooks = 'audiobooks',
	live = 'live',
	bootlegs = 'bootlegs',
	eps = 'eps',
	singles = 'singles',
	playlists = 'playlists',
	genres = 'genres',
	folders = 'folders',
	tracks = 'tracks',
	episodes = 'episodes'
}

export interface JamType {
	id: JamUrlType;
	text: string;
	icon: string;
	category?: string;
	type: JamObjectType;
	albumType?: AlbumType;
}

export const JamUrlTypes: Array<JamType> = [
	{id: JamUrlType.albums, text: 'Albums', icon: 'icon-album', type: JamObjectType.album, albumType: AlbumType.album},
	{
		id: JamUrlType.compilations,
		text: 'Compilations',
		icon: 'icon-compilation',
		type: JamObjectType.album,
		albumType: AlbumType.compilation
	},
	{id: JamUrlType.soundtracks, text: 'Soundtracks', icon: 'icon-soundtrack', type: JamObjectType.album, albumType: AlbumType.soundtrack},
	{id: JamUrlType.audiobooks, text: 'Audiobooks', icon: 'icon-audiobook', type: JamObjectType.album, albumType: AlbumType.audiobook},
	{id: JamUrlType.live, text: 'Live Albums', icon: 'icon-live', type: JamObjectType.album, albumType: AlbumType.live},
	{id: JamUrlType.bootlegs, text: 'Bootlegs', icon: 'icon-bootleg', type: JamObjectType.album, albumType: AlbumType.bootleg},
	{id: JamUrlType.eps, text: 'EPs', icon: 'icon-ep', type: JamObjectType.album, albumType: AlbumType.ep},
	{id: JamUrlType.singles, text: 'Singles', icon: 'icon-single', type: JamObjectType.album, albumType: AlbumType.single},
	{id: JamUrlType.series, text: 'Series', category: 'Audiobook', icon: 'icon-series', type: JamObjectType.series},
	{id: JamUrlType.artists, text: 'Artists', icon: 'icon-artist', type: JamObjectType.artist},
	{id: JamUrlType.podcasts, text: 'Podcasts', icon: 'icon-podcasts', type: JamObjectType.podcast},
	{id: JamUrlType.playlists, text: 'Playlists', icon: 'icon-playlist', type: JamObjectType.playlist},
	{id: JamUrlType.genres, text: 'Genres', icon: 'icon-genre', type: JamObjectType.genre},
	{id: JamUrlType.folders, text: 'Folders', icon: 'icon-folder', type: JamObjectType.folder},
	{id: JamUrlType.tracks, text: 'Tracks', icon: 'icon-track', type: JamObjectType.track},
	{id: JamUrlType.episodes, text: 'Episodes', icon: 'icon-episodes', type: JamObjectType.episode}
];

export function getTypeByAlbumType(albumType: string): JamType | undefined {
	return JamUrlTypes.find(part => part.albumType === albumType && part.type === JamObjectType.album);
}

export function getUrlType(val: Array<UrlSegment>): JamType | undefined {
	const s = val.length > 0 ? val[0].path : undefined;
	return JamUrlTypes.find(part => part.id === s);
}

export function getUrlAlbumType(val: Array<UrlSegment>): AlbumType | undefined {
	const type = getUrlType(val);
	return type ? type.albumType : undefined;
}

export const ListTypeUrlNamesKeys: { [key: string]: ListType } = {
	random: ListType.random,
	favorites: ListType.faved,
	'top-rated': ListType.highest,
	'most-played': ListType.frequent,
	'recently-played': ListType.recent
};

export const FolderTypesAlbum = [FolderType.album, FolderType.multialbum];
