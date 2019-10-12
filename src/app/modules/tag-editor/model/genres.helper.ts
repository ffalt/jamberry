import {LastFM} from '@jam';
import {Genres, GenresByNumbers} from './genres.consts';

let GenresSlugs: { [slug: string]: string }; // will be build on first use

function slugify(genre: string): string {
	return genre.replace(/[& \-.]/g, '').toLowerCase();
}

export function getKnownGenre(genre: string): string | undefined {
	const slug = slugify(genre);
	if (!GenresSlugs) {
		GenresSlugs = {};
		Genres.forEach(g => {
			GenresSlugs[slugify(g)] = g;
		});
	}
	return GenresSlugs[slug];
}

export function cleanGenre(genre: string): string {
	const results: Array<string> = [];
	const parts = genre.split('/');
	parts.forEach((part: string) => {
		// test for (number)
		let value = part.trim();
		const numpart = /\((\d+)\)/.exec(value);
		let num: number | undefined;
		if (numpart) {
			num = parseInt(numpart[1], 10);
			value = value.slice(0, numpart.index) + value.slice(numpart.index + numpart[0].length);
		}
		if (value.length === 0 && (num !== undefined)) {
			const s = GenresByNumbers[num];
			if (s) {
				value = s;
			}
		}
		if (value.length > 0) {
			const slug = slugify(value);
			let result: string | undefined;
			if (!GenresSlugs) {
				GenresSlugs = {};
				Genres.forEach(g => {
					GenresSlugs[slugify(g)] = g;
				});
			}
			if (GenresSlugs && GenresSlugs[slug]) {
				result = GenresSlugs[slug];
			}
			if (!result && value.includes(' & ')) {
				const subParts = value.split('&');
				subParts.forEach(sub => {
					const cleanSub = cleanGenre(sub);
					if (!results.includes(cleanSub)) {
						results.push(cleanSub);
					}
				});
			} else if (result) {
				if (!results.includes(result)) {
					results.push(result);
				}
			} else {
				if (!results.includes(value)) {
					results.push(value);
				}
			}
		}
	});
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

export function getTrackGenres(tags: Array<{ count: number; name: string; }>): Array<GenreTag> {
	if (!tags || !tags.length) {
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

export function getMusicBrainzGenres(tags: Array<{ count: number; name: string; }>): Array<GenreTag> {
	if (!tags || !tags.length) {
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
	if (!album) {
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
