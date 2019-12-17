import {UrlSegment} from '@angular/router';
import {AlbumType, JamObjectType, JamParameters} from '@jam';

export interface JamAlbumType {
	id: AlbumType;
	text: string;
	link: string;
	icon: string;
}

export interface JamType {
	id: string;
	text: string;
	icon: string;
	category?: string;
	type: JamObjectType;
	albumType?: AlbumType;
}

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
	folders = 'folders',
	tracks = 'tracks',
	episodes = 'episodes'
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
	{id: JamUrlType.folders, text: 'Folders', icon: 'icon-folder', type: JamObjectType.folder},
	{id: JamUrlType.tracks, text: 'Tracks', icon: 'icon-track', type: JamObjectType.track},
	{id: JamUrlType.episodes, text: 'Episodes', icon: 'icon-episodes', type: JamObjectType.episode}
];

export function getTypeByAlbumType(albumType: string): JamType | undefined {
	return JamUrlTypes.find(part => part.albumType === albumType);
}
export function getUrlType(val: Array<UrlSegment>): JamType | undefined {
	const s = val.length > 0 ? val[0].path : undefined;
	return JamUrlTypes.find(part => part.id === s);
}
export function getUrlAlbumType(val: Array<UrlSegment>): AlbumType | undefined {
	const type = getUrlType(val);
	return type ? type.albumType : undefined;
}

export const ListTypeUrlNamesKeys: { [key: string]: JamParameters.ListType } = {
	random: 'random',
	favorites: 'faved',
	'top-rated': 'highest',
	'most-played': 'frequent',
	'recently-played': 'recent'
};
