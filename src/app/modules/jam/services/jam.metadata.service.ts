// @generated
// This file was automatically generated and should not be edited.

import { inject, Injectable } from '@angular/core';

import { JamBaseService } from '../jam.base.service';
import type { Jam } from '../model/jam-rest-data';
import type { JamParameters } from '../model/jam-rest-params';

@Injectable()
export class JamMetaDataService {
	private readonly base = inject(JamBaseService);

	/**
	 * Lookup LastFM data // Rights needed: stream
	 */
	async lastfmLookup(parameters: JamParameters.LastFMLookupParameters): Promise<Jam.MetaDataResult> {
		return this.base.requestData<Jam.MetaDataResult>('/metadata/lastfm/lookup', parameters);
	}

	/**
	 * Search Lyrics.ovh data // Rights needed: stream
	 */
	async lyricsovhSearch(parameters: JamParameters.LyricsOVHSearchParameters): Promise<Jam.MetaDataTrackLyricsResult> {
		return this.base.requestData<Jam.MetaDataTrackLyricsResult>('/metadata/lyricsovh/search', parameters);
	}

	/**
	 * Get Lrclib.net data // Rights needed: stream
	 */
	async lcrlibSearch(parameters: JamParameters.LrclibSearchParameters): Promise<Jam.MetaDataResult> {
		return this.base.requestData<Jam.MetaDataResult>('/metadata/lrclib/get', parameters);
	}

	/**
	 * Lookup AcoustId data // Rights needed: stream
	 */
	async acoustidLookup(parameters: JamParameters.AcoustidLookupParameters): Promise<Jam.MetaDataResult> {
		return this.base.requestData<Jam.MetaDataResult>('/metadata/acoustid/lookup', parameters);
	}

	/**
	 * Lookup MusicBrainz data // Rights needed: stream
	 */
	async musicbrainzLookup(parameters: JamParameters.MusicBrainzLookupParameters): Promise<Jam.MetaDataResult> {
		return this.base.requestData<Jam.MetaDataResult>('/metadata/musicbrainz/lookup', parameters);
	}

	/**
	 * Search MusicBrainz data // Rights needed: stream
	 */
	async musicbrainzSearch(parameters: JamParameters.MusicBrainzSearchParameters): Promise<Jam.MetaDataResult> {
		return this.base.requestData<Jam.MetaDataResult>('/metadata/musicbrainz/search', parameters);
	}

	/**
	 * Lookup AcousticBrainz data // Rights needed: stream
	 */
	async acousticbrainzLookup(parameters: JamParameters.AcousticBrainzLookupParameters): Promise<Jam.MetaDataResult> {
		return this.base.requestData<Jam.MetaDataResult>('/metadata/acousticbrainz/lookup', parameters);
	}

	/**
	 * Lookup CoverArtArchive data // Rights needed: stream
	 */
	async coverartarchiveLookup(parameters: JamParameters.CoverArtArchiveLookupParameters): Promise<Jam.MetaDataResult> {
		return this.base.requestData<Jam.MetaDataResult>('/metadata/coverartarchive/lookup', parameters);
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
	async wikipediaSummarySearch(parameters: JamParameters.WikipediaSummaryParameters): Promise<Jam.MetaDataResult> {
		return this.base.requestData<Jam.MetaDataResult>('/metadata/wikipedia/summary', parameters);
	}

	/**
	 * Search WikiData summary data // Rights needed: stream
	 */
	async wikidataSummarySearch(parameters: JamParameters.WikidataSummaryParameters): Promise<Jam.MetaDataResult> {
		return this.base.requestData<Jam.MetaDataResult>('/metadata/wikidata/summary', parameters);
	}

	/**
	 * Lookup WikiData summary data // Rights needed: stream
	 */
	async wikidataLookup(parameters: JamParameters.WikidataLookupParameters): Promise<Jam.MetaDataResult> {
		return this.base.requestData<Jam.MetaDataResult>('/metadata/wikidata/lookup', parameters);
	}
}
