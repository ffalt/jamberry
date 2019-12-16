import {AlbumType, JamObjectType, JamParameters} from '@jam';

export interface JamAlbumType {
	id: AlbumType;
	text: string;
	link: string;
	icon: string;
}

export const JamAlbumTypes: Array<JamAlbumType> = [
	{id: AlbumType.album, link: 'albums', text: 'Albums', icon: 'icon-album'},
	{id: AlbumType.compilation, link: 'compilations', text: 'Compilations', icon: 'icon-compilation'},
	{id: AlbumType.soundtrack, link: 'soundtracks', text: 'Soundtracks', icon: 'icon-soundtrack'},
	{id: AlbumType.audiobook, link: 'audiobooks', text: 'Audiobooks', icon: 'icon-audiobook'},
	{id: AlbumType.live, link: 'live', text: 'Live Albums', icon: 'icon-live'},
	{id: AlbumType.bootleg, link: 'bootlegs', text: 'Bootlegs', icon: 'icon-bootleg'},
	{id: AlbumType.ep, link: 'eps', text: 'EPs', icon: 'icon-ep'},
	{id: AlbumType.single, link: 'singles', text: 'Singles', icon: 'icon-single'}
];

export const JamTypesUrlNamesKeys: { [key: string]: JamObjectType } = {
	albums: JamObjectType.album,
	compilations: JamObjectType.album,
	soundtracks: JamObjectType.album,
	audiobooks: JamObjectType.album,
	bootlegs: JamObjectType.album,
	live: JamObjectType.album,
	eps: JamObjectType.album,
	singles: JamObjectType.album,
	series: JamObjectType.series,
	artists: JamObjectType.artist,
	folders: JamObjectType.folder,
	playlists: JamObjectType.playlist,
	podcasts: JamObjectType.podcast
};

export const AlbumTypeUrlNamesKeys: { [key: string]: AlbumType } = {
	albums: AlbumType.album,
	compilations: AlbumType.compilation,
	soundtracks: AlbumType.soundtrack,
	audiobooks: AlbumType.audiobook,
	bootlegs: AlbumType.bootleg,
	series: AlbumType.series,
	live: AlbumType.live,
	eps: AlbumType.ep,
	singles: AlbumType.single
};

export const ListTypeUrlNamesKeys: { [key: string]: JamParameters.ListType } = {
	random: 'random',
	favorites: 'faved',
	'top-rated': 'highest',
	'most-played': 'frequent',
	'recently-played': 'recent'
};
