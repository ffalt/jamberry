import {MUSICBRAINZ_VARIOUS_ARTISTS_ID, MUSICBRAINZ_VARIOUS_ARTISTS_NAME} from '@app/utils/jam-lists';
import type {ID3v2Frames, Jam, JamService} from '@jam';
import {Genres} from './genres.consts';
import {FrameCOMMSubIdsDefs, type FrameDef, FrameDefs, FrameTXXXSubIdsDefs, FrameType, FrameUFIDSubIdsDefs} from './id3v2-frames.helper';
import {
	DefaultFrameColumns,
	FilenameColumnID,
	type RawTagEditCell,
	type RawTagEditColumn,
	type RawTagEditColumnAction,
	type RawTagEditFrame,
	type RawTagEditRow
} from './tag-editor.types';
import {formatFilenameByTag, getPartOfSetID, getTackNrFromFile, rebuildTag} from './tag-editor.utils';

export class TagEditor {
	columns: Array<RawTagEditColumn> = [];
	edits: Array<RawTagEditRow> = [];

	constructor(private readonly jam: JamService) {
	}

	removeColumnText(column: RawTagEditColumn, text: string): void {
		const index = this.columns.indexOf(column);
		for (const edit of this.edits) {
			const cell = edit.cells[index];
			const t = cell.frames.length > 0 ? cell.frames[0].value.text : undefined;
			if (t) {
				this.updateEditTextCell(edit, column, t.replace(text, ''));
			}
		}
	}

	updateEditTextCell(edit: RawTagEditRow, column: RawTagEditColumn, value?: string): void {
		const index = this.columns.indexOf(column);
		const cell = edit.cells[index];
		const text = value ?? '';
		let frames: Array<RawTagEditFrame> = [];
		if (text.length > 0) {
			frames = [{
				id: cell.column.def.id,
				value: (FrameType.LangDescText === column.def.impl) ? {
					id: '',
					language: '',
					text
				} : {id: cell.column.def.subid, text}
			}];
		}
		if (cell.frames.length === 0 || cell.frames[0].value.text !== text) {
			edit.cells[index] = {
				parent: edit,
				track: cell.track,
				column,
				frames,
				changed: true
			};
			edit.changed = true;
		}
	}

	setColumnTrackNrFromFile(column: RawTagEditColumn): void {
		const folderCounts: { [id: string]: number | undefined } = {};
		for (const edit of this.edits) {
			const id = getPartOfSetID(edit);
			folderCounts[id] = (folderCounts[id] ?? 0) + 1;
		}
		for (const edit of this.edits) {
			const trackNr = getTackNrFromFile(edit.track.name);
			if (trackNr) {
				const id = getPartOfSetID(edit);
				const text = `${trackNr}/${(folderCounts[id] ?? 0).toString()}`;
				this.updateEditTextCell(edit, column, text);
			}
		}
	}

	setColumnFilenames(column: RawTagEditColumn): void {
		const index = this.columns.indexOf(column);
		for (const edit of this.edits) {
			const cell = edit.cells[index];
			const filename = formatFilenameByTag(cell.track, rebuildTag(edit));
			this.updateEditTextCell(edit, column, filename);
		}
	}

	setColumnTrackNrByIndex(column: RawTagEditColumn): void {
		const folderCounts: { [id: string]: number | undefined } = {};
		const folderAdds: { [id: string]: number | undefined } = {};
		for (const edit of this.edits) {
			const id = getPartOfSetID(edit);
			folderCounts[id] = (folderCounts[id] ?? 0) + 1;
		}
		for (const edit of this.edits) {
			const id = getPartOfSetID(edit);
			folderAdds[id] = (folderAdds[id] ?? 0) + 1;
			const text = `${(folderAdds[id] ?? 0).toString()}/${(folderCounts[id] ?? 0).toString()}`;
			this.updateEditTextCell(edit, column, text);
		}
	}

	addIndexToTitleCol(column: RawTagEditColumn): void {
		const index = this.columns.indexOf(column);
		this.edits.forEach((edit, i) => {
			const cell = edit.cells[index];
			let text = (cell.frames.length > 0) ? cell.frames[0].value.text : '';
			text = (`${text} ${(i + 1).toString()}`).trim();
			this.updateEditTextCell(edit, column, text);
		});
	}

