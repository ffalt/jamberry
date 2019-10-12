import {AgoPipe} from './ago.pipe';
import {DurationPipe} from './duration.pipe';
import {FilesizePipe} from './filesize.pipe';
import {JsonPipe} from './json.pipe';
import {LimitPipe} from './limit.pipe';
import {MediadurationPipe} from './mediaduration.pipe';

export const pipes: Array<any> = [
	AgoPipe,
	DurationPipe,
	FilesizePipe,
	JsonPipe,
	LimitPipe,
	MediadurationPipe
];

export * from './ago.pipe';
export * from './duration.pipe';
export * from './filesize.pipe';
export * from './json.pipe';
export * from './limit.pipe';
export * from './mediaduration.pipe';