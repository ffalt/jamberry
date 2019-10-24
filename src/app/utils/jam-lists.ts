import {AlbumType, JamParameters} from '@jam';

export interface JamList {
	id: JamParameters.ListType;
	text: string;
	link: string;
}

export const JamLists: Array<JamList> = [
	{id: 'faved', link: 'favorites', text: 'Favorites'},
	{id: 'highest', link: 'top-rated', text: 'Top Rated'},
	{id: 'frequent', link: 'most-played', text: 'Most Played'},
	{id: 'recent', link: 'recently-played', text: 'Recently Played'},
	{id: 'random', link: 'random', text: 'Random'}
];

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
	{id: AlbumType.series, link: 'series-episodes', text: 'Audio Series', icon: 'icon-series'},
	{id: AlbumType.live, link: 'live', text: 'Live Albums', icon: 'icon-live'},
	{id: AlbumType.bootleg, link: 'bootlegs', text: 'Bootlegs', icon: 'icon-bootleg'},
	{id: AlbumType.ep, link: 'eps', text: 'EPs', icon: 'icon-ep'},
	{id: AlbumType.single, link: 'singles', text: 'Singles', icon: 'icon-single'}
];

export const AlbumTypeUrlNamesKeys: { [key: string]: AlbumType } = {
	albums: AlbumType.album,
	compilations: AlbumType.compilation,
	soundtracks: AlbumType.soundtrack,
	audiobooks: AlbumType.audiobook,
	series: AlbumType.series,
	bootlegs: AlbumType.bootleg,
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
