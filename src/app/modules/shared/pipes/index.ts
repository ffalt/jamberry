import {AgoPipe} from './ago.pipe';
import {ArtistOrSeriesPipe} from './artist-or-series/artist-or-series.pipe';
import {ArtistsOrSeriesPipe} from './artist-or-series/artists-or-series.pipe';
import {DurationPipe} from './duration.pipe';
import {FilesizePipe} from './filesize.pipe';
import {JsonPipe} from './json.pipe';
import {LimitPipe} from './limit.pipe';
import {MediadurationPipe} from './mediaduration.pipe';
import {StringTogglePipe} from './string-toggle/string-toggle.pipe';

export const pipes: Array<any> = [
	AgoPipe,
	ArtistOrSeriesPipe,
	ArtistsOrSeriesPipe,
	StringTogglePipe,
	DurationPipe,
	FilesizePipe,
	JsonPipe,
	LimitPipe,
	MediadurationPipe
];

export * from './string-toggle/string-toggle.pipe';
export * from './artist-or-series/artists-or-series.pipe';
export * from './artist-or-series/artist-or-series.pipe';
export * from './ago.pipe';
export * from './duration.pipe';
export * from './filesize.pipe';
export * from './json.pipe';
export * from './limit.pipe';
export * from './mediaduration.pipe';
