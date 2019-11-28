import {ID3v2Frames, Jam, JamService, MUSICBRAINZ_VARIOUS_ARTISTS_NAME} from '@jam';
import {Genres} from './genres.consts';
import {FrameCOMMSubIdsDefs, FrameDef, FrameDefs, FrameTXXXSubIdsDefs, FrameType, FrameUFIDSubIdsDefs} from './id3v2-frames.helper';
import {
	DefaultFrameColumns,
	FilenameColumnID,
	RawTagEditCell,
	RawTagEditColumn,
	RawTagEditColumnAction,
	RawTagEditFrame,
	RawTagEditRow
} from './tag-editor.types';
import {formatFilenameByTag, getPartOfSetID, getTackNrFromFile, rebuildTag} from './tag-editor.utils';

export class TagEditor {
	columns: Array<RawTagEditColumn> = [];
	edits: Array<RawTagEditRow> = [];

	constructor(private jam: JamService) {
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
		const text = value ? value : '';
		let frames = [];
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
			folderCounts[id] = (folderCounts[id] ? folderCounts[id] : 0) + 1;
		}
		for (const edit of this.edits) {
			const trackNr = getTackNrFromFile(edit.track.name);
			if (trackNr) {
				const id = getPartOfSetID(edit);
				const text = `${trackNr}/${folderCounts[id].toString()}`;
				this.updateEditTextCell(edit, column, text);
			}
		}
	}

	setColumnText(column: RawTagEditColumn, text: string): void {
		for (const edit of this.edits) {
			this.updateEditTextCell(edit, column, text);
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
			folderCounts[id] = (folderCounts[id] ? folderCounts[id] : 0) + 1;
		}
		for (const edit of this.edits) {
			const id = getPartOfSetID(edit);
			folderAdds[id] = (folderAdds[id] ? folderAdds[id] : 0) + 1;
			const text = `${folderAdds[id].toString()}/${folderCounts[id].toString()}`;
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
			folderCounts[edit.track.parentID] = (folderCounts[edit.track.parentID] ? folderCounts[edit.track.parentID] : 0) + 1;
		}
		const index = this.columns.indexOf(column);
		this.edits.forEach((edit, i) => {
			const cell = edit.cells[index];
			let trackNr: string;
			if (cell.frames.length > 0) {
				trackNr = cell.frames[0].value.text.split('/')[0];
				if (!isNaN(Number(trackNr))) {
					trackNr = Number(trackNr).toString();
				}
			} else {
				trackNr = getTackNrFromFile(edit.track.name);
			}
			if (!trackNr) {
				trackNr = (i + 1).toString();
			}
			const text = `${(trackNr || '')}/${folderCounts[edit.track.parentID].toString()}`;
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

	async findMissingLyrics(col: RawTagEditColumn): Promise<void> {
		const lyricsColIndex = this.columns.findIndex(c => c.def.id === 'USLT');
		const artistColIndex = this.columns.findIndex(c => c.def.id === 'TPE1');
		const titleColIndex = this.columns.findIndex(c => c.def.id === 'TIT2');
		for (const edit of this.edits) {
			const lyrics = this.getCellText(edit.cells[lyricsColIndex]);
			if (!lyrics) {
				const artist = this.getCellText(edit.cells[artistColIndex]);
				const title = this.getCellText(edit.cells[titleColIndex]);
				if (title && artist) {
					const res = await this.jam.metadata.lyricsovh_search({title, artist});
					if (res && res.lyrics) {
						this.updateEditTextCell(edit, col, res.lyrics);
					}
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

	setAudiobookFrames(): void {
		const genreCol = this.columns.find(c => c.def.id === 'TCON');
		const albumTypeCol = this.columns.find(c => c.def.id === 'TXXX' && c.def.subid === 'MusicBrainz Album Type');
		for (const edit of this.edits) {
			if (genreCol) {
				this.updateEditTextCell(edit, genreCol, 'Audiobook');
			}
			if (albumTypeCol) {
				this.updateEditTextCell(edit, albumTypeCol, 'album/audiobook');
			}
		}
	}

	setAudioSeriesFrames(): void {
		const genreCol = this.columns.find(c => c.def.id === 'TCON');
		const albumTypeCol = this.columns.find(c => c.def.id === 'TXXX' && c.def.subid === 'MusicBrainz Album Type');
		for (const edit of this.edits) {
			if (genreCol) {
				this.updateEditTextCell(edit, genreCol, 'Audio Series');
			}
			if (albumTypeCol) {
				this.updateEditTextCell(edit, albumTypeCol, 'album/audiodrama');
			}
		}
	}

	setSoundtrackFrames(): void {
		const genreCol = this.columns.find(c => c.def.id === 'TCON');
		const albumTypeCol = this.columns.find(c => c.def.id === 'TXXX' && c.def.subid === 'MusicBrainz Album Type');
		for (const edit of this.edits) {
			if (genreCol) {
				this.updateEditTextCell(edit, genreCol, 'Soundtrack');
			}
			if (albumTypeCol) {
				this.updateEditTextCell(edit, albumTypeCol, 'album/soundtrack');
			}
		}
	}

	setBootlegFrames(): void {
		const albumStatusCol = this.columns.find(c => c.def.id === 'TXXX' && c.def.subid === 'MusicBrainz Album Status');
		const albumTypeCol = this.columns.find(c => c.def.id === 'TXXX' && c.def.subid === 'MusicBrainz Album Type');
		for (const edit of this.edits) {
			if (albumStatusCol) {
				this.updateEditTextCell(edit, albumStatusCol, 'bootleg');
			}
			if (albumTypeCol) {
				this.updateEditTextCell(edit, albumTypeCol, 'album/live');
			}
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
		if (track.tagRaw && track.tagRaw.version < 4) {
			let frames: Array<ID3v2Frames.Frame> = TagEditor.getRawTagFrames(track.tagRaw);
			const newTag: Jam.RawTag = {
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

	upgradeDateFramesTov24Date(frames: Array<ID3v2Frames.Frame>): { newFrame: ID3v2Frames.Frame, dateFrames: Array<ID3v2Frames.Frame> } | undefined {
		const year = frames.find(f => ['TYER', 'TYE'].indexOf(f.id) >= 0);
		const date = frames.find(f => ['TDAT', 'TDA'].indexOf(f.id) >= 0);
		const time = frames.find(f => ['TIME', 'TIM'].indexOf(f.id) >= 0);
		if (!year && !date && !time) {
			return;
		}
		const dateFrames: Array<ID3v2Frames.Frame> = [];
		const result: Array<string> = [];
		if (year && year.value && year.value.hasOwnProperty('text')) {
			dateFrames.push(year);
			result.push((year as ID3v2Frames.Text).value.text);
		}
		if (date && date.value && date.value.hasOwnProperty('text')) {
			dateFrames.push(date);
			result.push((date as ID3v2Frames.Text).value.text);
		}
		if (time && time.value && time.value.hasOwnProperty('text')) {
			dateFrames.push(time);
			result.push((time as ID3v2Frames.Text).value.text);
		}
		return {
			newFrame: {
				id: 'TDRC',
				// title: 'Recording time',
				value: {text: result.join('-')}
			},
			dateFrames
		};
	}

	updateColumns(tracks: Array<Jam.Track>, cols: Array<{ frameDef: FrameDef, id: string; subid?: string }>): void {
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

	private static getRawTagFrames(rawTag: Jam.RawTag): Array<ID3v2Frames.Frame> {
		let frames: Array<ID3v2Frames.Frame> = [];
		Object.keys(rawTag.frames).forEach(key => {
			frames = frames.concat(rawTag.frames[key]);
		});
		return frames;
	}

	private static getFrameDefName(id: string, subid: string | undefined, framedef: FrameDef): string {
		let name = framedef.title;
		if (framedef.impl === FrameType.IdText) {
			if (id === 'TXXX' && FrameTXXXSubIdsDefs[subid]) {
				name = FrameTXXXSubIdsDefs[subid];
			} else if (id === 'UFID' && FrameUFIDSubIdsDefs[subid]) {
				name = FrameUFIDSubIdsDefs[subid];
			} else if (subid) {
				name += ` (${subid})`;
			}
		} else if (framedef.impl === FrameType.LangDescText) {
			if (id === 'COMM' && FrameCOMMSubIdsDefs[subid]) {
				name = FrameCOMMSubIdsDefs[subid];
			} else if (subid) {
				name += ` (${subid})`;
			}
		} else if (framedef.impl === FrameType.IdBin && subid) {
			name += ` (${subid})`;
		}
		return name;
	}

	private static matchColumn(frame: { id: string, value?: { id?: string } }, column: { id: string; subid?: string }): boolean {
		if (column.subid) {
			if (!frame.value || !frame.value.id || frame.value.id !== column.subid) {
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
			if (c !== cell && c.frames.length > 0 && c.frames[0].value && c.frames[0].value.text) {
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
					click: () => {
						this.setColumnTrackNrByIndex(col);
					}
				});
				result.push({
					icon: 'icon-down-thin',
					title: 'Set Track Nr by Filename',
					click: () => {
						this.setColumnTrackNrFromFile(col);
					}
				});
				result.push({
					icon: 'icon-down-thin',
					title: 'Set Total Tracks',
					click: () => {
						this.setColumnTotalTrack(col);
					}
				});
			} else if (id === 'TPOS') {
				result.push({
					icon: 'icon-down-thin',
					title: 'Try find Part of Set',
					click: () => {
						this.setColumnPartOfSet(col);
					}
				});
			} else if (id === 'TIT2') {
				result.push({
					icon: 'icon-down-thin',
					title: 'Add Index Nr to Title',
					click: () => {
						this.addIndexToTitleCol(col);
					}
				});
			} else if (id === 'TPE2') {
				result.push({
					icon: 'icon-down-thin',
					title: 'Copy from Artist Column',
					click: () => {
						this.setAlbumArtistFrames(col);
					}
				});
			} else if (id === 'TALB') {
				result.push({
					icon: 'icon-down-thin',
					title: 'Copy from Title Column',
					click: () => {
						this.setColumnFromTitleFrames(col);
					}
				});
			} else if (id === 'TDOR') {
				result.push({
					icon: 'icon-down-thin',
					title: 'Copy from Year Column',
					click: () => {
						this.setReleaseDateFromYearFrames(col);
					}
				});
			} else if (id === 'USLT') {
				result.push({
					icon: 'icon-down-thin',
					title: 'Search for missing Lyrics',
					click: () => {
						this.findMissingLyrics(col);
					}
				});
			}
		}
		if (impl !== FrameType.Filename) {
			result.push({
				icon: 'icon-remove',
				title: 'Clear all Cells in this Column',
				click: () => {
					this.clearColumn(col);
				}
			});
		} else if (impl === FrameType.Filename) {
			result.push({
				icon: 'icon-down-thin',
				title: 'Set Filenames by Meta Data',
				click: () => {
					this.setColumnFilenames(col);
				}
			});
		}
		col.actions = result;
	}

	private frameDef2Column(id: string, subid: string | undefined, framedef: FrameDef, sort: number): RawTagEditColumn {
		const name = TagEditor.getFrameDefName(id, subid, framedef);
		let impl = framedef.impl;
		if (id === 'UFID' && FrameUFIDSubIdsDefs[subid]) {
			impl = FrameType.IdText;
		}
		const col: RawTagEditColumn = {
			def: {id, subid, name, width: sort >= 0 ? DefaultFrameColumns[sort].width : 100, impl},
			sort: sort >= 0 ? sort + 1 : -1,
			actions: []
		};
		this.setColumnActions(col, id, subid, impl);
		col.getAutoCompleteList = cell => this.getAutoCompleteList(col, cell);
		return col;
	}

	private frame2Column(frame: RawTagEditFrame, sort: number): RawTagEditColumn {
		const col: RawTagEditColumn = {
			def: {
				id: frame.id,
				name: frame.id + (frame.value && frame.value.id ? ' - ' + (frame.value.id as string) : ''),
				subid: frame.value && frame.value.id ? frame.value.id : undefined,
				width: sort >= 0 ? DefaultFrameColumns[sort].width : 100,
				impl: FrameType.Unknown
			},
			sort,
			actions: []
		};
		col.getAutoCompleteList = (cell?: RawTagEditCell) => this.getAutoCompleteList(col, cell);
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
			if (!track.tagRaw || !track.tagRaw.frames) {
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
		const fillColumns = (track: Jam.Track, tag: Jam.RawTag, frames: Array<RawTagEditFrame>, parent: RawTagEditRow, oldRow: RawTagEditRow) =>
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
					frames = frames.concat(track.tagRaw.frames[key]);
				});
			}
			const oldEdit = oldEdits.find(e => e.track === track);
			const edit = {
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
