import {AgoPipe} from './ago.pipe';
import {DurationPipe} from './duration.pipe';
import {FilesizePipe} from './filesize.pipe';
import {JsonPipe} from './json.pipe';
import {LimitPipe} from './limit.pipe';
import {MbArtistCreditsPipe} from './mb-artist-credits.pipe';
import {MediadurationPipe} from './mediaduration.pipe';
import {StringTogglePipe} from './string-toggle/string-toggle.pipe';

export const pipes: Array<any> = [
	AgoPipe,
	DurationPipe,
	FilesizePipe,
	JsonPipe,
	LimitPipe,
	MbArtistCreditsPipe,
	MediadurationPipe,
	StringTogglePipe
];

export * from './ago.pipe';
export * from './duration.pipe';
export * from './filesize.pipe';
export * from './json.pipe';
export * from './limit.pipe';
export * from './mb-artist-credits.pipe';
export * from './mediaduration.pipe';
export * from './string-toggle/string-toggle.pipe';
