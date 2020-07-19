// @generated
// This file was automatically generated and should not be edited.

import {Injectable} from '@angular/core';

import {JamBaseService} from '../jam.base.service';
import {Jam} from '../model/jam-rest-data';
import {JamParameters} from '../model/jam-rest-params';

@Injectable()
export class JamMetaDataService {

	constructor(private base: JamBaseService) {
	}

	/**
	 * Lookup LastFM data // Rights needed: stream
	 */
	async lastfmLookup(params: JamParameters.LastFMLookupArgs): Promise<Jam.MetaDataResult> {
		return this.base.requestData<Jam.MetaDataResult>('/metadata/lastfm/lookup', params);
	}

	/**
	 * Search Lyrics.ovh data // Rights needed: stream
	 */
	async lyricsovhSearch(params: JamParameters.LyricsOVHSearchArgs): Promise<Jam.MetaDataResult> {
		return this.base.requestData<Jam.MetaDataResult>('/metadata/lyricsovh/search', params);
	}

	/**
	 * Lookup AcoustId data // Rights needed: stream
	 */
	async acoustidLookup(params: JamParameters.AcoustidLookupArgs): Promise<Jam.MetaDataResult> {
		return this.base.requestData<Jam.MetaDataResult>('/metadata/acoustid/lookup', params);
	}

	/**
	 * Lookup MusicBrainz data // Rights needed: stream
	 */
	async musicbrainzLookup(params: JamParameters.MusicBrainzLookupArgs): Promise<Jam.MetaDataResult> {
		return this.base.requestData<Jam.MetaDataResult>('/metadata/musicbrainz/lookup', params);
	}

	/**
	 * Search MusicBrainz data // Rights needed: stream
	 */
	async musicbrainzSearch(params: JamParameters.MusicBrainzSearchArgs): Promise<Jam.MetaDataResult> {
		return this.base.requestData<Jam.MetaDataResult>('/metadata/musicbrainz/search', params);
	}

	/**
	 * Lookup AcousticBrainz data // Rights needed: stream
	 */
	async acousticbrainzLookup(params: JamParameters.AcousticBrainzLookupArgs): Promise<Jam.MetaDataResult> {
		return this.base.requestData<Jam.MetaDataResult>('/metadata/acousticbrainz/lookup', params);
	}

	/**
	 * Lookup CoverArtArchive data // Rights needed: stream
	 */
	async coverartarchiveLookup(params: JamParameters.CoverArtArchiveLookupArgs): Promise<Jam.MetaDataResult> {
		return this.base.requestData<Jam.MetaDataResult>('/metadata/coverartarchive/lookup', params);
	}

	/**
	 * Search Wikipedia Summary data // Rights needed: stream
	 */
	async wikipediaSummarySearch(params: JamParameters.WikipediaSummaryArgs): Promise<Jam.MetaDataResult> {
		return this.base.requestData<Jam.MetaDataResult>('/metadata/wikipedia/summary', params);
	}

	/**
	 * Search WikiData summary data // Rights needed: stream
	 */
	async wikidataSummarySearch(params: JamParameters.WikidataSummaryArgs): Promise<Jam.MetaDataResult> {
		return this.base.requestData<Jam.MetaDataResult>('/metadata/wikidata/summary', params);
	}

	/**
	 * Lookup WikiData summary data // Rights needed: stream
	 */
	async wikidataLookup(params: JamParameters.WikidataLookupArgs): Promise<Jam.MetaDataResult> {
		return this.base.requestData<Jam.MetaDataResult>('/metadata/wikidata/lookup', params);
	}

}