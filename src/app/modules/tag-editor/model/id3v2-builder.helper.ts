import {ID3v2Frames} from '@jam';

interface ID3V2Frames {
	[key: string]: Array<ID3v2Frames.Frame>;
}

export class ID3V2RawBuilder {
	private frameValues: ID3V2Frames = {};

	build(): ID3V2Frames {
		return this.frameValues;
	}

	text(key: string, text: string | undefined): ID3V2RawBuilder {
		if (text) {
			const frame: ID3v2Frames.Text = {id: key, value: {text}};
			this.frameValues[key] = [frame];
		}
		return this;
	}

	idText(key: string, id: string, value: string | undefined): ID3V2RawBuilder {
		if (value) {
			const frame: ID3v2Frames.IdText = {id: key, value: {id, text: value}};
			const list = ((this.frameValues[key] || []) as Array<ID3v2Frames.IdText>)
				.filter(f => f.value.id !== id);
			this.frameValues[key] = list.concat([frame]);
		}
		return this;
	}

	nrAndTotal(key: string, value: number | string | undefined, total: number | string | undefined): ID3V2RawBuilder {
		if (value) {
			const text = value.toString() + (total ? `/${total.toString()}` : '');
			const frame: ID3v2Frames.Text = {id: key, value: {text}};
			this.frameValues[key] = [frame];
		}
		return this;
	}

	keyTextList(key: string, group: string, value?: string): ID3V2RawBuilder {
		if (value) {
			const frames = (this.frameValues[key] || []) as Array<ID3v2Frames.TextList>;
			const frame: ID3v2Frames.TextList = (frames.length > 0) ? frames[0] : {id: key, value: {list: []}};
			frame.value.list.push(group);
			frame.value.list.push(value);
			this.frameValues[key] = [frame];
		}
		return this;
	}

	bool(key: string, bool: boolean): ID3V2RawBuilder {
		if (bool !== undefined) {
			const frame: ID3v2Frames.Bool = {id: key, value: {bool}};
			this.frameValues[key] = [frame];
		}
		return this;
	}

	idLangText(key: string, value: string | undefined, lang: string | undefined, id: string | undefined): ID3V2RawBuilder {
		if (value) {
			const cid = id || '';
			const list = ((this.frameValues[key] || []) as Array<ID3v2Frames.LangDescText>)
				.filter(f => f.value.id !== cid);
			const frame: ID3v2Frames.LangDescText = {id: key, value: {id: cid, language: lang || '', text: value}};
			this.frameValues[key] = list.concat([frame]);
		}
		return this;
	}

	addPicture(key: string, pictureType: number, description: string, mimeType: string, binary: any): ID3V2RawBuilder {
		const frame: ID3v2Frames.Pic = {
			id: key, value: {
				description: description || '',
				pictureType,
				bin: binary,
				mimeType
			}
		};
		this.frameValues[key] = (this.frameValues[key] || []).concat([frame]);
		return this;
	}

	addChapter(key: string, chapterID: string, start: number, end: number, offset: number, offsetEnd: number, subframes?: Array<ID3v2Frames.Frame>): ID3V2RawBuilder {
		const frame: ID3v2Frames.Chapter = {
			id: key,
			value: {
				id: chapterID,
				start,
				end,
				offset,
				offsetEnd
			},
			subframes
		};
		this.frameValues[key] = (this.frameValues[key] || []).concat([frame]);
		return this;
	}
}

export class ID3V24TagBuilder {
	rawBuilder = new ID3V2RawBuilder();

	buildFrames(): ID3V2Frames {
		return this.rawBuilder.build();
	}

	artist(value?: string): ID3V24TagBuilder {
		this.rawBuilder.text('TPE1', value);
		return this;
	}

	artistSort(value?: string): ID3V24TagBuilder {
		this.rawBuilder.text('TSOP', value);
		return this;
	}

	albumArtist(value?: string): ID3V24TagBuilder {
		this.rawBuilder.text('TPE2', value);
		return this;
	}

