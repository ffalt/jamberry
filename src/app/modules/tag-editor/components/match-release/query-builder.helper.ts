import type {Matching} from '@app/modules/tag-editor/model/release-matching.helper';
import {stripExtension} from '@app/modules/tag-editor/model/utils';
import {type Jam, type JamParameters, MusicBrainzSearchType} from '@jam';

/**
 * Class representing a MusicBrainz search query
 */
export class MusicbrainzSearchQuery {
	id: string;
	name: string;
	matchings: Array<Matching> = [];

	constructor(public q: JamParameters.MusicBrainzSearchArgs) {
		this.id = `musicbrainz-${JSON.stringify(q)}`;
		const searchFields = Object.keys(q)
			.filter(key => key !== 'type')
			.map(key => `${key}: "${(q as any)[key]}"`)
			.join(', ');
		this.name = `MusicBrainz Search for ${searchFields}`;
	}
}

/**
 * Helper class for building MusicBrainz search queries
 */
export class QueryBuilderHelper {
	/**
	 * Clean album name by removing parentheses and brackets
	 */
	static cleanAlbumName(s: string): string {
		let i = s.indexOf('(');
		let result = s;
		if (i > 1) {
			result = result.slice(0, i);
		}
		i = result.indexOf('[');
		if (i > 1) {
			result = result.slice(0, i);
		}
		result = result.trim();
		if (result.length === 0) {
			return s;
		}
		return result;
	}

	/**
	 * Build quick queries based on album and artist information
	 */
	static buildQuickQueries(matchings: Array<Matching>, folder?: Jam.Folder): Array<MusicbrainzSearchQuery> {
		const queries: Array<MusicbrainzSearchQuery> = [];
		const albums: Array<string> = [];
		const artists: Array<string> = [];

		for (const match of matchings) {
			if (match.track.tag?.album) {
				const s = QueryBuilderHelper.cleanAlbumName(match.track.tag.album);
				if (match.track.tag.album && !albums.includes(s)) {
					albums.push(s);
				}
				if (match.track.tag.artist && !artists.includes(match.track.tag.artist)) {
					artists.push(match.track.tag.artist);
				}
			}
		}

		if (albums.length === 1) {
			queries.push(new MusicbrainzSearchQuery({
				type: MusicBrainzSearchType.releaseGroup,
				releasegroup: albums[0],
				artist: artists.length > 0 ? artists[0] : undefined
			}));
		}

		if (folder?.tag) {
			queries.push(new MusicbrainzSearchQuery({
				type: MusicBrainzSearchType.releaseGroup,
				releasegroup: folder.name,
				artist: folder.tag.artist
			}));
		}

		return queries;
	}

	/**
	 * Build comprehensive queries for searching MusicBrainz
	 */
	static buildQueries(matchings: Array<Matching>): Array<MusicbrainzSearchQuery> {
		const queries: Array<MusicbrainzSearchQuery> = [];
		const matchingsLength = matchings.length;

		// Process each matching to build various query types
		for (const match of matchings) {
			// Add release group queries
			QueryBuilderHelper.addReleaseGroupQueries(queries, match, matchingsLength);

			// Add release queries
			QueryBuilderHelper.addReleaseQueries(queries, match, matchingsLength);

			// Add recording queries
			QueryBuilderHelper.addRecordingQueries(queries, match, matchingsLength);
		}

		return queries;
	}

	/**
	 * Helper method to add a query to the list, avoiding duplicates
	 */
	private static addQuery(queries: Array<MusicbrainzSearchQuery>, q: MusicbrainzSearchQuery, match: Matching): void {
		const samequery = queries.find(qu => qu.id === q.id);
		if (samequery) {
			samequery.matchings.push(match);
			return;
		}
		q.matchings.push(match);
		queries.push(q);
	}

