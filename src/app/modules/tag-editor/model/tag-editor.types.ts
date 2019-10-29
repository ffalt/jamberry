import {Jam} from '@jam';
import {FrameType} from './id3v2-frames.helper';

export interface RawTagEditCell {
	parent: RawTagEditRow;
	track: Jam.Track;
	column: RawTagEditColumn;
	frames: Array<RawTagEditFrame>;
	changed: boolean;
}

export interface RawTagEditColumnAction {
	icon: string;
	title: string;

	click(): void;
}

export interface RawTagEditColumn {
	def: RawTagEditColumnDef;
	sort: number;
	multi?: boolean;
	actions: Array<RawTagEditColumnAction>;

	getAutoCompleteList?(cell?: RawTagEditCell): Array<string>;
}

export interface RawTagEditRow {
	track: Jam.Track;
	tag: Jam.RawTag;
	cells: Array<RawTagEditCell>;
	editing: boolean;
	changed: boolean;
	saving: boolean;
}

export interface RawTagEditFrame {
	id: string;
	value: any;
}

export interface RawTagEditColumnDef {
	id: string;
	subid?: string;
	name: string;
	width: number;
	impl?: FrameType;
	force?: boolean;
}

export const FilenameColumnID = 'internal_file';

export const DefaultFrameColumns: Array<{ id: string, subid?: string; width: number, force?: boolean }> = [
	{id: FilenameColumnID, width: 200, force: true},
	{id: 'TRCK', width: 60, force: true},
	{id: 'TIT2', width: 200, force: true},
	{id: 'TALB', width: 200, force: true},
	{id: 'TPE1', width: 140, force: true},
	{id: 'TPE2', width: 140, force: true},
	{id: 'TOPE', width: 140},
	{id: 'TCON', width: 100, force: true},
	{id: 'TPOS', width: 60, force: true},
	{id: 'GRP1', width: 60, force: true},
	{id: 'TMOO', width: 100},
	{id: 'APIC', width: 100, force: true},
	{id: 'TSOP', width: 140},
	{id: 'TSO2', width: 140},
	{id: 'TXXX', subid: 'Artists', width: 140},
	{id: 'IPLS', width: 140},
	{id: 'TIPL', width: 140},
	{id: 'TMCL', width: 140},
	{id: 'TYER', width: 100},
	{id: 'TDOR', width: 100, force: true},
	{id: 'TDRC', width: 100, force: true},
	{id: 'TDRL', width: 80},
	{id: 'TDAT', width: 60},
	{id: 'TORY', width: 60},
	{id: 'TXXX', subid: 'originalyear', width: 60},
	{id: 'TXXX', subid: 'MusicBrainz Album Type', width: 100, force: true},
	{id: 'TXXX', subid: 'MusicBrainz Album Status', width: 60, force: true},
	{id: 'TXXX', subid: 'MusicBrainz Album Release Country', width: 60},
	{id: 'TXXX', subid: 'MusicBrainz Track Disambiguation', width: 100},
	{id: 'TXXX', subid: 'Release type', width: 100},
	{id: 'TXXX', subid: 'SCRIPT', width: 60},
	{id: 'TLAN', width: 60},
	{id: 'TMED', width: 40},
	{id: 'TLEN', width: 60},
	{id: 'TIME', width: 60},
	{id: 'TKEY', width: 60},
	{id: 'TBPM', width: 60},
	{id: 'USLT', width: 300},
	{id: 'APIC', width: 80},
	{id: 'TPUB', width: 140},
	{id: 'WPUB', width: 140},
	{id: 'WCOP', width: 140},
	{id: 'TCOP', width: 140},
	{id: 'TCOM', width: 140},
	{id: 'TSOC', width: 140},
	{id: 'MCDI', width: 40},
	{id: 'TXXX', subid: 'Acoustid Id', width: 40},
	{id: 'TXXX', subid: 'ASIN', width: 100},
	{id: 'UFID', subid: 'http://musicbrainz.org', width: 80},
	{id: 'TXXX', subid: 'MusicBrainz Release Track Id', width: 80},
	{id: 'TXXX', subid: 'MusicBrainz Album Id', width: 80},
	{id: 'TXXX', subid: 'MusicBrainz Album Artist Id', width: 80},
	{id: 'TXXX', subid: 'MusicBrainz Artist Id', width: 80},
	{id: 'TXXX', subid: 'MusicBrainz Release Group Id', width: 80},
	{id: 'TSSE', width: 80},
	{id: 'TFLT', width: 80},
	{id: 'TSST', width: 80},
	{id: 'TXXX', subid: 'Ripping tool', width: 80},
	{id: 'TXXX', subid: 'Ripping date', width: 80},
	{id: 'TDEN', width: 80},
	{id: 'TXXX', subid: 'Rip date', width: 80},
	{id: 'TXXX', subid: 'Source', width: 80},
	{id: 'TXXX', subid: 'Supplier', width: 80},
	{id: 'TENC', width: 80},
	{id: 'TXXX', subid: 'ASIN', width: 110},
	{id: 'TSRC', width: 110},
	{id: 'TXXX', subid: 'BARCODE', width: 110},
	{id: 'PRIV', subid: 'http://www.cdtag.com', width: 100},
	{id: 'TXXX', subid: 'CATALOGNUMBER', width: 110},
	{id: 'TCMP', width: 40},
	{id: 'COMM', width: 140},
	{id: 'WXXX', width: 140},
	{id: 'GEOB', width: 140}
];

export const Id3v2ValuePicTypes: { [name: string]: string; } = {
	0: 'Other',
	1: '32x32 pixels \'file icon\' (PNG only)',
	2: 'Other file icon',
	3: 'Cover (front)',
	4: 'Cover (back)',
	5: 'Leaflet page',
	6: 'Media (e.g. lable side of CD)',
	7: 'Lead artist/lead performer/soloist',
	8: 'Artist/performer',
	9: 'Conductor',
	10: 'Band/Orchestra',
	11: 'Composer',
	12: 'Lyricist/text writer',
	13: 'Recording Location',
	14: 'During recording',
	15: 'During performance',
	16: 'Movie/video screen capture',
	17: 'A bright coloured fish',
	18: 'Illustration',
	19: 'Band/artist logotype',
	20: 'Publisher/Studio logotype'
};