	albumArtistSort(value?: string): ID3V24TagBuilder {
		this.rawBuilder.text('TSO2', value);
		return this;
	}

	album(value?: string): ID3V24TagBuilder {
		this.rawBuilder.text('TALB', value);
		return this;
	}

	albumSort(value?: string): ID3V24TagBuilder {
		this.rawBuilder.text('TSOA', value);
		return this;
	}

	originalAlbum(value?: string): ID3V24TagBuilder {
		this.rawBuilder.text('TOAL', value);
		return this;
	}

	originalArtist(value?: string): ID3V24TagBuilder {
		this.rawBuilder.text('TOPE', value);
		return this;
	}

	originalDate(value?: string): ID3V24TagBuilder {
		this.rawBuilder.text('TDOR', value);
		return this;
	}

	title(value?: string): ID3V24TagBuilder {
		this.rawBuilder.text('TIT2', value);
		return this;
	}

	work(value?: string): ID3V24TagBuilder {
		this.rawBuilder.text('TIT1', value);
		return this;
	}

	titleSort(value?: string): ID3V24TagBuilder {
		this.rawBuilder.text('TSOT', value);
		return this;
	}

	genre(value?: string): ID3V24TagBuilder {
		this.rawBuilder.text('TCON', value);
		return this;
	}

	bmp(value?: string | number): ID3V24TagBuilder {
		this.rawBuilder.text('TBPM', value ? value.toString() : undefined);
		return this;
	}

	mood(value?: string): ID3V24TagBuilder {
		this.rawBuilder.text('TMOO', value);
		return this;
	}

	media(value?: string): ID3V24TagBuilder {
		this.rawBuilder.text('TMED', value);
		return this;
	}

	language(value?: string): ID3V24TagBuilder {
		this.rawBuilder.text('TLAN', value);
		return this;
	}

	grouping(value?: string): ID3V24TagBuilder {
		this.rawBuilder.text('GRP1', value);
		return this;
	}

	date(value?: string): ID3V24TagBuilder {
		this.rawBuilder.text('TDRC', value);
		return this;
	}

	track(trackNr?: string | number, trackTotal?: string | number): ID3V24TagBuilder {
		this.rawBuilder.nrAndTotal('TRCK', trackNr, trackTotal);
		return this;
	}

	disc(discNr?: string | number, discTotal?: string | number): ID3V24TagBuilder {
		this.rawBuilder.nrAndTotal('TPOS', discNr, discTotal);
		return this;
	}

	year(year?: number): ID3V24TagBuilder {
		this.rawBuilder.text('TORY', year ? year.toString() : undefined);
		return this;
	}

	artists(value?: string): ID3V24TagBuilder {
		this.rawBuilder.idText('TXXX', 'Artists', value);
		return this;
	}

	isCompilation(value?: boolean | number | string): ID3V24TagBuilder {
		if (value !== undefined) {
			this.rawBuilder.bool('TCMP', value === 1 || value === 'true' || value === true);
		}
		return this;
	}

	originalYear(value?: string): ID3V24TagBuilder {
		this.rawBuilder.text('TYER', value);
		return this;
	}

	composer(value?: string): ID3V24TagBuilder {
		this.rawBuilder.text('TCOM', value);
		return this;
	}

	composerSort(value?: string): ID3V24TagBuilder {
		this.rawBuilder.text('TSOC', value);
		return this;
	}

	remixer(value?: string): ID3V24TagBuilder {
		this.rawBuilder.text('TPE4', value);
		return this;
	}

	label(value?: string): ID3V24TagBuilder {
		this.rawBuilder.text('TPUB', value);
		return this;
	}

	subtitle(value?: string): ID3V24TagBuilder {
		this.rawBuilder.text('TIT3', value);
		return this;
	}

	discSubtitle(value?: string): ID3V24TagBuilder {
		this.rawBuilder.text('TSST', value);
		return this;
	}

	lyricist(value?: string): ID3V24TagBuilder {
		this.rawBuilder.text('TEXT', value);
		return this;
	}