	setColumnPartOfSet(column: RawTagEditColumn): void {
		const index = this.columns.indexOf(column);
		const folderIDs: Array<string> = [];
		for (const edit of this.edits) {
			if (!folderIDs.includes(edit.track.parentID)) {
				folderIDs.push(edit.track.parentID);
			}
		}
		for (const edit of this.edits) {
			const cell = edit.cells[index];
			const text = `${(folderIDs.indexOf(cell.track.parentID) + 1).toString()}/${folderIDs.length.toString()}`;
			this.updateEditTextCell(edit, column, text);
		}
	}

	setColumnTotalTrack(column: RawTagEditColumn): void {
		const folderCounts: { [id: string]: number | undefined } = {};
		for (const edit of this.edits) {
			folderCounts[edit.track.parentID] = (folderCounts[edit.track.parentID] ?? 0) + 1;
		}
		const index = this.columns.indexOf(column);
		this.edits.forEach((edit, i) => {
			const cell = edit.cells[index];
			let trackNr: string | undefined;
			if (cell.frames.length > 0) {
				trackNr = cell.frames[0].value.text.split('/')[0];
				if (!Number.isNaN(Number(trackNr))) {
					trackNr = Number(trackNr).toString();
				}
			} else {
				trackNr = getTackNrFromFile(edit.track.name);
			}
			if (!trackNr) {
				trackNr = (i + 1).toString();
			}
			const text = `${(trackNr ?? '')}/${(folderCounts[edit.track.parentID] ?? 0).toString()}`;
			this.updateEditTextCell(edit, column, text);
		});
	}

	setAlbumArtistFrames(column: RawTagEditColumn): void {
		const artistColIndex = this.columns.findIndex(c => c.def.id === 'TPE1');
		if (artistColIndex >= 0) {
			for (const edit of this.edits) {
				const cell = edit.cells[artistColIndex];
				const text = cell.frames.length > 0 ? cell.frames[0].value.text : undefined;
				if (text) {
					this.updateEditTextCell(edit, column, text);
				}
			}
		}
	}

	setReleaseDateFromYearFrames(column: RawTagEditColumn): void {
		this.copyColumn(this.columns.findIndex(c => c.def.id === 'TYER'), column);
	}

	getCellText(cell: RawTagEditCell): string | undefined {
		return cell.frames.length > 0 ? cell.frames[0].value.text : undefined;
	}

	insertFromColumn(sourceColIndex: number, pos: number, column: RawTagEditColumn): void {
		const index = this.columns.indexOf(column);
		if (sourceColIndex >= 0) {
			for (const edit of this.edits) {
				const sourceText = this.getCellText(edit.cells[sourceColIndex]);
				const destText = this.getCellText(edit.cells[index]) ?? '';
				if (sourceText) {
					const text = destText.slice(0, pos) + sourceText + destText.slice(pos);
					this.updateEditTextCell(edit, column, text);
				}
			}
		}
	}

	copyColumn(sourceColIndex: number, column: RawTagEditColumn): void {
		if (sourceColIndex >= 0) {
			for (const edit of this.edits) {
				const cell = edit.cells[sourceColIndex];
				const text = cell.frames.length > 0 ? cell.frames[0].value.text : undefined;
				if (text) {
					this.updateEditTextCell(edit, column, text);
				}
			}
		}
	}

	appendFromColumn(sourceColIndex: number, column: RawTagEditColumn): void {
		const index = this.columns.indexOf(column);
		if (sourceColIndex >= 0) {
			for (const edit of this.edits) {
				const text = this.getCellText(edit.cells[sourceColIndex]);
				if (text) {
					const dest = this.getCellText(edit.cells[index]) ?? '';
					this.updateEditTextCell(edit, column, dest + text);
				}
			}
		}
	}

	setColumnText(column: RawTagEditColumn, text: string): void {
		for (const edit of this.edits) {
			this.updateEditTextCell(edit, column, text);
		}
	}

	appendColumnText(column: RawTagEditColumn, multiStr: string): void {
		const index = this.columns.indexOf(column);
		for (const edit of this.edits) {
			const text = this.getCellText(edit.cells[index]) ?? '';
			this.updateEditTextCell(edit, column, text + multiStr);
		}
	}

