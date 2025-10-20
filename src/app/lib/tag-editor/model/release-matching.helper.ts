/* eslint-disable max-classes-per-file */
import type { Jam, LastFM, LyricsOVHResponse, MusicBrainz } from '@jam';
import type { AcoustIDEntry } from './acoustid.helper';
import { findTrackNr, fuzzyMatch, stripExtension } from './utils';

export interface Matching {
	track: Jam.Track;
	mbTrack?: MusicBrainz.ReleaseTrack;
	mbMedia?: MusicBrainz.ReleaseMedia;
	mbRelease?: MusicBrainz.Release;
	mbGroup?: MusicBrainz.ReleaseGroup;
	lastfm?: LastFM.Album;
	genres?: Array<string>;
	lyrics?: LyricsOVHResponse;
	abdata?: ABData;
	acoustidEntries?: Array<AcoustIDEntry>;
}

export interface Score {
	name: string;
	score: number;
	weight: number;
}

export interface ABData {
	tonal?: Array<string>;
	moods?: Array<string>;
	genres?: Array<string>;
	other?: Array<string>;
}

export interface MBTrackMatching {
	match: Matching;
	score: number;
	scores: Array<Score>;
}

function weightedMean(scores: Array<Score>): number {
	const result = scores.map(value =>
		[value.score * value.weight, value.weight]).reduce((p, c) =>
		[p[0] + c[0], p[1] + c[1]], [0, 0]);
	return result[0] / result[1];
}

function slugify(title: string): string {
	return title.replaceAll(/[ .\-()[\]]/g, '').toLowerCase();
}

export class MatchingTrack {
	currentMatch?: MBTrackMatching;
	matchings: Array<MBTrackMatching> = [];
	abData?: ABData;

	constructor(public mbTrack: MusicBrainz.ReleaseTrack, allMatchings: Array<Matching>, public index: number) {
		this.matchings = this.createMatchingScores(allMatchings);
		this.currentMatch = this.matchings[0];
	}

	private createMatchingScores(allMatchings: Array<Matching>): Array<MBTrackMatching> {
		let result: Array<MBTrackMatching> = [];
		for (const [i, match] of allMatchings.entries()) {
			const matching: MBTrackMatching = {
				match,
				score: 0,
				scores: this.createScores(match, i)
			};
			matching.score = weightedMean(matching.scores);
			result.push(matching);
		}
		result = result
			.filter(a => a.score > 0)
			.toSorted((a, b) => b.score - a.score);
		return result;
	}

	private createScores(match: Matching, matchIndex: number): Array<Score> {
		const scores: Array<Score> = [];
		this.scoreTitle(match, scores);
		this.scoreTrackNr(match, scores);
		this.scoreDuration(match, scores);
		this.scoreAcoustid(match, scores);
		scores.push({ name: 'index', score: matchIndex === this.index ? 1 : 0, weight: 0.1 });
		return scores;
	}

	private scoreAcoustid(match: Matching, scores: Array<Score>): void {
		if (match.acoustidEntries && this.mbTrack.recording?.id) {
			const id = this.mbTrack.recording.id;
			const acoustIDEntry = match.acoustidEntries.find(item => item.recordingID === id);
			if (acoustIDEntry) {
				scores.push({ name: 'acoustid', score: acoustIDEntry.score, weight: 1 });
			}
		}
	}

	private scoreDuration(match: Matching, scores: Array<Score>): void {
		if (this.mbTrack.length) {
			const lengthDiff = Math.abs((Math.round(match.track.duration || 0) * 1000) - (this.mbTrack.length || 0));
			let durationScore = 0;
			if (lengthDiff === 0) {
				durationScore = 1;
			} else if (lengthDiff < 1000) {
				durationScore = 0.8;
			} else if (lengthDiff < 10_000) {
				durationScore = 0.2;
			}
			scores.push({ name: 'duration', score: durationScore, weight: 0.2 });
		}
	}

	private scoreTrackNr(match: Matching, scores: Array<Score>): void {
		const trackNr = match.track.tag?.trackNr ?? findTrackNr(match.track.name);
		if (trackNr > 0) {
			scores.push({ name: 'trackNr', score: (trackNr === this.mbTrack.position) ? 1 : 0, weight: 0.2 });
		}
	}

	private scoreTitle(match: Matching, scores: Array<Score>): void {
		const title = match.track.tag?.title ?? stripExtension(match.track.name);
		if (title && title.trim().length > 0) {
			const toSlug = this.mbTrack.title.length > 0 ? this.mbTrack.title : (this.mbTrack.recording?.title ?? 'Unknown');
			const titles = [slugify(toSlug)];
			const list = this.mbTrack.recording?.aliases ?? [];
			for (const alias of list) {
				const aliasTitle = slugify(alias.name);
				titles.push(aliasTitle);
			}
			const scoredTitles = titles.map(t =>
				({ title: t, score: fuzzyMatch(title, t) })).toSorted((a, b) => b.score - a.score);
			if (scoredTitles.length > 0) {
				scores.push({ name: 'title', score: scoredTitles[0].score, weight: 1 });
			}
		}
	}
}

