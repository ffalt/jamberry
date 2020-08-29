import {Jam, MusicBrainz} from '@jam';
import {MatchImageNode} from '../components/match-coverart/match-coverart.component';
import {ID3V24TagBuilder} from './id3v2-builder.helper';
import {Matching} from './release-matching.helper';

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
		const artists = track.artistCredit.map(ac => `${ac.artist.name} ${ac.joinphrase}`).join(' ').replace(/ {2}/g, ' ').trim();
		const sortArtists = track.artistCredit.map(ac =>
			(ac.artist.sortName ? ac.artist.sortName : '').trim()).filter(s => s.length > 0).join(' & ').replace(/ {2}/g, ' ').trim();
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
		types = types.concat(release.releaseGroup.secondaryTypes);
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
		for (const image of images) {
			// export const ID3v2_ValuePicTypes: { [name: string]: string; } = {
			// 	'0': 'Other',
			// 	'1': '32x32 pixels \'file icon\' (PNG only)',
			// 	'2': 'Other file icon',
			// 	'3': 'Cover (front)',
			// 	'4': 'Cover (back)',
			// 	'5': 'Leaflet page',
			// 	'6': 'Media (e.g. lable side of CD)',
			// 	'7': 'Lead artist/lead performer/soloist',
			// 	'8': 'Artist/performer',
			// 	'9': 'Conductor',
			// 	'10': 'Band/Orchestra',
			// 	'11': 'Composer',
			// 	'12': 'Lyricist/text writer',
			// 	'13': 'Recording Location',
			// 	'14': 'During recording',
			// 	'15': 'During performance',
			// 	'16': 'Movie/video screen capture',
			// 	'17': 'A bright coloured fish',
			// 	'18': 'Illustration',
			// 	'19': 'Band/artist logotype',
			// 	'20': 'Publisher/Studio logotype'
			// };
			let pictureType = 0;
			if (image.image.types.includes('Medium')) {
				pictureType = 6;
			} else if (image.image.types.includes('Booklet')) {
				pictureType = 5;
			} else if (image.image.types.includes('Front')) {
				pictureType = 3;
			} else if (image.image.types.includes('Back')) {
				pictureType = 4;
			}
			if (image.base64) {
				builder.addPicture(pictureType, '', image.base64.mimeType, image.base64.base64);
			}
		}
	} else if (match.track.tagRaw) {
		const oldimages = match.track.tagRaw.frames.APIC;
		if (oldimages) {
			for (const f of oldimages) {
				builder.addPicture(f.value.pictureType, f.value.description, f.value.mimeType, f.value.bin);
			}
		}
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
