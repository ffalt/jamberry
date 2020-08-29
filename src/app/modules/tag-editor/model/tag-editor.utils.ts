import {ID3v2Frames, Jam} from '@jam';
import {FilenameColumnID, RawTagEditRow} from './tag-editor.types';
import {extractFileExtension, replaceFileSystemChars, splitFilename} from './utils';

export function rebuildTag(edit: RawTagEditRow): Jam.MediaTagRaw {
	const frames: ID3v2Frames.Frames = {};
	for (const cell of edit.cells) {
		if (cell.column.def.id !== FilenameColumnID) {
			for (const frame of cell.frames) {
				const list = frames[cell.column.def.id] || [];
				list.push(frame);
				frames[cell.column.def.id] = list;
			}
		}
	}
	return {version: 4, frames};
}

export function getTackNrFromFile(filename: string): string | undefined {
	let parts = splitFilename(filename);
	parts = parts.filter(p =>
		(!isNaN(Number(p))));
	if (parts.length > 0) {
		return parts[0];
	}
	return;
}

export function getPartOfSetID(edit: RawTagEditRow): string {
	const partOfSet = edit.cells.find(f => f.column.def.id === 'TPOS');
	return `${edit.track.parentID}|${partOfSet && partOfSet.frames.length > 0 ? partOfSet.frames[0].value.text : ''}`;
}

export function formatFilenameByTag(track: Jam.Track, tag: Jam.MediaTagRaw): string {
	const result: Array<string> = [];
	let start = '';
	if (tag.frames.TPOS && tag.frames.TPOS.length > 0) {
		const frame = tag.frames.TPOS[0];
		let diskNr = (frame.value.text || '').split('/')[0];
		const totalDiskNr = (frame.value.text || '').split('/')[1] || '99';
		if (Number(totalDiskNr) > 1) {
			while (diskNr.length < totalDiskNr.length) {
				diskNr = `0${diskNr}`;
			}
			start += `${diskNr}-`;
		}
	}
	if (tag.frames.TRCK && tag.frames.TRCK.length > 0) {
		const frame = tag.frames.TRCK[0];
		let trackNr = (frame.value.text || '').split('/')[0];
		const totalTrackNr = (frame.value.text || '').split('/')[1] || '99';
		while (trackNr.length < totalTrackNr.length) {
			trackNr = `0${trackNr}`;
		}
		start += trackNr;
	}
	result.push(start);
	if (tag.frames.TIT2 && tag.frames.TIT2.length > 0) {
		const frame = tag.frames.TIT2[0];
		result.push(frame.value.text);
	}
	if (tag.frames.TPE1 && tag.frames.TPE1.length > 0) {
		const frame = tag.frames.TPE1[0];
		result.push(frame.value.text);
	}
	const ext = `.${extractFileExtension(track.name)}`;
	return `${replaceFileSystemChars(result.join(' - '), '')}${ext}`;
}
