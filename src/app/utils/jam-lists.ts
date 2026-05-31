import type { Type } from '@angular/core';
import type { UrlSegment } from '@angular/router';
import { AlbumType, FolderType, JamObjectType, ListType } from '@jam';
import { IconAlbumComponent } from '@core/components/icons/icon-album.component';
import { IconArtistComponent } from '@core/components/icons/icon-artist.component';
import { IconAudiobookComponent } from '@core/components/icons/icon-audiobook.component';
import { IconBootlegComponent } from '@core/components/icons/icon-bootleg.component';
import { IconCompilationComponent } from '@core/components/icons/icon-compilation.component';
import { IconEpComponent } from '@core/components/icons/icon-ep.component';
import { IconFolderComponent } from '@core/components/icons/icon-folder.component';
import { IconGenreComponent } from '@core/components/icons/icon-genre.component';
import { IconLiveComponent } from '@core/components/icons/icon-live.component';
import { IconPlaylistComponent } from '@core/components/icons/icon-playlist.component';
import { IconPodcastComponent } from '@core/components/icons/icon-podcast.component';
import { IconPodcastsComponent } from '@core/components/icons/icon-podcasts.component';
import { IconSeriesComponent } from '@core/components/icons/icon-series.component';
import { IconSingleComponent } from '@core/components/icons/icon-single.component';
import { IconSoundtrackComponent } from '@core/components/icons/icon-soundtrack.component';
import { IconTrackComponent } from '@core/components/icons/icon-track.component';

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
	icon: Type<unknown>;
	category?: string;
	type: JamObjectType;
	albumType?: AlbumType;
}

export const JamUrlTypes: Array<JamType> = [
	{ id: JamUrlType.albums, text: 'Albums', icon: IconAlbumComponent, type: JamObjectType.album, albumType: AlbumType.album },
	{
		id: JamUrlType.compilations,
		text: 'Compilations',
		icon: IconCompilationComponent,
		type: JamObjectType.album,
		albumType: AlbumType.compilation
	},
	{ id: JamUrlType.soundtracks, text: 'Soundtracks', icon: IconSoundtrackComponent, type: JamObjectType.album, albumType: AlbumType.soundtrack },
	{ id: JamUrlType.audiobooks, text: 'Audiobooks', icon: IconAudiobookComponent, type: JamObjectType.album, albumType: AlbumType.audiobook },
	{ id: JamUrlType.live, text: 'Live Albums', icon: IconLiveComponent, type: JamObjectType.album, albumType: AlbumType.live },
	{ id: JamUrlType.bootlegs, text: 'Bootlegs', icon: IconBootlegComponent, type: JamObjectType.album, albumType: AlbumType.bootleg },
	{ id: JamUrlType.eps, text: 'EPs', icon: IconEpComponent, type: JamObjectType.album, albumType: AlbumType.ep },
	{ id: JamUrlType.singles, text: 'Singles', icon: IconSingleComponent, type: JamObjectType.album, albumType: AlbumType.single },
	{ id: JamUrlType.series, text: 'Series', category: 'Audiobook', icon: IconSeriesComponent, type: JamObjectType.series },
	{ id: JamUrlType.artists, text: 'Artists', icon: IconArtistComponent, type: JamObjectType.artist },
	{ id: JamUrlType.podcasts, text: 'Podcasts', icon: IconPodcastsComponent, type: JamObjectType.podcast },
	{ id: JamUrlType.playlists, text: 'Playlists', icon: IconPlaylistComponent, type: JamObjectType.playlist },
	{ id: JamUrlType.genres, text: 'Genres', icon: IconGenreComponent, type: JamObjectType.genre },
	{ id: JamUrlType.folders, text: 'Folders', icon: IconFolderComponent, type: JamObjectType.folder },
	{ id: JamUrlType.tracks, text: 'Tracks', icon: IconTrackComponent, type: JamObjectType.track },
	{ id: JamUrlType.episodes, text: 'Episodes', icon: IconPodcastComponent, type: JamObjectType.episode }
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
	'random': ListType.random,
	'favorites': ListType.faved,
	'top-rated': ListType.highest,
	'most-played': ListType.frequent,
	'recently-played': ListType.recent
};

export const FolderTypesAlbum = [FolderType.album, FolderType.multialbum];
