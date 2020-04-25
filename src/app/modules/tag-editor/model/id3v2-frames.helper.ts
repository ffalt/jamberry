/* tslint:disable:object-literal-key-quotes */

/* tslint:disable:max-file-line-count */

export interface FrameDef {
	title: string;
	versions: Array<number>;
	impl: FrameType;
	upgrade?: string;
}

export enum FrameType {
	Filename = 1,
	IdText,
	IdBin,
	Text,
	TextList,
	LangDescText,
	PlayCounter,
	Popularimeter,
	MusicCDId,
	EventTimingCodes,
	SYLT,
	GEOB,
	ETCO,
	PCST,
	LINK,
	AENC,
	Pic,
	RVAD,
	RGAD,
	RVAD2,
	CTOC,
	CHAP,
	Bool,
	Unknown
}

export const FrameDefs: { [id: string]: FrameDef } = {
	'internal_file': {
		title: 'Filename',
		versions: [2, 3, 4],
		impl: FrameType.Filename
	},
	'UFI': {
		title: 'Unique file identifier',
		versions: [2],
		impl: FrameType.IdText,
		upgrade: 'UFID'
	},
	'TOT': {
		title: 'Original album/Movie/Show title',
		versions: [2],
		impl: FrameType.Text,
		upgrade: 'TOAL'
	},
	'CDM': {
		title: 'Compressed Data Metaframe',
		versions: [2],
		impl: FrameType.Unknown
	},
	'CRM': {
		title: 'Encrypted meta',
		versions: [2],
		impl: FrameType.Unknown
	},
	'TT1': {
		title: 'Content group',
		versions: [2],
		impl: FrameType.Text,
		upgrade: 'TIT1'
	},
	'TT2': {
		title: 'Title',
		versions: [2],
		impl: FrameType.Text,
		upgrade: 'TIT2'
	},
	'TT3': {
		title: 'Subtitle',
		versions: [2],
		impl: FrameType.Text,
		upgrade: 'TIT3'
	},
	'TP1': {
		title: 'Artist',
		versions: [2],
		impl: FrameType.Text,
		upgrade: 'TPE1'
	},
	'TP2': {
		title: 'Album Artist',
		versions: [2],
		impl: FrameType.Text,
		upgrade: 'TPE2'
	},
	'TP3': {
		title: 'Conductor',
		versions: [2],
		impl: FrameType.Text,
		upgrade: 'TPE3'
	},
	'TP4': {
		title: 'Remixer',
		versions: [2],
		impl: FrameType.Text,
		upgrade: 'TPE4'
	},
	'TCM': {
		title: 'Composer',
		versions: [2],
		impl: FrameType.Text,
		upgrade: 'TCOM'
	},
	'TXT': {
		title: 'Lyricist',
		versions: [2],
		impl: FrameType.Text,
		upgrade: 'TEXT'
	},
	'TLA': {
		title: 'Languages',
		versions: [2],
		impl: FrameType.Text,
		upgrade: 'TLAN'
	},
	'TCO': {
		title: 'Genre',
		versions: [2],
		impl: FrameType.Text,
		upgrade: 'TCON'
	},
	'TAL': {
		title: 'Album',
		versions: [2],
		impl: FrameType.Text,
		upgrade: 'TALB'
	},
	'TPA': {
		title: 'Part of a set',
		versions: [2],
		impl: FrameType.Text,
		upgrade: 'TPOS'
	},
	'TRK': {
		title: 'Track number',
		versions: [2],
		impl: FrameType.Text,
		upgrade: 'TRCK'
	},
	'TRC': {
		title: 'ISRC (international standard recording code)',
		versions: [2],
		impl: FrameType.Text,
		upgrade: 'TSRC'
	},
	'TYE': {
		title: 'Year',
		versions: [2],
		impl: FrameType.Text,
		upgrade: 'TYER'
	},
	'TDA': {
		title: 'Date',
		versions: [2],
		impl: FrameType.Text,
		upgrade: 'TDAT'
	},
	'TIM': {
		title: 'Time',
		versions: [2],
		impl: FrameType.Text,
		upgrade: 'TIME'
	},
	'TRD': {
		title: 'Recording dates',
		versions: [2],
		impl: FrameType.Text,
		upgrade: 'TRDA'
	},
	'TMT': {
		title: 'Media type',
		versions: [2],
		impl: FrameType.Text,
		upgrade: 'TMED'
	},
	'TBP': {
		title: 'BPM',
		versions: [2],
		impl: FrameType.Text,
		upgrade: 'TBPM'
	},
	'TCR': {
		title: 'Copyright message',
		versions: [2],
		impl: FrameType.Text,
		upgrade: 'TCOP'
	},
	'TPB': {
		title: 'Publisher',
		versions: [2],
		impl: FrameType.Text,
		upgrade: 'TPUB'
	},
	'TEN': {
		title: 'Encoded by',
		versions: [2],
		impl: FrameType.Text,
		upgrade: 'TENC'
	},
	'TSS': {
		title: 'Encoding Software/Hardware',
		versions: [2],
		impl: FrameType.Text,
		upgrade: 'TSSE'
	},
	'TOF': {
		title: 'Original filename',
		versions: [2],
		impl: FrameType.Text,
		upgrade: 'TOFN'
	},
	'TLE': {
		title: 'Length',
		versions: [2],
		impl: FrameType.Text,
		upgrade: 'TLEN'
	},
	'TSI': {
		title: 'Size',
		versions: [2],
		impl: FrameType.Text,
		upgrade: 'TSIZ'
	},
	'TDY': {
		title: 'Playlist delay',
		versions: [2],
		impl: FrameType.Text,
		upgrade: 'TDLY'
	},
	'TKE': {
		title: 'Initial key',
		versions: [2],
		impl: FrameType.Text,
		upgrade: 'TKEY'
	},
	'TOL': {
		title: 'Original lyricist',
		versions: [2],
		impl: FrameType.Text,
		upgrade: 'TOLY'
	},
	'TOA': {
		title: 'Original artist',
		versions: [2],
		impl: FrameType.Text,
		upgrade: 'TOPE'
	},
	'TOR': {
		title: 'Original release year',
		versions: [2],
		impl: FrameType.Text,
		upgrade: 'TORY'
	},
	'TXX': {
		title: 'User defined text',
		versions: [2],
		impl: FrameType.IdText,
		upgrade: 'TXXX'
	},
	'WAF': {
		title: 'Official audio file webpage',
		versions: [2],
		impl: FrameType.Text,
		upgrade: 'WOAF'
	},
	'WAR': {
		title: 'Official artist/performer webpage',
		versions: [2],
		impl: FrameType.Text,
		upgrade: 'WOAR'
	},
	'WAS': {
		title: 'Official audio source webpage',
		versions: [2],
		impl: FrameType.Text,
		upgrade: 'WOAS'
	},
	'WCM': {
		title: 'Commercial information',
		versions: [2],
		impl: FrameType.Text,
		upgrade: 'WCOM'
	},
	'WCP': {
		title: 'Copyright/Legal information',
		versions: [2],
		impl: FrameType.Text,
		upgrade: 'WCOP'
	},
	'WPB': {
		title: 'Publishers official webpage',
		versions: [2],
		impl: FrameType.Text,
		upgrade: 'WPUB'
	},
	'WXX': {
		title: 'User defined URL link frame',
		versions: [2],
		impl: FrameType.IdText,
		upgrade: 'WXXX'
	},
	'IPL': {
		title: 'Involved people list',
		versions: [2],
		impl: FrameType.TextList,
		upgrade: 'IPLS'
	},
	'ETC': {
		title: 'Event timing codes',
		versions: [2],
		impl: FrameType.EventTimingCodes,
		upgrade: 'ETCO'
	},
	'MLL': {
		title: 'MPEG location lookup table',
		versions: [2],
		impl: FrameType.Unknown,
		upgrade: 'MLLT'
	},
	'STC': {
		title: 'Synchronised tempo codes',
		versions: [2],
		impl: FrameType.Unknown,
		upgrade: 'SYTC'
	},
	'ULT': {
		title: 'Lyrics',
		versions: [2],
		impl: FrameType.LangDescText,
		upgrade: 'USLT'
	},
	'SLT': {
		title: 'Synchronised Lyrics',
		versions: [2],
		impl: FrameType.SYLT,
		upgrade: 'SYLT'
	},
	'COM': {
		title: 'Comments',
		versions: [2],
		impl: FrameType.LangDescText,
		upgrade: 'COMM'
	},
	'RVA': {
		title: 'Relative volume adjustment',
		versions: [2],
		impl: FrameType.RVAD,
		upgrade: 'RVAD'
	},
	'EQU': {
		title: 'Equalisation',
		versions: [2],
		impl: FrameType.Unknown,
		upgrade: 'EQUA'
	},
	'REV': {
		title: 'Reverb',
		versions: [2],
		impl: FrameType.Unknown,
		upgrade: 'RVRB'
	},
	'PIC': {
		title: 'Attached picture',
		versions: [2],
		impl: FrameType.Pic,
		upgrade: 'APIC'
	},
	'GEO': {
		title: 'General encapsulated object',
		versions: [2],
		impl: FrameType.GEOB,
		upgrade: 'GEOB'
	},
	'CNT': {
		title: 'Play counter',
		versions: [2],
		impl: FrameType.PlayCounter,
		upgrade: 'PCNT'
	},
	'POP': {
		title: 'Popularimeter',
		versions: [2],
		impl: FrameType.Popularimeter,
		upgrade: 'POPM'
	},
	'BUF': {
		title: 'Recommended buffer size',
		versions: [2],
		impl: FrameType.Unknown,
		upgrade: 'RBUF'
	},
	'CRA': {
		title: 'Audio encryption',
		versions: [2],
		impl: FrameType.AENC,
		upgrade: 'AENC'
	},
	'LNK': {
		title: 'Linked information',
		versions: [2],
		impl: FrameType.LINK,
		upgrade: 'LINK'
	},
	'NCO': {
		title: 'MusicMatch Binary',
		versions: [2],
		impl: FrameType.Unknown,
		upgrade: 'NCON'
	},
	'PRI': {
		title: 'Private frame',
		versions: [2],
		impl: FrameType.IdBin,
		upgrade: 'PRIV'
	},
	'TCP': {
		title: 'iTunes Compilation Flag',
		versions: [2],
		impl: FrameType.Bool,
		upgrade: 'TCMP'
	},
	'TST': {
		title: 'Title sort order',
		versions: [2],
		impl: FrameType.Text,
		upgrade: 'XSOT'
	},
	'TSP': {
		title: 'Artist sort order',
		versions: [2],
		impl: FrameType.Text,
		upgrade: 'XSOP'
	},
	'TSA': {
		title: 'Album sort order',
		versions: [2],
		impl: FrameType.Text,
		upgrade: 'XSOA'
	},
	'TS2': {
		title: 'Album Artist sort order',
		versions: [2],
		impl: FrameType.Text,
		upgrade: 'TSO2'
	},
	'TSC': {
		title: 'Composer sort order',
		versions: [2],
		impl: FrameType.Text,
		upgrade: 'TSOC'
	},
	'TDR': {
		title: 'Release time',
		versions: [2],
		impl: FrameType.Text,
		upgrade: 'TDRL'
	},
	'TDS': {
		title: 'iTunes podcast description',
		versions: [2],
		impl: FrameType.Text,
		upgrade: 'TDES'
	},
	'TID': {
		title: 'Podcast URL',
		versions: [2],
		impl: FrameType.Text,
		upgrade: 'TGID'
	},
	'WFD': {
		title: 'Podcast feed URL',
		versions: [2],
		impl: FrameType.Text,
		upgrade: 'WFED'
	},
	'PCS': {
		title: 'iTunes podcast marker',
		versions: [2],
		impl: FrameType.PCST,
		upgrade: 'PCST'
	},
	'XSOA': {
		title: 'Album sort order',
		versions: [3],
		impl: FrameType.Text,
		upgrade: 'TSOA'
	},
	'XSOP': {
		title: 'Performer sort order',
		versions: [3],
		impl: FrameType.Text,
		upgrade: 'TSOP'
	},
	'XSOT': {
		title: 'Title sort order',
		versions: [3],
		impl: FrameType.Text,
		upgrade: 'TSOT'
	},
	'XDOR': {
		title: 'Original release time',
		versions: [3],
		impl: FrameType.Text,
		upgrade: 'TDOR'
	},
	'TIT1': {
		title: 'Group',
		versions: [3, 4],
		impl: FrameType.Text
	},
	'TIT2': {
		title: 'Title',
		versions: [3, 4],
		impl: FrameType.Text
	},
	'TIT3': {
		title: 'Subtitle',
		versions: [3, 4],
		impl: FrameType.Text
	},
	'TALB': {
		title: 'Album',
		versions: [3, 4],
		impl: FrameType.Text
	},
	'TOAL': {
		title: 'Original album',
		versions: [3, 4],
		impl: FrameType.Text
	},
	'TRCK': {
		title: 'Track number',
		versions: [3, 4],
		impl: FrameType.Text
	},
	'TPOS': {
		title: 'Part of a set',
		versions: [3, 4],
		impl: FrameType.Text
	},
	'TSRC': {
		title: 'ISRC (international standard recording code)',
		versions: [3, 4],
		impl: FrameType.Text
	},
	'TPE1': {
		title: 'Artist',
		versions: [3, 4],
		impl: FrameType.Text
	},
	'TPE2': {
		title: 'Album Artist',
		versions: [3, 4],
		impl: FrameType.Text
	},
	'TPE3': {
		title: 'Conductor',
		versions: [3, 4],
		impl: FrameType.Text
	},
	'TPE4': {
		title: 'Remixer',
		versions: [3, 4],
		impl: FrameType.Text
	},
	'TOPE': {
		title: 'Original artist',
		versions: [3, 4],
		impl: FrameType.Text
	},
	'TEXT': {
		title: 'Lyricist',
		versions: [3, 4],
		impl: FrameType.Text
	},
	'TOLY': {
		title: 'Original lyricist',
		versions: [3, 4],
		impl: FrameType.Text
	},
	'TCOM': {
		title: 'Composer',
		versions: [3, 4],
		impl: FrameType.Text
	},
	'TENC': {
		title: 'Encoded by',
		versions: [3, 4],
		impl: FrameType.Text
	},
	'TBPM': {
		title: 'BPM',
		versions: [3, 4],
		impl: FrameType.Text
	},
	'TLEN': {
		title: 'Length',
		versions: [3, 4],
		impl: FrameType.Text
	},
	'TKEY': {
		title: 'Initial key',
		versions: [3, 4],
		impl: FrameType.Text
	},
	'TLAN': {
		title: 'Languages',
		versions: [3, 4],
		impl: FrameType.Text
	},
	'TCON': {
		title: 'Genre',
		versions: [3, 4],
		impl: FrameType.Text
	},
	'TFLT': {
		title: 'File type',
		versions: [3, 4],
		impl: FrameType.Text
	},
	'TMED': {
		title: 'Media type',
		versions: [3, 4],
		impl: FrameType.Text
	},
	'TCOP': {
		title: 'Copyright message',
		versions: [3, 4],
		impl: FrameType.Text
	},
	'TPUB': {
		title: 'Publisher',
		versions: [3, 4],
		impl: FrameType.Text
	},
	'TOWN': {
		title: 'File owner',
		versions: [3, 4],
		impl: FrameType.Text
	},
	'TRSN': {
		title: 'Internet radio station name',
		versions: [3, 4],
		impl: FrameType.Text
	},
	'TRSO': {
		title: 'Internet radio station owner',
		versions: [3, 4],
		impl: FrameType.Text
	},
	'TOFN': {
		title: 'Original filename',
		versions: [3, 4],
		impl: FrameType.Text
	},
	'TDLY': {
		title: 'Playlist delay',
		versions: [3, 4],
		impl: FrameType.Text
	},
	'TSSE': {
		versions: [3, 4],
		title: 'Encoding Software/Hardware',
		impl: FrameType.Text
	},
	'TSST': {
		versions: [3, 4],
		title: 'Set subtitle',
		impl: FrameType.Text
	},
	'TDAT': {
		title: 'Date',
		versions: [3],
		impl: FrameType.Text
	},
	'TIME': {
		title: 'Time',
		versions: [3],
		impl: FrameType.Text
	},
	'TORY': {
		title: 'Original release year',
		versions: [3],
		impl: FrameType.Text
	},
	'TRDA': {
		title: 'Recording dates',
		versions: [3],
		impl: FrameType.Text
	},
	'TSIZ': {
		title: 'Size',
		versions: [3],
		impl: FrameType.Text
	},
	'TYER': {
		title: 'Year',
		versions: [3],
		impl: FrameType.Text
	},
	'TMCL': {
		versions: [4],
		title: 'Musician credits list',
		impl: FrameType.TextList
	},
	'TIPL': {
		versions: [4],
		title: 'Involved people list',
		impl: FrameType.TextList
	},
	'TMOO': {
		title: 'Mood',
		versions: [4],
		impl: FrameType.Text
	},
	'TPRO': {
		title: 'Produced notice',
		versions: [4],
		impl: FrameType.Text
	},
	'TDOR': {
		title: 'Original release time',
		versions: [4],
		impl: FrameType.Text
	},
	'TDRC': {
		versions: [4],
		title: 'Recording time',
		impl: FrameType.Text
	},
	'TDRL': {
		versions: [3, 4],
		title: 'Release time',
		impl: FrameType.Text
	},
	'TDTG': {
		versions: [4],
		title: 'Tagging time',
		impl: FrameType.Text
	},
	'TSOA': {
		versions: [4],
		title: 'Album sort order',
		impl: FrameType.Text
	},
	'TSOP': {
		versions: [4],
		title: 'Artist sort order',
		impl: FrameType.Text
	},
	'TSOT': {
		versions: [4],
		title: 'Title sort order',
		impl: FrameType.Text
	},
	'WCOM': {
		title: 'Commercial information',
		versions: [3, 4],
		impl: FrameType.Text
	},
	'WCOP': {
		title: 'Copyright/Legal information',
		versions: [3, 4],
		impl: FrameType.Text
	},
	'WOAF': {
		title: 'Official audio file webpage',
		versions: [3, 4],
		impl: FrameType.Text
	},
	'WOAR': {
		title: 'Official artist/performer webpage',
		versions: [3, 4],
		impl: FrameType.Text
	},
	'WOAS': {
		title: 'Official audio source webpage',
		versions: [3, 4],
		impl: FrameType.Text
	},
	'WORS': {
		title: 'Official internet radio station homepage',
		versions: [3, 4],
		impl: FrameType.Text
	},
	'WPAY': {
		title: 'Payment',
		versions: [3, 4],
		impl: FrameType.Text
	},
	'WPUB': {
		title: 'Publishers official webpage',
		versions: [3, 4],
		impl: FrameType.Text
	},
	'TXXX': {
		title: 'User defined text',
		versions: [3, 4],
		impl: FrameType.IdText
	},
	'WXXX': {
		title: 'User defined URL link frame',
		versions: [3, 4],
		impl: FrameType.IdText
	},
	'UFID': {
		title: 'Unique file identifier',
		versions: [3, 4],
		impl: FrameType.IdText
	},
	'MCDI': {
		title: 'Music CD identifier',
		versions: [3, 4],
		impl: FrameType.MusicCDId
	},
	'ETCO': {
		title: 'Event timing codes',
		versions: [3, 4],
		impl: FrameType.ETCO
	},
	'MLLT': {
		title: 'MPEG location lookup table',
		versions: [3, 4],
		impl: FrameType.Unknown
	},
	'SYTC': {
		title: 'Synchronised tempo codes',
		versions: [3, 4],
		impl: FrameType.Unknown
	},
	'USLT': {
		title: 'Lyrics',
		versions: [3, 4],
		impl: FrameType.LangDescText
	},
	'SYLT': {
		title: 'Synchronised Lyrics',
		versions: [3, 4],
		impl: FrameType.SYLT
	},
	'COMM': {
		title: 'Comments',
		versions: [3, 4],
		impl: FrameType.LangDescText
	},
	'RVAD': {
		title: 'Relative volume adjustment',
		versions: [3, 4],
		impl: FrameType.RVAD
	},
	'RVA2': {
		title: 'Relative volume adjustment 2',
		versions: [4],
		impl: FrameType.RVAD2
	},
	'EQUA': {
		title: 'Equalisation',
		versions: [3, 4],
		impl: FrameType.Unknown
	},
	'RVRB': {
		title: 'Reverb',
		versions: [3, 4],
		impl: FrameType.Unknown
	},
	'APIC': {
		title: 'Attached picture',
		versions: [3, 4],
		impl: FrameType.Pic
	},
	'GEOB': {
		title: 'General encapsulated object',
		versions: [3, 4],
		impl: FrameType.GEOB
	},
	'PCNT': {
		title: 'Play counter',
		versions: [3, 4],
		impl: FrameType.PlayCounter
	},
	'POPM': {
		title: 'Popularimeter',
		versions: [3, 4],
		impl: FrameType.Popularimeter
	},
	'RBUF': {
		title: 'Recommended buffer size',
		versions: [3, 4],
		impl: FrameType.Unknown
	},
	'AENC': {
		title: 'Audio encryption',
		versions: [3, 4],
		impl: FrameType.AENC
	},
	'LINK': {
		title: 'Linked information',
		versions: [3, 4],
		impl: FrameType.LINK
	},
	'POSS': {
		title: 'Position synchronisation',
		versions: [3, 4],
		impl: FrameType.Unknown
	},
	'USER': {
		title: 'Terms of use',
		versions: [3, 4],
		impl: FrameType.Unknown
	},
	'OWNE': {
		title: 'Ownership',
		versions: [3, 4],
		impl: FrameType.Unknown
	},
	'COMR': {
		title: 'Commercial',
		versions: [3, 4],
		impl: FrameType.Unknown
	},
	'ENCR': {
		title: 'Encryption method registration',
		versions: [3, 4],
		impl: FrameType.Unknown
	},
	'GRID': {
		title: 'Group ID registration',
		versions: [3, 4],
		impl: FrameType.Unknown
	},
	'PRIV': {
		title: 'Private frame',
		versions: [3, 4],
		impl: FrameType.IdBin
	},
	'IPLS': {
		title: 'Involved people list',
		versions: [3],
		impl: FrameType.TextList
	},
	'SIGN': {
		title: 'Signature',
		versions: [4],
		impl: FrameType.Unknown
	},
	'SEEK': {
		title: 'Seek',
		versions: [4],
		impl: FrameType.Unknown
	},
	'ASPI': {
		title: 'Audio seek point index',
		versions: [4],
		impl: FrameType.Unknown
	},
	'RGAD': {
		title: 'Replay Gain Adjustment',
		versions: [3, 4],
		impl: FrameType.RGAD
	},
	'TCMP': {
		title: 'iTunes Compilation Flag',
		versions: [3, 4],
		impl: FrameType.Bool
	},
	'TSO2': {
		title: 'Album Artist sort order',
		versions: [3, 4],
		impl: FrameType.Text
	},
	'TSOC': {
		title: 'Composer sort order',
		versions: [3, 4],
		impl: FrameType.Text
	},
	'PCST': {
		title: 'iTunes podcast marker',
		versions: [3, 4],
		impl: FrameType.PCST
	},
	'TDES': {
		title: 'iTunes podcast description',
		versions: [3, 4],
		impl: FrameType.Text
	},
	'TKWD': {
		title: 'iTunes podcast keywords',
		versions: [3, 4],
		impl: FrameType.Unknown
	},
	'TGID': {
		title: 'Podcast URL',
		versions: [3, 4],
		impl: FrameType.Text
	},
	'TDEN': {
		title: 'Encoding time',
		versions: [3, 4],
		impl: FrameType.Text
	},
	'WFED': {
		title: 'Podcast feed URL',
		versions: [3, 4],
		impl: FrameType.Text
	},
	'GRP1': {
		title: 'Group Number',
		versions: [3, 4],
		impl: FrameType.Text
	},
	'NCON': {
		title: 'MusicMatch Binary',
		versions: [3, 4],
		impl: FrameType.Unknown
	},
	'CTOC': {
		title: 'Chapter TOC',
		versions: [4],
		impl: FrameType.CTOC
	},
	'CHAP': {
		title: 'Chapter',
		versions: [4],
		impl: FrameType.CHAP
	},
	'XHD3': {
		title: 'mp3hd',
		versions: [3, 4],
		impl: FrameType.Unknown
	},
	'CM1': {
		title: 'User defined text',
		versions: [2],
		impl: FrameType.Text,
		upgrade: 'TXXX'
	}
};

