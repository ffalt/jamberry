import {FuzzySet} from './fuzzy';

export function splitFilename(s: string): Array<string> {
	return s.split(/[.,\/ -]/)
		.map(p => p.trim())
		.filter(p => p.length > 0);
}

export function stripExtension(s: string): string {
	return s.replace(/\.[^/.]+$/, '');
}

export function extractFileExtension(filename: string): string {
	return filename.substring(filename.lastIndexOf('.') + 1, filename.length) || filename;
}

export function hasFileExtension(filename: string, exts: Array<string>): boolean {
	return exts.includes(extractFileExtension(filename));
}

export function replaceFileSystemChars(s: string, replace: string): string {
	return s.toString()
		.replace(/:/g, ' - ')
		.replace(/[?\/!\\]/g, replace);
}

export function replaceFolderSystemChars(s: string, replace: string): string {
	return s.toString()
		.replace(/:/g, ' -')
		.replace(/[.*?\/!\\]/g, replace);
}

export function findTrackNr(filename: string): number {
	if (!filename) {
		return 0;
	}
	const s = stripExtension(filename);
	const parts = s.split(/[ \-_.:;?!~,`"&|()<>{}\[\]\r\n/\\]+/)
		.map(Number)
		.filter(p => !isNaN(p));
	if (parts.length > 0) {
		return parts[0];
	}
	return 0;
}

export function fuzzyMatch(title1: string, title2: string): number {
	const a = new FuzzySet();
	a.add(title1);
	const result = a.get(title2);
	if (!result) {
		return 0;
	}
	return result[0][0];
}
