// @generated
// This file was automatically generated and should not be edited.

import { inject, Injectable } from '@angular/core';

import { JamBaseService } from '../jam.base.service';
import type { Jam } from '../model/jam-rest-data';
import type { JamParameters } from '../model/jam-rest-params';

@Injectable()
export class JamMetadataService {
	private readonly base = inject(JamBaseService);

	/**
	 * Lookup LastFM data // Rights needed: stream
	 */
	async lastfmLookup(parameters: JamParameters.LastFMLookupParameters): Promise<Jam.MetadataResult> {
		return this.base.requestData<Jam.MetadataResult>('/metadata/lastfm/lookup', parameters);
	}

	/**
	 * Search Lyrics.ovh data // Rights needed: stream
	 */
	async lyricsovhSearch(parameters: JamParameters.LyricsOVHSearchParameters): Promise<Jam.MetadataTrackLyricsResult> {
		return this.base.requestData<Jam.MetadataTrackLyricsResult>('/metadata/lyricsovh/search', parameters);
	}

	/**
	 * Get Lrclib.net data // Rights needed: stream
	 */
	async lcrlibSearch(parameters: JamParameters.LrclibSearchParameters): Promise<Jam.MetadataResult> {
		return this.base.requestData<Jam.MetadataResult>('/metadata/lrclib/get', parameters);
	}

	/**
	 * Lookup AcoustId data // Rights needed: stream
	 */
	async acoustidLookup(parameters: JamParameters.AcoustidLookupParameters): Promise<Jam.MetadataResult> {
		return this.base.requestData<Jam.MetadataResult>('/metadata/acoustid/lookup', parameters);
	}

	/**
	 * Lookup MusicBrainz data // Rights needed: stream
	 */
	async musicbrainzLookup(parameters: JamParameters.MusicBrainzLookupParameters): Promise<Jam.MetadataResult> {
		return this.base.requestData<Jam.MetadataResult>('/metadata/musicbrainz/lookup', parameters);
	}

	/**
	 * Search MusicBrainz data // Rights needed: stream
	 */
	async musicbrainzSearch(parameters: JamParameters.MusicBrainzSearchParameters): Promise<Jam.MetadataResult> {
		return this.base.requestData<Jam.MetadataResult>('/metadata/musicbrainz/search', parameters);
	}

	/**
	 * Lookup AcousticBrainz data // Rights needed: stream
	 */
	async acousticbrainzLookup(parameters: JamParameters.AcousticBrainzLookupParameters): Promise<Jam.MetadataResult> {
		return this.base.requestData<Jam.MetadataResult>('/metadata/acousticbrainz/lookup', parameters);
	}

	/**
	 * Lookup CoverArtArchive data // Rights needed: stream
	 */
	async coverartarchiveLookup(parameters: JamParameters.CoverArtArchiveLookupParameters): Promise<Jam.MetadataResult> {
		return this.base.requestData<Jam.MetadataResult>('/metadata/coverartarchive/lookup', parameters);
	}

	/**
	 * Get CoverArtArchive image // Rights needed: stream
	 */
	coverartarchiveImageUrl(params: JamParameters.CoverArtArchiveImageParameters): string {
		return this.base.buildRequestUrl('/metadata/coverartarchive/image', params);
	}

	/**
	 * Get CoverArtArchive image // Rights needed: stream
	 */
	async coverartarchiveImageBinary(params: JamParameters.CoverArtArchiveImageParameters): Promise<{ buffer: ArrayBuffer; contentType: string }> {
		return this.base.binary('/metadata/coverartarchive/image', params);
	}

	/**
	 * Search Wikipedia Summary data // Rights needed: stream
	 */
	async wikipediaSummarySearch(parameters: JamParameters.WikipediaSummaryParameters): Promise<Jam.MetadataResult> {
		return this.base.requestData<Jam.MetadataResult>('/metadata/wikipedia/summary', parameters);
	}

	/**
	 * Search WikiData summary data // Rights needed: stream
	 */
	async wikidataSummarySearch(parameters: JamParameters.WikidataSummaryParameters): Promise<Jam.MetadataResult> {
		return this.base.requestData<Jam.MetadataResult>('/metadata/wikidata/summary', parameters);
	}

	/**
	 * Lookup WikiData summary data // Rights needed: stream
	 */
	async wikidataLookup(parameters: JamParameters.WikidataLookupParameters): Promise<Jam.MetadataResult> {
		return this.base.requestData<Jam.MetadataResult>('/metadata/wikidata/lookup', parameters);
	}

	/**
	 * Search Discogs release data // Rights needed: stream
	 */
	async discogsReleaseSearch(parameters: JamParameters.DiscogsSearchParameters): Promise<Jam.MetadataResult> {
		return this.base.requestData<Jam.MetadataResult>('/metadata/discogs/search/release', parameters);
	}

	/**
	 * Search Discogs artist data // Rights needed: stream
	 */
	async discogsArtistSearch(parameters: JamParameters.DiscogsArtistSearchParameters): Promise<Jam.MetadataResult> {
		return this.base.requestData<Jam.MetadataResult>('/metadata/discogs/search/artist', parameters);
	}

	/**
	 * Lookup Discogs release by ID // Rights needed: stream
	 */
	async discogsReleaseLookup(parameters: JamParameters.DiscogsReleaseLookupParameters): Promise<Jam.MetadataResult> {
		return this.base.requestData<Jam.MetadataResult>('/metadata/discogs/release', parameters);
	}

	/**
	 * Lookup Discogs artist by ID // Rights needed: stream
	 */
	async discogsArtistLookup(parameters: JamParameters.DiscogsArtistLookupParameters): Promise<Jam.MetadataResult> {
		return this.base.requestData<Jam.MetadataResult>('/metadata/discogs/artist', parameters);
	}

	/**
	 * Lookup Discogs master release by ID // Rights needed: stream
	 */
	async discogsMasterLookup(parameters: JamParameters.DiscogsMasterLookupParameters): Promise<Jam.MetadataResult> {
		return this.base.requestData<Jam.MetadataResult>('/metadata/discogs/master', parameters);
	}

	/**
	 * Lookup Discogs master release versions by ID // Rights needed: stream
	 */
	async discogsMasterVersionsLookup(parameters: JamParameters.DiscogsMasterLookupParameters): Promise<Jam.MetadataResult> {
		return this.base.requestData<Jam.MetadataResult>('/metadata/discogs/master/versions', parameters);
	}

	/**
	 * Get Discogs image // Rights needed: stream
	 */
	discogsImageUrl(params: JamParameters.DiscogsImageParameters): string {
		return this.base.buildRequestUrl('/metadata/discogs/image', params);
	}

	/**
	 * Get Discogs image // Rights needed: stream
	 */
	async discogsImageBinary(params: JamParameters.DiscogsImageParameters): Promise<{ buffer: ArrayBuffer; contentType: string }> {
		return this.base.binary('/metadata/discogs/image', params);
	}
}