function buildSortDate(s?: string): number {
	const parts = (s ?? '').split('-');
	return (new Date(parts[0] ? Number(parts[0]) : 9999, parts[1] ? Number(parts[1]) : 12, parts[2] ? Number(parts[2]) : 31)).valueOf();
}

export class MatchMedia {
	tracks: Array<MatchingTrack> = [];
	score: number = 0;
	expanded?: boolean;
	complete: boolean = false;

	constructor(public mbMedia: MusicBrainz.ReleaseMedia, allMatchings: Array<Matching>, trackStartIndex: number) {
		this.tracks = (mbMedia.tracks ?? []).map((track, i) =>
			new MatchingTrack(track, allMatchings, (trackStartIndex + i)));
	}

	updateScore(): void {
		this.score = 0;
		this.complete = this.tracks.length > 0;
		for (const track of this.tracks) {
			if (track.currentMatch) {
				this.score += track.currentMatch.score;
			} else {
				this.complete = false;
			}
		}
		if (this.tracks.length > 0) {
			this.score = this.score / this.tracks.length;
		} else {
			this.complete = false;
		}
	}
}

export class MatchRelease {
	media: Array<MatchMedia> = [];
	score: number = 0;
	loaded: boolean = false;
	isLoading: boolean = false;
	sortDate: number = 0;
	totalTrack?: number = 0;
	expanded?: boolean;
	complete?: boolean;

	constructor(public mbRelease: MusicBrainz.Release) {
		this.sortDate = buildSortDate(mbRelease.date);
		this.totalTrack = this.mbRelease.media.reduce((a, b) => a + b.trackCount, 0);
	}

	updateScore(): void {
		this.score = 0;
		this.complete = this.media.length > 0;
		for (const media of this.media) {
			media.updateScore();
			this.score = Math.max(media.score, this.score);
			if (!media.complete) {
				this.complete = false;
			}
		}
	}

	setLookupRelease(release: MusicBrainz.Release, allMatchings: Array<Matching>): void {
		this.mbRelease = release;
		this.totalTrack = this.mbRelease.media.reduce((a, b) => a + b.trackCount, 0);
		let trackIndex = 0;
		this.media = release.media.map(media => {
			const result = new MatchMedia(media, allMatchings, trackIndex);
			trackIndex += media.trackCount;
			return result;
		});
		this.cleanDuplicateMatchings();
		this.updateScore();
	}

	cleanDuplicateMatchings(): void {
		const matchings: { [id: string]: Array<MatchingTrack> } = {};
		for (const media of this.media) {
			for (const track of media.tracks) {
				if (track.currentMatch) {
					matchings[track.currentMatch.match.track.id] = matchings[track.currentMatch.match.track.id] ?? [];
					matchings[track.currentMatch.match.track.id].push(track);
				}
			}
		}
		for (const key of Object.keys(matchings)) {
			let tracks = matchings[key];
			if (tracks.length > 1) {
				tracks = tracks.toSorted((a, b) => (b.currentMatch?.score ?? 0) - (a.currentMatch?.score ?? 0));
				tracks.shift();
				for (const track of tracks) {
					track.currentMatch = undefined;
				}
			}
		}
	}
}

export class MatchReleaseGroup {
	releases: Array<MatchRelease> = [];
	score: number = 0;
	expanded?: boolean;
	selecting?: boolean;
	currentRelease?: MatchRelease;

	constructor(public mbGroup: MusicBrainz.ReleaseGroup) {
		for (const release of (mbGroup.releases ?? [])) {
			this.releases.push(new MatchRelease(release));
		}
		this.releases = this.releases.toSorted((a, b) => a.sortDate - b.sortDate);
	}

	findRelease(releaseID: string): MatchRelease | undefined {
		return this.releases.find(g => g.mbRelease.id === releaseID);
	}

	updateScore(): void {
		for (const release of this.releases) {
			release.updateScore();
		}
		this.score = this.currentRelease ? this.currentRelease.score : 0;
	}

	enough(matchTrackCount: number): boolean {
		return !!(this.currentRelease?.totalTrack === matchTrackCount && this.currentRelease.complete);
	}
}

export class MatchTree {
	groups: Array<MatchReleaseGroup> = [];

	enough(matchTrackCount: number): boolean {
		return this.groups.some(group => group.enough(matchTrackCount));
	}

	addReleaseGroup(releasegroup: MusicBrainz.ReleaseGroup): MatchReleaseGroup {
		const rg = new MatchReleaseGroup(releasegroup);
		this.groups.push(rg);
		return rg;
	}

	findReleaseGroup(releasegroupID: string): MatchReleaseGroup | undefined {
		return this.groups.find(g => g.mbGroup.id === releasegroupID);
	}

	sort(): void {
		for (const group of this.groups) {
			group.updateScore();
		}
		this.groups = this.groups.toSorted((a, b) => b.score - a.score);
	}
}