	setColumnFromTitleFrames(column: RawTagEditColumn): void {
		this.copyColumn(this.columns.findIndex(c => c.def.id === 'TIT2'), column);
	}

	clearColumn(column: RawTagEditColumn): void {
		const index = this.columns.indexOf(column);
		for (const edit of this.edits) {
			const cell = edit.cells[index];
			if (cell.frames.length > 0) {
				edit.cells[index] = {
					parent: edit,
					track: edit.cells[index].track,
					column: edit.cells[index].column,
					frames: [],
					changed: true
				};
				edit.changed = true;
			}
		}
	}

	async findMissingLyrics(tracks: Array<Jam.Track> = []): Promise<void> {
		const lyricsCol = this.findOrAddColumn(tracks, {frameDef: FrameDefs.USLT, id: 'USLT'});
		const artistCol = this.findOrAddColumn(tracks, {frameDef: FrameDefs.TPE1, id: 'TPE1'});
		const titleCol = this.findOrAddColumn(tracks, {frameDef: FrameDefs.TIT2, id: 'TIT2'});
		const lyricsColIndex = this.columns.indexOf(lyricsCol);
		const artistColIndex = this.columns.indexOf(artistCol);
		const titleColIndex = this.columns.indexOf(titleCol);
		for (const edit of this.edits) {
			const lyrics = this.getCellText(edit.cells[lyricsColIndex]);
			if (!lyrics) {
				const artist = this.getCellText(edit.cells[artistColIndex]);
				const title = this.getCellText(edit.cells[titleColIndex]);
				if (title && artist) {
					const res = await this.jam.metadata.lyricsovhSearch({title, artist});
					if (res?.data?.lyrics) {
						this.updateEditTextCell(edit, lyricsCol, res.data.lyrics);
					}
				}
			}
		}
	}

	setAudiobookFrames(tracks: Array<Jam.Track> = []): void {
		const genreCol = this.findOrAddColumn(tracks, {frameDef: FrameDefs.TCON, id: 'TCON'});
		const albumTypeCol = this.findOrAddColumn(tracks, {frameDef: FrameDefs.TXXX, id: 'TXXX', subid: 'MusicBrainz Album Type'});
		for (const edit of this.edits) {
			this.updateEditTextCell(edit, genreCol, 'Audiobook');
			this.updateEditTextCell(edit, albumTypeCol, 'album/audiobook');
		}
	}

	setAudioSeriesFrames(tracks: Array<Jam.Track> = []): void {
		const genreCol = this.findOrAddColumn(tracks, {frameDef: FrameDefs.TCON, id: 'TCON'});
		const albumTypeCol = this.findOrAddColumn(tracks, {frameDef: FrameDefs.TXXX, id: 'TXXX', subid: 'MusicBrainz Album Type'});
		for (const edit of this.edits) {
			this.updateEditTextCell(edit, genreCol, 'Audio Series');
			this.updateEditTextCell(edit, albumTypeCol, 'album/audiodrama');
		}
	}

	setSoundtrackFrames(tracks: Array<Jam.Track> = []): void {
		const genreCol = this.findOrAddColumn(tracks, {frameDef: FrameDefs.TCON, id: 'TCON'});
		const albumTypeCol = this.findOrAddColumn(tracks, {frameDef: FrameDefs.TXXX, id: 'TXXX', subid: 'MusicBrainz Album Type'});
		for (const edit of this.edits) {
			this.updateEditTextCell(edit, genreCol, 'Soundtrack');
			this.updateEditTextCell(edit, albumTypeCol, 'album/soundtrack');
		}
	}

	setVariousArtistFrames(tracks: Array<Jam.Track> = []): void {
		const albumTypeCol = this.findOrAddColumn(tracks, {frameDef: FrameDefs.TXXX, id: 'TXXX', subid: 'MusicBrainz Album Type'});
		const mbArtistIdCol = this.findOrAddColumn(tracks, {frameDef: FrameDefs.TXXX, id: 'TXXX', subid: 'MusicBrainz Album Artist Id'});
		const albumArtistCol = this.findOrAddColumn(tracks, {frameDef: FrameDefs.TPE2, id: 'TPE2'});
		for (const edit of this.edits) {
			this.updateEditTextCell(edit, albumTypeCol, 'album/compilation');
			this.updateEditTextCell(edit, albumArtistCol, MUSICBRAINZ_VARIOUS_ARTISTS_NAME);
			this.updateEditTextCell(edit, mbArtistIdCol, MUSICBRAINZ_VARIOUS_ARTISTS_ID);
		}
	}

