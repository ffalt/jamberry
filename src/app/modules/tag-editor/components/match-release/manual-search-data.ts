import {Matching} from '@app/modules/tag-editor/model/release-matching.helper';

/**
 * Class to handle manual search data for the Matcher
 */
export class ManualSearchData {
	artists: Array<string> = [];
	albums: Array<string> = [];
	artist: string = '';
	releaseGroup: string = '';

	constructor(private readonly getMatchings: () => Array<Matching>) {
	}

	/**
	 * Get a list of albums for autocomplete
	 */
	getAutoCompleteAlbumList(): Array<string> {
		if (this.albums.length === 0) {
			for (const match of this.getMatchings()) {
				const txt = (match.track?.tag?.album ?? '').trim();
				if (txt.length > 0 && !this.albums.includes(txt)) {
					this.albums.push(txt);
				}
			}
		}
		return this.albums;
	}

	/**
	 * Get a list of artists for autocomplete
	 */
	getAutoCompleteArtistList(): Array<string> {
		if (this.artists.length === 0) {
			for (const match of this.getMatchings()) {
				const txt = (match.track?.tag?.artist ?? '').trim();
				if (txt.length > 0 && !this.artists.includes(txt)) {
					this.artists.push(txt);
				}
			}
		}
		return this.artists;
	}
}