export const FrameTXXXSubIdsDefs: { [id: string]: string } = {
	'ASIN': 'ASIN Id',
	'CATALOGNUMBER': 'Catalog Nr',
	'SCRIPT': 'Script',
	'BARCODE': 'Barcode',
	'originalyear': 'Original Year',
	'replaygain_track_gain': 'Replaygain track gain',
	'replaygain_album_gain': 'Replaygain album gain',
	'replaygain_track_peak': 'Replaygain track peak',
	'replaygain_album_peak': 'Replaygain album peak',
	'Artists': 'Artists',
	'Supplier': 'Supplier',
	'Release type': 'Release type',
	'Acoustid Id': 'Acoustid Id',
	'MusicBrainz Track Disambiguation': 'MusicBrainz Track Disambiguation',
	'MusicBrainz Album Type': 'MusicBrainz Album Type',
	'MusicBrainz Album Artist Id': 'MusicBrainz Album Artist Id',
	'MusicBrainz Artist Id': 'MusicBrainz Artist Id',
	'MusicBrainz Album Id': 'MusicBrainz Album Id',
	'MusicBrainz Release Track Id': 'MusicBrainz Release Track Id',
	'MusicBrainz Release Group Id': 'MusicBrainz Release Group Id',
	'MusicBrainz Recording Id': 'MusicBrainz Recording Id',
	'MusicBrainz Album Status': 'MusicBrainz Album Status',
	'MusicBrainz Album Release Country': 'MusicBrainz Album Release Country',
	'MusicBrainz TRM Id': 'MusicBrainz TRM Id',
	'Discogs Artist ID': 'Discogs Artist Id',
	'Discogs Label ID': 'Discogs Label Id',
	'Discogs Master Release ID': 'Discogs Master Release Id',
	'Discogs Release ID': 'Discogs Master Release Id',
	'Discogs Votes': 'Discogs Votes',
	'Discogs Rating': 'Discogs Rating'
};

export const FrameUFIDSubIdsDefs: { [id: string]: string } = {
	'http://musicbrainz.org': 'MusicBrainz Track Id'
};

export const FrameCOMMSubIdsDefs: { [id: string]: string } = {
	'http://musicbrainz.org': 'MusicBrainz Track Id',
	'': 'Default Comment'
};

export function getFrameSubIds(id: string): Array<{ subid: string; name: string }> {
	if (id === 'TXXX') {
		return Object.keys(FrameTXXXSubIdsDefs).map(subid => ({subid, name: FrameTXXXSubIdsDefs[subid]}));
	}
	if (id === 'UFID') {
		return Object.keys(FrameUFIDSubIdsDefs).map(subid => ({subid, name: FrameUFIDSubIdsDefs[subid]}));
	}
	if (id === 'COMM') {
		return Object.keys(FrameCOMMSubIdsDefs).map(subid => ({subid, name: FrameCOMMSubIdsDefs[subid]}));
	}
	return [];
}