	setBootlegFrames(tracks: Array<Jam.Track> = []): void {
		const albumStatusCol = this.findOrAddColumn(tracks, {frameDef: FrameDefs.TXXX, id: 'TXXX', subid: 'MusicBrainz Album Status'});
		const albumTypeCol = this.findOrAddColumn(tracks, {frameDef: FrameDefs.TXXX, id: 'TXXX', subid: 'MusicBrainz Album Type'});
		for (const edit of this.edits) {
			this.updateEditTextCell(edit, albumStatusCol, 'bootleg');
			this.updateEditTextCell(edit, albumTypeCol, 'album/live');
		}
	}

	build(tracks: Array<Jam.Track>): void {
		this.edits = [];
		this.upgradeTrackTags(tracks);
		this.buildColumns(tracks);
		this.buildEdits(tracks);
	}

	upgradeTrackTags(tracks: Array<Jam.Track>): void {
		for (const track of tracks) {
			this.upgradeTrackTag(track);
		}
	}

	upgradeTrackTag(track: Jam.Track): void {
		const raw = track.tagRaw;
		if (raw?.version === undefined) {
			return;
		}
		if (raw.version < 4) {
			let frames: Array<ID3v2Frames.Frame> = TagEditor.getRawTagFrames(raw);
			const newTag: Jam.MediaTagRaw = {
				version: 4,
				frames: {}
			};
			const dates = this.upgradeDateFramesTov24Date(frames);
			if (dates) {
				frames = frames.filter(frame => !dates.dateFrames.includes(frame));
				frames.push(dates.newFrame);
			}
			for (const frame of frames) {
				const id = this.ensureID3v2FrameVersionDef(frame.id, 4);
				if (!id) {
					console.error('upgradeTrackTag', 'missing id3v2 update', frame.id, '=>', id);
				} else {
					frame.id = id;
					newTag.frames[id] = newTag.frames[id] || [];
					newTag.frames[id].push(frame);
				}
			}
			track.tagRaw = newTag;
		}
	}

	ensureID3v2FrameVersionDef(id: string, dest: number): string | undefined {
		const def = FrameDefs[id];
		if (!def) {
			// TODO: matcher
			return;
		}
		if (def.versions.indexOf(dest) >= 0) {
			return id;
		}
		if (def.versions[0] > dest) {
			const downgradeKey = Object.keys(FrameDefs).find(key =>
				FrameDefs[key].upgrade === id);
			if (!downgradeKey) {
				console.error(`ensureID3v2FrameVersionDef: Missing v2.${def.versions} -> v2.${dest} mapping ${id}`);
				return;
			}
			const f2 = FrameDefs[downgradeKey];
			if (f2.versions.indexOf(dest) < 0) {
				if (f2.versions[0] > dest) {
					return this.ensureID3v2FrameVersionDef(downgradeKey, dest);
				}
				return;
			}
			return downgradeKey;
		}
		if (!def.upgrade) {
			console.error(`ensureID3v2FrameVersionDef: Missing v2.${def.versions} -> v2.${dest} mapping ${id}`);
			return;
		}
		const upgradeKey = def.upgrade;
		const f = FrameDefs[upgradeKey];
		if (f.versions.indexOf(dest) < 0) {
			if (f.versions[0] < dest) {
				return this.ensureID3v2FrameVersionDef(upgradeKey, dest);
			}
			return;
		}
		return upgradeKey;
	}

