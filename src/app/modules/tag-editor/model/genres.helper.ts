import type {LastFM} from '@jam';
import {Genres, GenresByNumbers} from './genres.consts';

let GenresSlugs: { [slug: string]: string }; // will be build on first use

function slugify(genre: string): string {
	return genre.replace(/[& \-.]/g, '').toLowerCase();
}

export function getKnownGenre(genre: string): string | undefined {
	const slug = slugify(genre);
	if (!GenresSlugs) {
		GenresSlugs = {};
		for (const g of Genres) {
			GenresSlugs[slugify(g)] = g;
		}
	}
	return GenresSlugs[slug];
}

function extractNumberAndCleanValue(text: string): { value: string; num?: number } {
	let value = text.trim();
	let num: number | undefined;

	const numpart = /\((\d+)\)/.exec(value);
	if (numpart) {
		num = Number.parseInt(numpart[1], 10);
		value = value.slice(0, numpart.index) + value.slice(numpart.index + numpart[0].length);
	}

	return {value: value.trim(), num};
}

function getGenreFromNumber(currentValue: string, num?: number): string {
	if (currentValue.length === 0 && num !== undefined) {
		const genreName = GenresByNumbers[num];
		return genreName || currentValue;
	}
	return currentValue;
}

export function cleanGenre(genre: string): string {
	const results: Array<string> = [];
	const parts = genre.split('/');

	const addUniqueResult = (value: string): void => {
		if (value.length > 0 && !results.includes(value)) {
			results.push(value);
		}
	};

	const processSubGenres = (text: string): void => {
		const subParts = text.split('&');
		for (const sub of subParts) {
			const cleanSub = cleanGenre(sub);
			addUniqueResult(cleanSub);
		}
	};

	for (const part of parts) {
		// Extract number and clean the value
		const {value, num} = extractNumberAndCleanValue(part);

		// Try to get genre name from number if value is empty
		const processedValue = getGenreFromNumber(value, num);

		if (processedValue.length > 0) {
			// Check if it's a known genre
			const knownGenre = getKnownGenre(processedValue);

			if (!knownGenre && processedValue.includes(' & ')) {
				// Process sub-genres separated by &
				processSubGenres(processedValue);
			} else if (knownGenre) {
				// Add known genre to results
				addUniqueResult(knownGenre);
			} else {
				// Add the processed value as is
				addUniqueResult(processedValue);
			}
		}
	}

	return results.join(' / ');
}

export interface GenreTag {
	name: string;
	count: number;
}

export function mergeGenres(tags: Array<GenreTag>, other: Array<GenreTag>): Array<GenreTag> {
	const result = tags.slice(0);
	for (const tag of other) {
		const t2 = result.find(r => r.name === tag.name);
		if (t2) {
			t2.count += tag.count;
		} else {
			result.push(tag);
		}
	}
	return result;
}

export function getTrackGenres(tags: Array<{ count: number; name: string }>): Array<GenreTag> {
	if (!tags?.length) {
		return [];
	}
	const result: Array<GenreTag> = [];
	for (const tag of tags) {
		const sl = tag.name.split('/').map(s => s.trim()).filter(s => s.length > 0);
		for (const s of sl) {
			const genre = getKnownGenre(s);
			if (genre) {
				const t2 = result.find(r => r.name === genre);
				if (t2) {
					t2.count += tag.count;
				} else {
					result.push({name: genre, count: tag.count});
				}
			}
		}
	}
	return result.sort((a, b) => b.count - a.count);
}

export function getMusicBrainzGenres(tags: Array<{ count: number; name: string }>): Array<GenreTag> {
	if (!tags?.length) {
		return [];
	}
	const result: Array<GenreTag> = [];
	for (const tag of tags) {
		const sl = tag.name.split(';').map(s => s.trim()).filter(s => s.length > 0);
		for (const s of sl) {
			const genre = getKnownGenre(s);
			if (genre) {
				const t2 = result.find(r => r.name === genre);
				if (t2) {
					t2.count += tag.count;
				} else {
					result.push({name: genre, count: tag.count});
				}
			}
		}
	}
	return result.sort((a, b) => b.count - a.count);
}

function getLastFMGenres(tags: Array<LastFM.Tag>): Array<GenreTag> {
	if (!tags) {
		return [];
	}
	const result: Array<GenreTag> = [];
	for (const tag of tags) {
		const genre = getKnownGenre(tag.name);
		if (genre) {
			const t2 = result.find(r => r.name === genre);
			if (t2) {
				t2.count += 1;
			} else {
				result.push({name: genre, count: 1});
			}
		}
	}
	return result;
}

export function getLastFMAlbumGenres(album: LastFM.Album): Array<GenreTag> {
	if (!album.tags) {
		return [];
	}
	return getLastFMGenres(album.tags);
}

export function getLastFMArtistGenres(artist: LastFM.Artist): Array<GenreTag> {
	if (!artist) {
		return [];
	}
	return getLastFMGenres(artist.tags);
}