	lyrics(value?: string, lang?: string, id?: string): ID3V24TagBuilder {
		this.rawBuilder.idLangText('USLT', value, lang, id);
		return this;
	}

	encoder(value?: string): ID3V24TagBuilder {
		this.rawBuilder.text('TENC', value);
		return this;
	}

	encoderSettings(value?: string): ID3V24TagBuilder {
		this.rawBuilder.text('TSSE', value);
		return this;
	}

	key(value?: string): ID3V24TagBuilder {
		this.rawBuilder.text('TKEY', value);
		return this;
	}

	copyright(value?: string): ID3V24TagBuilder {
		this.rawBuilder.text('TCOP', value);
		return this;
	}

	isrc(value?: string): ID3V24TagBuilder {
		this.rawBuilder.text('TSRC', value);
		return this;
	}

	barcode(value?: string): ID3V24TagBuilder {
		this.rawBuilder.idText('TXXX', 'BARCODE', value);
		return this;
	}

	asin(value?: string): ID3V24TagBuilder {
		this.rawBuilder.idText('TXXX', 'ASIN', value);
		return this;
	}

	catalogNumber(value?: string): ID3V24TagBuilder {
		this.rawBuilder.idText('TXXX', 'CATALOGNUMBER', value);
		return this;
	}

	script(value?: string): ID3V24TagBuilder {
		this.rawBuilder.idText('TXXX', 'SCRIPT', value);
		return this;
	}

	license(value?: string): ID3V24TagBuilder {
		this.rawBuilder.idText('TXXX', 'LICENSE', value);
		return this;
	}

	website(value?: string): ID3V24TagBuilder {
		this.rawBuilder.text('WOAR', value);
		return this;
	}

	movement(value?: string): ID3V24TagBuilder {
		this.rawBuilder.text('MVNM', value);
		return this;
	}

	movementNr(nr?: string | number, total?: string | number): ID3V24TagBuilder {
		this.rawBuilder.nrAndTotal('MVIN', nr, total);
		return this;
	}

	writer(value?: string): ID3V24TagBuilder {
		this.rawBuilder.idText('TXXX', 'Writer', value);
		return this;
	}

	custom(id: string, value?: string): ID3V24TagBuilder {
		this.rawBuilder.idText('TXXX', 'VERSION', value);
		return this;
	}

	musicianCredit(group: string, value?: string): ID3V24TagBuilder {
		this.rawBuilder.keyTextList('TMCL', group, value);
		return this;
	}

	involved(group: string, value?: string): ID3V24TagBuilder {
		this.rawBuilder.keyTextList('TIPL', group, value);
		return this;
	}

	discogsArtistID(value?: string): ID3V24TagBuilder {
		this.rawBuilder.idText('TXXX', 'Discogs Artist ID', value);
		return this;
	}

	discogsAlbumArtistID(value?: string): ID3V24TagBuilder {
		this.rawBuilder.idText('TXXX', 'Discogs Album Artist ID', value);
		return this;
	}

	discogsLabelID(value?: string): ID3V24TagBuilder {
		this.rawBuilder.idText('TXXX', 'Discogs Label ID', value);
		return this;
	}

	discogsMasterReleaseID(value?: string): ID3V24TagBuilder {
		this.rawBuilder.idText('TXXX', 'Discogs Master Release ID', value);
		return this;
	}

	discogsReleaseID(value?: string): ID3V24TagBuilder {
		this.rawBuilder.idText('TXXX', 'Discogs Release ID', value);
		return this;
	}

	discogsVotes(value?: string): ID3V24TagBuilder {
		this.rawBuilder.idText('TXXX', 'Discogs Votes', value);
		return this;
	}

	discogsRating(value?: string): ID3V24TagBuilder {
		this.rawBuilder.idText('TXXX', 'Discogs Rating', value);
		return this;
	}

	mbAlbumStatus(value?: string): ID3V24TagBuilder {
		this.rawBuilder.idText('TXXX', 'MusicBrainz Album Status', value);
		return this;
	}

