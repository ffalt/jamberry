import type {Jam, MusicBrainz} from '@jam';
import type {MatchImageNode} from '../components/match-coverart/match-coverart.component';
import {ID3V24TagBuilder} from './id3v2-builder.helper';
import type {Matching} from './release-matching.helper';

function fillGenres(builder: ID3V24TagBuilder, match: Matching, genres: Array<string>): void {
	if (genres && genres.length > 0) {
		builder.genre(genres.slice(0, 2).join('/'));
	} else if (match.track.tagRaw) {
		const oldgenres = match.track.tagRaw.frames.TCON;
		if (oldgenres) {
			const oldGenresNames = oldgenres.map((f: { value: { text: string } }) => f.value.text);
			builder.genre(oldGenresNames.slice(0, 2).join('/'));
		}
	}
}

// eslint-disable-next-line complexity
function fillCommon(
	builder: ID3V24TagBuilder, match: Matching, track: MusicBrainz.ReleaseTrack,
	release: MusicBrainz.Release | undefined,
	group: MusicBrainz.ReleaseGroup | undefined,
	media: MusicBrainz.ReleaseMedia | undefined
): void {
	builder
		.mbTrackID(track.recording?.id)
		.date(release?.date)
		.originalDate(group?.firstReleaseDate)
		.album(release?.title)
		.albumSort(release?.sortName)
		.title(track.title)
		.media(media?.format)
		.track(track.position, media?.trackCount)
		.disc(media?.position, release?.media.length)
		.trackLength(track.length)
		.language(release?.textRepresentation.language)
		.script(release?.textRepresentation.script)
		.barcode(release?.barcode)
		.isrc(track.recording?.isrcs && track.recording.isrcs.length > 0 ? track.recording.isrcs[0] : undefined)
		.mbAlbumStatus(release?.status ? release.status.toLowerCase() : undefined)
		.mbAlbumReleaseCountry(release?.country)
		.mbAlbumID(release?.id)
		.mbReleaseTrackID(track.id)
		.mbReleaseGroupID(release?.releaseGroup.id)
		.mbTrackDisambiguation(track.recording?.disambiguation)
		// .work(match.tracl)
		.asin(release?.asin)
		.discSubtitle(media?.title);
	if (track.recording?.aliases && track.recording.aliases.length > 0 && track.recording.aliases[0].sortName
		&& track.recording.aliases[0].sortName !== track.title) {
		builder.titleSort(track.recording.aliases[0].sortName);
	}

	const artist = release?.artistCredit[0];
	if (artist) {
		builder
			.albumArtist(artist.name)
			.albumArtistSort(artist.artist.sortName)
			.mbAlbumArtistID(artist.artist.id);
	}

	if (track.artistCredit && track.artistCredit.length > 0) {
		const artists = track.artistCredit.map(ac => `${ac.artist.name} ${ac.joinphrase}`).join(' ').replaceAll(/ {2}/g, ' ').trim();
		const sortArtists = track.artistCredit.map(ac =>
			(ac.artist.sortName ?? '').trim()).filter(s => s.length > 0).join(' & ').replaceAll(/ {2}/g, ' ').trim();
		builder
			.artist(artists)
			.artistSort(sortArtists)
			.mbArtistID(track.artistCredit[0].artist.id);
	} else if (artist) {
		builder
			.artist(artist.name)
			.artistSort(artist.artist.sortName)
			.mbArtistID(artist.artist.id);
	}

	const label = release?.labelInfo[0];
	if (label) {
		if (label.label) {
			builder.label(label.label.name);
		}
		builder.catalogNumber(label.catalogNumber);
	}
}

function fillTypes(builder: ID3V24TagBuilder, match: Matching, track: MusicBrainz.ReleaseTrack, release: MusicBrainz.Release | undefined): void {
	let types = [];
	if (release?.releaseGroup.primaryType) {
		types.push(release.releaseGroup.primaryType);
	}
	if (release?.releaseGroup.secondaryTypes) {
		types = [...types, ...release.releaseGroup.secondaryTypes];
	}
	if (types.length > 0) {
		builder.mbAlbumType(types.map(ty => ty.toLowerCase()).join('/'));
	}
	if (types.includes('compilation')) {
		builder.isCompilation(true);
	}
}