	upgradeDateFramesTov24Date(frames: Array<ID3v2Frames.Frame>): {
		newFrame: ID3v2Frames.Frame;
		dateFrames: Array<ID3v2Frames.Frame>
	} | undefined {
		const year = frames.find(f => ['TYER', 'TYE'].indexOf(f.id) >= 0);
		const date = frames.find(f => ['TDAT', 'TDA'].indexOf(f.id) >= 0);
		const time = frames.find(f => ['TIME', 'TIM'].indexOf(f.id) >= 0);
		if (!year && !date && !time) {
			return;
		}
		const dateFrames: Array<ID3v2Frames.Frame> = [];
		const result: Array<string> = [];
		if (year?.value && Object.hasOwn(year.value, 'text')) {
			dateFrames.push(year);
			result.push((year as ID3v2Frames.Text).value.text);
		}
		if (date?.value && Object.hasOwn(date.value, 'text')) {
			dateFrames.push(date);
			result.push((date as ID3v2Frames.Text).value.text);
		}
		if (time?.value && Object.hasOwn(time.value, 'text')) {
			dateFrames.push(time);
			result.push((time as ID3v2Frames.Text).value.text);
		}
		return {
			newFrame: {
				id: 'TDRC',
				value: {text: result.join('-')}
			},
			dateFrames
		};
	}

	findOrAddColumn(tracks: Array<Jam.Track>, col: { frameDef: FrameDef; id: string; subid?: string }): RawTagEditColumn {
		const exists = this.columns.find(c => c.def.id === col.id && c.def.subid === col.subid);
		if (exists) {
			return exists;
		}
		const newCol = this.frameDef2Column(col.id, col.subid, col.frameDef, DefaultFrameColumns.findIndex(c => TagEditor.matchColumn({
			id: col.id,
			value: col.subid ? {id: col.subid} : undefined
		}, c)));
		this.columns.push(newCol);
		this.buildEdits(tracks);
		return newCol;
	}

	updateColumns(tracks: Array<Jam.Track>, cols: Array<{ frameDef: FrameDef; id: string; subid?: string }>): void {
		const removeCols: Array<RawTagEditColumn> = [];
		const addCols: Array<RawTagEditColumn> = [];
		for (const col of this.columns) {
			const enabled = cols.find(c => c.id === col.def.id && c.subid === col.def.subid);
			if (!enabled) {
				removeCols.push(col);
			}
		}
		for (const col of cols) {
			const exists = this.columns.find(c => c.def.id === col.id && c.def.subid === col.subid);
			if (!exists) {
				const newCol = this.frameDef2Column(col.id, col.subid, col.frameDef, 0);
				addCols.push(newCol);
			}
		}
		this.columns = this.columns.filter(c => !removeCols.includes(c)).concat(addCols);
		this.buildEdits(tracks);
	}

	private static getRawTagFrames(rawTag: Jam.MediaTagRaw): Array<ID3v2Frames.Frame> {
		let frames: Array<ID3v2Frames.Frame> = [];
		for (const key of Object.keys(rawTag.frames)) {
			frames = frames.concat(rawTag.frames[key]);
		}
		return frames;
	}

	private static getFrameDefName(id: string, subid: string | undefined, framedef: FrameDef): string {
		let name = framedef.title;
		const subKey = subid ?? '';
		if (framedef.impl === FrameType.IdText) {
			if (id === 'TXXX' && FrameTXXXSubIdsDefs[subKey]) {
				name = FrameTXXXSubIdsDefs[subKey];
			} else if (id === 'UFID' && FrameUFIDSubIdsDefs[subKey]) {
				name = FrameUFIDSubIdsDefs[subKey];
			} else if (subid) {
				name += ` (${subid})`;
			}
		} else if (framedef.impl === FrameType.LangDescText) {
			if (id === 'COMM' && FrameCOMMSubIdsDefs[subKey]) {
				name = FrameCOMMSubIdsDefs[subKey];
			} else if (subid) {
				name += ` (${subid})`;
			}
		} else if (framedef.impl === FrameType.IdBin && subid) {
			name += ` (${subid})`;
		}
		return name;
	}

	private static matchColumn(frame: { id: string; value?: { id?: string } }, column: { id: string; subid?: string }): boolean {
		if (column.subid) {
			if (!frame.value?.id || frame.value.id !== column.subid) {
				return false;
			}
		}
		return (frame.id === column.id);
	}