	/**
	 * Helper method to create and add a MusicBrainz query
	 */
	private static addMBQuery(
		queries: Array<MusicbrainzSearchQuery>,
		fields: JamParameters.MusicBrainzSearchArgs,
		match: Matching,
		matchingsLength: number,
		trackslength?: boolean
	): void {
		const q: JamParameters.MusicBrainzSearchArgs = {type: fields.type};

		// Validate and clean field values
		for (const key of Object.keys(fields)) {
			const val = (fields as any)[key];
			if ((val === undefined) || (val === '') || (val.toString().trim() === '')) {
				// if one is invalid, don't add
				return;
			}
			const parts = val.toString().split('(');
			if (parts.length > 0) {
				(q as any)[key] = parts[0];
			}
		}

		if (trackslength) {
			q.tracks = matchingsLength;
		}

		QueryBuilderHelper.addQuery(queries, new MusicbrainzSearchQuery(q), match);
	}

	/**
	 * Get the track title or name without extension
	 */
	private static getTrackTitle(match: Matching): string {
		return match.track.tag?.title || stripExtension(match.track.name);
	}

	/**
	 * Add release group queries for a match
	 */
	private static addReleaseGroupQueries(
		queries: Array<MusicbrainzSearchQuery>,
		match: Matching,
		matchingsLength: number
	): void {
		// Full release group query with artist
		QueryBuilderHelper.addMBQuery(
			queries,
			{
				type: MusicBrainzSearchType.releaseGroup,
				releasegroup: match.track.tag?.album,
				artist: match.track.tag?.artist
			},
			match,
			matchingsLength
		);

		// Fuzzy release group query (just album)
		QueryBuilderHelper.addMBQuery(
			queries,
			{
				type: MusicBrainzSearchType.releaseGroup,
				releasegroup: match.track.tag?.album
			},
			match,
			matchingsLength
		);
	}

	/**
	 * Add release queries for a match
	 */
	private static addReleaseQueries(
		queries: Array<MusicbrainzSearchQuery>,
		match: Matching,
		matchingsLength: number
	): void {
		// Full release query with artist and track length
		QueryBuilderHelper.addMBQuery(
			queries,
			{
				type: MusicBrainzSearchType.release,
				release: match.track.tag?.album,
				artist: match.track.tag?.artist
			},
			match,
			matchingsLength,
			true
		);

		// Full release query with artist without track length
		QueryBuilderHelper.addMBQuery(
			queries,
			{
				type: MusicBrainzSearchType.release,
				release: match.track.tag?.album,
				artist: match.track.tag?.artist
			},
			match,
			matchingsLength
		);

		// Fuzzy release query (just album) with track length
		QueryBuilderHelper.addMBQuery(
			queries,
			{
				type: MusicBrainzSearchType.release,
				release: match.track.tag?.album
			},
			match,
			matchingsLength,
			true
		);

		// Fuzzy release query (just album) without track length
		QueryBuilderHelper.addMBQuery(
			queries,
			{
				type: MusicBrainzSearchType.release,
				release: match.track.tag?.album
			},
			match,
			matchingsLength
		);
	}

	/**
	 * Add recording queries for a match
	 */
	private static addRecordingQueries(
		queries: Array<MusicbrainzSearchQuery>,
		match: Matching,
		matchingsLength: number
	): void {
		const title = QueryBuilderHelper.getTrackTitle(match);

		// Full recording query with title, release, and artist
		QueryBuilderHelper.addMBQuery(
			queries,
			{
				type: MusicBrainzSearchType.recording,
				recording: title,
				release: match.track.tag?.album,
				artist: match.track.tag?.artist
			},
			match,
			matchingsLength
		);

		// Fuzzy recording query with title and release
		QueryBuilderHelper.addMBQuery(
			queries,
			{
				type: MusicBrainzSearchType.recording,
				recording: title,
				release: match.track.tag?.album
			},
			match,
			matchingsLength
		);

		// Fuzzy recording query with title and artist
		QueryBuilderHelper.addMBQuery(
			queries,
			{
				type: MusicBrainzSearchType.recording,
				recording: title,
				artist: match.track.tag?.artist
			},
			match,
			matchingsLength
		);

		// Fuzziest recording query (just title)
		QueryBuilderHelper.addMBQuery(
			queries,
			{
				type: MusicBrainzSearchType.recording,
				recording: title
			},
			match,
			matchingsLength
		);
	}
}