function fillImages(builder: ID3V24TagBuilder, match: Matching, images: Array<MatchImageNode>): void {
	if (images && images.length > 0) {
		addNewImages(builder, images);
	} else if (match.track.tagRaw) {
		addExistingImages(builder, match.track.tagRaw.frames.APIC);
	}
}

function getPictureType(types: Array<string>): number {
	if (types.includes('Medium')) return 6;
	if (types.includes('Booklet')) return 5;
	if (types.includes('Front')) return 3;
	if (types.includes('Back')) return 4;
	return 0;
}

function addNewImages(builder: ID3V24TagBuilder, images: Array<MatchImageNode>): void {
	for (const image of images) {
		if (!image.base64) continue;

		const pictureType = getPictureType(image.image.types);
		builder.addPicture(pictureType, '', image.base64.mimeType, image.base64.base64);
	}
}

function addExistingImages(builder: ID3V24TagBuilder, oldImages: Array<any>): void {
	if (!oldImages) return;

	for (const frame of oldImages) {
		builder.addPicture(
			frame.value.pictureType,
			frame.value.description,
			frame.value.mimeType,
			frame.value.bin
		);
	}
}

function fillMood(builder: ID3V24TagBuilder, match: Matching): void {
	if (match.abdata?.moods && match.abdata.moods.length > 0) {
		builder.mood(match.abdata.moods.join('/'));
	}
}

function fillAcoustID(builder: ID3V24TagBuilder, match: Matching, track: MusicBrainz.ReleaseTrack): void {
	if (match.acoustidEntries && track.recording?.id) {
		const acoustIDEntry = match.acoustidEntries.find(item => item.recordingID === track.recording?.id);
		if (acoustIDEntry) {
			builder.acoustidID(acoustIDEntry.acoustID);
		}
	}
}

export function toID3v24(match: Matching, genres: Array<string>, images: Array<MatchImageNode>): Jam.MediaTagRaw | undefined {
	// lets have more or less the same mapping as https://picard.musicbrainz.org/docs/mappings/
	if (!match.mbTrack) {
		return;
	}
	const track = match.mbTrack;
	const release = match.mbRelease;
	const group = match.mbGroup;
	const media = match.mbMedia;
	const builder = new ID3V24TagBuilder();
	fillCommon(builder, match, track, release, group, media);
	fillTypes(builder, match, track, release);
	fillGenres(builder, match, genres);
	fillImages(builder, match, images);
	fillMood(builder, match);
	fillAcoustID(builder, match, track);
	if (match.lyrics) {
		builder.lyrics(match.lyrics.lyrics);
	}

	// TODO: add more tag frames
	// addFrame('TKEY',release.Initialkey ?);
	// addFrame('TCOP',release.copyright ?);
	// addFrame('TBPM',release.bmp ?);
	// addFrame('TIT3',release.subtitle ?);
	// addFrame('TIT1',release.grouping ?);
	// addFrame('TCOM',release.composer.name ?);
	// addFrame('TSOC',release.composer.sortName ?);
	// addFrame('TEXT',release.lyricist.name ?);
	// addFrame('WOAR',release.artist.website ?);
	// addFrame('TPE3',release.conductor ?);
	// addFrame('TPE4',release.remixer ?);
	// addFrame('MCDI',release.music_cd_id ?);
	// addFrame('TSRC',release.isrc ?);
	// addFrame('TMCL',release.performer ?);
	// addFrame('TIPL',release.arranger,engineer,producer,DJ-mix,mix ?);
	// addTXXXFrame('MusicBrainz Work Id', );
	// addTXXXFrame('MusicBrainz TRM Id', '');
	// addTXXXFrame('MusicBrainz Disc Id', '');
	return {version: 4, frames: builder.buildFrames()};
}