	private getAutoCompleteList(column: RawTagEditColumn, cell?: RawTagEditCell): Array<string> {
		if (column.def.id === 'TCON') {
			return Genres;
		}
		if (column.def.id === 'TXXX' && column.def.subid === 'MusicBrainz Album Type') {
			return [
				'album',
				'album/compilation',
				'album/soundtrack',
				'album/spokenword',
				'album/interview',
				'album/audiobook',
				'album/audiodrama',
				'album/live',
				'album/remix',
				'album/dj-mix',
				'album/mixtape/street',
				'single',
				'ep',
				'broadcast',
				'other',
				'other/spokenword',
				'other/audiodrama',
				'other/interview'
			];
		}
		if (column.def.id === 'TXXX' && column.def.subid === 'MusicBrainz Album Status') {
			return [
				'official',
				'promotional',
				'bootleg',
				'pseudo-release'
			];
		}
		if (column.def.id === 'TPOS') {
			return [
				'1/1',
				'1/2',
				'2/2',
				'1/3',
				'2/3',
				'3/3',
				'1/4',
				'2/4',
				'3/4',
				'4/4'
			];
		}
		const index = this.columns.indexOf(column);
		const list: Array<string> = [];
		for (const edit of this.edits) {
			const c = edit.cells[index];
			if (c !== cell && c.frames.length > 0 && c.frames[0].value?.text) {
				const txt = c.frames[0].value.text;
				if (!list.includes(txt)) {
					list.push(txt);
				}
			}
		}
		if (column.def.id === 'TPE2' && !list.includes(MUSICBRAINZ_VARIOUS_ARTISTS_NAME)) {
			list.push(MUSICBRAINZ_VARIOUS_ARTISTS_NAME);
		}
		return list;
	}

	private setColumnActions(col: RawTagEditColumn, id: string, subid: string | undefined, impl: FrameType): void {
		const result: Array<RawTagEditColumnAction> = [];
		if ([FrameType.IdText, FrameType.Text, FrameType.LangDescText].includes(impl)) {
			col.multi = true;
			if (id === 'TRCK') {
				result.push({
					icon: 'icon-down-thin',
					title: 'Set Track Nr by Index',
					click: (): void => {
						this.setColumnTrackNrByIndex(col);
					}
				});
				result.push({
					icon: 'icon-down-thin',
					title: 'Set Track Nr by Filename',
					click: (): void => {
						this.setColumnTrackNrFromFile(col);
					}
				});
				result.push({
					icon: 'icon-down-thin',
					title: 'Set Total Tracks',
					click: (): void => {
						this.setColumnTotalTrack(col);
					}
				});
			} else if (id === 'TPOS') {
				result.push({
					icon: 'icon-down-thin',
					title: 'Try find Part of Set',
					click: (): void => {
						this.setColumnPartOfSet(col);
					}
				});
			} else if (id === 'TIT2') {
				result.push({
					icon: 'icon-down-thin',
					title: 'Add Index Nr to Title',
					click: (): void => {
						this.addIndexToTitleCol(col);
					}
				});
			} else if (id === 'TPE2') {
				result.push({
					icon: 'icon-down-thin',
					title: 'Copy from Artist Column',
					click: (): void => {
						this.setAlbumArtistFrames(col);
					}
				});
			} else if (id === 'TALB') {
				result.push({
					icon: 'icon-down-thin',
					title: 'Copy from Title Column',
					click: (): void => {
						this.setColumnFromTitleFrames(col);
					}
				});
			} else if (id === 'TDOR') {
				result.push({
					icon: 'icon-down-thin',
					title: 'Copy from Year Column',
					click: (): void => {
						this.setReleaseDateFromYearFrames(col);
					}
				});
			} else if (id === 'USLT') {
				result.push({
					icon: 'icon-down-thin',
					title: 'Search for missing Lyrics',
					click: (): void => {
						this.findMissingLyrics()
							.catch(e => {
								console.error(e);
							});
					}
				});
			}
		}
		if (impl !== FrameType.Filename) {
			result.push({
				icon: 'icon-remove',
				title: 'Clear all Cells in this Column',
				click: (): void => {
					this.clearColumn(col);
				}
			});
		} else if (impl === FrameType.Filename) {
			result.push({
				icon: 'icon-down-thin',
				title: 'Set Filenames by Meta Data',
				click: (): void => {
					this.setColumnFilenames(col);
				}
			});
		}
		col.actions = result;
	}