	mbAlbumType(value?: string): ID3V24TagBuilder {
		this.rawBuilder.idText('TXXX', 'MusicBrainz Album Type', value);
		return this;
	}

	mbAlbumReleaseCountry(value?: string): ID3V24TagBuilder {
		this.rawBuilder.idText('TXXX', 'MusicBrainz Album Release Country', value);
		return this;
	}

	mbTrackID(value?: string): ID3V24TagBuilder {
		this.rawBuilder.idText('UFID', 'http://musicbrainz.org', value);
		return this;
	}

	mbReleaseTrackID(value?: string): ID3V24TagBuilder {
		this.rawBuilder.idText('TXXX', 'MusicBrainz Release Track Id', value);
		return this;
	}

	mbAlbumID(value?: string): ID3V24TagBuilder {
		this.rawBuilder.idText('TXXX', 'MusicBrainz Album Id', value);
		return this;
	}

	mbOriginalAlbumID(value?: string): ID3V24TagBuilder {
		this.rawBuilder.idText('TXXX', 'MusicBrainz Original Album Id', value);
		return this;
	}

	mbArtistID(value?: string): ID3V24TagBuilder {
		this.rawBuilder.idText('TXXX', 'MusicBrainz Artist Id', value);
		return this;
	}

	mbOriginalArtistID(value?: string): ID3V24TagBuilder {
		this.rawBuilder.idText('TXXX', 'MusicBrainz Original Artist Id', value);
		return this;
	}

	mbAlbumArtistID(value?: string): ID3V24TagBuilder {
		this.rawBuilder.idText('TXXX', 'MusicBrainz Album Artist Id', value);
		return this;
	}

	mbReleaseGroupID(value?: string): ID3V24TagBuilder {
		this.rawBuilder.idText('TXXX', 'MusicBrainz Release Group Id', value);
		return this;
	}

	mbWorkID(value?: string): ID3V24TagBuilder {
		this.rawBuilder.idText('TXXX', 'MusicBrainz Work Id', value);
		return this;
	}

	mbTRMID(value?: string): ID3V24TagBuilder {
		this.rawBuilder.idText('TXXX', 'MusicBrainz TRM Id', value);
		return this;
	}

	mbDiscID(value?: string): ID3V24TagBuilder {
		this.rawBuilder.idText('TXXX', 'MusicBrainz Disc Id', value);
		return this;
	}

	acoustidID(value?: string): ID3V24TagBuilder {
		this.rawBuilder.idText('TXXX', 'Acoustid Id', value);
		return this;
	}

	acoustidFingerprint(value?: string): ID3V24TagBuilder {
		this.rawBuilder.idText('TXXX', 'Acoustid Fingerprint', value);
		return this;
	}

	musicIPPUID(value?: string): ID3V24TagBuilder {
		this.rawBuilder.idText('TXXX', 'MusicIP PUID', value);
		return this;
	}

	comment(id: string, value?: string): ID3V24TagBuilder {
		this.rawBuilder.idText('COMM', id, value);
		return this;
	}

	trackLength(value?: number | string): ID3V24TagBuilder {
		this.rawBuilder.text('TLEN', value ? value.toString() : undefined);
		return this;
	}

	mbTrackDisambiguation(value?: string): ID3V24TagBuilder {
		this.rawBuilder.idText('TXXX', 'MusicBrainz Track Disambiguation', value);
		return this;
	}

	addPicture(pictureType: number, description: string, mimeType: string, binary: any): ID3V24TagBuilder {
		this.rawBuilder.addPicture('APIC', pictureType, description, mimeType, binary);
		return this;
	}

	chapter(id: string, start: number, end: number, offset: number, offsetEnd: number, subframes?: Array<ID3v2Frames.Frame>): ID3V24TagBuilder {
		this.rawBuilder.addChapter('CHAP', id, start, end, offset, offsetEnd, subframes);
		return this;
	}
}