	private frameDef2Column(id: string, subid: string | undefined, framedef: FrameDef, sort: number): RawTagEditColumn {
		const name = TagEditor.getFrameDefName(id, subid, framedef);
		let impl = framedef.impl;
		if (id === 'UFID' && FrameUFIDSubIdsDefs[subid || '']) {
			impl = FrameType.IdText;
		}
		const col: RawTagEditColumn = {
			def: {id, subid, name, width: sort >= 0 ? DefaultFrameColumns[sort].width : 100, impl},
			sort: sort >= 0 ? sort + 1 : -1,
			actions: []
		};
		this.setColumnActions(col, id, subid, impl);
		col.getAutoCompleteList = (cell): Array<string> => this.getAutoCompleteList(col, cell);
		return col;
	}

	private frame2Column(frame: RawTagEditFrame, sort: number): RawTagEditColumn {
		const col: RawTagEditColumn = {
			def: {
				id: frame.id,
				name: frame.id + (frame.value?.id ? ` - ${frame.value.id as string}` : ''),
				subid: frame.value?.id,
				width: sort >= 0 ? DefaultFrameColumns[sort].width : 100,
				impl: FrameType.Unknown
			},
			sort,
			actions: []
		};
		col.getAutoCompleteList = (cell?: RawTagEditCell): Array<string> => this.getAutoCompleteList(col, cell);
		return col;
	}

	private buildColumns(tracks: Array<Jam.Track>): void {
		this.columns = [];
		if (!tracks || tracks.length === 0) {
			return;
		}

		DefaultFrameColumns.forEach((c, sort) => {
			if (c.force) {
				const col = this.frameDef2Column(c.id, c.subid, FrameDefs[c.id], sort);
				this.columns.push(col);
			}
		});
		tracks.forEach(track => {
			if (!track.tagRaw?.frames) {
				return;
			}
			const frames: Array<RawTagEditFrame> = TagEditor.getRawTagFrames(track.tagRaw);
			frames.unshift({id: FilenameColumnID, value: {text: track.name}});
			for (const frame of frames) {
				const column = this.columns.find(c => TagEditor.matchColumn(frame, c.def));
				if (!column) {
					const framedef = FrameDefs[frame.id];
					const sort = DefaultFrameColumns.findIndex(c => TagEditor.matchColumn(frame, c));
					if (framedef) {
						let subid: string | undefined;
						if (frame.value && frame.value.id !== undefined) {
							subid = frame.value.id;
						}
						this.columns.push(this.frameDef2Column(frame.id, subid, FrameDefs[frame.id], sort));
					} else {
						this.columns.push(this.frame2Column(frame, sort));
					}
				}
			}
		});
	}

	private buildEdits(tracks: Array<Jam.Track>): void {
		this.columns.sort((a, b) => {
			if (a.sort < 0) {
				return 1;
			}
			if (b.sort < 0) {
				return -1;
			}
			return a.sort - b.sort;
		});
		const fillColumns = (
			track: Jam.Track,
			tag: Jam.MediaTagRaw | undefined,
			frames: Array<RawTagEditFrame>,
			parent: RawTagEditRow,
			oldRow: RawTagEditRow | undefined): Array<RawTagEditCell> =>
			this.columns.map(col => {
				const oldCell = oldRow ? oldRow.cells.find(c => c.column.def.id === col.def.id && c.column.def.subid === col.def.subid) : undefined;
				return {
					parent,
					track,
					tag,
					column: col,
					frames: oldCell ? oldCell.frames : frames.filter(f => TagEditor.matchColumn(f, col.def)),
					changed: oldCell ? oldCell.changed : false
				};
			});
		const oldEdits = this.edits || [];
		this.edits = tracks.map(track => {
			let frames: Array<RawTagEditFrame> = [];
			frames.push({id: FilenameColumnID, value: {text: track.name}});
			if (track.tagRaw) {
				Object.keys(track.tagRaw.frames).forEach(key => {
					frames = frames.concat(track.tagRaw?.frames[key] || []);
				});
			}
			const oldEdit = oldEdits.find(e => e.track === track);
			const edit: RawTagEditRow = {
				track,
				tag: track.tagRaw,
				cells: [],
				editing: false,
				changed: oldEdit ? oldEdit.changed : false,
				saving: false
			};
			edit.cells = fillColumns(track, track.tagRaw, frames, edit, oldEdit);
			return edit;
		});
	}
}
