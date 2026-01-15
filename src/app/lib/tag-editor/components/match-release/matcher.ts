import { type AcoustIDEntry, acoustidResultToList, AcoustidTree } from '../../model/acoustid.helper';
import { type Matching, type MatchingTrack, type MatchRelease, type MatchReleaseGroup, MatchTree } from '../../model/release-matching.helper';
import { type AcousticBrainz, type Acoustid, type Jam, type JamParameters, type JamService, type MusicBrainz, MusicBrainzLookupType, MusicBrainzSearchType } from '@jam';
import { AcousticBrainzHelper } from './acoustic-brainz.helper';
import { ManualSearchData } from './manual-search-data';
import { MusicbrainzSearchQuery, QueryBuilderHelper } from './query-builder.helper';
import { ReleaseLoaderHelper } from './release-loader.helper';
import { RunStrategyHelper } from './run-strategy.helper';
import type { NotifyService } from '@core/services/notify/notify.service';

export enum RunType {
	acoustID,
	musicbrainzRefresh,
	musicbrainzByTags,
	auto
}

export class Matcher {
	isRunning: boolean = false;
	isAborted: boolean = false;
	manual: boolean = false;
	currentAction?: string;
	folder?: Jam.Folder;
	matchings: Array<Matching> = [];
	matchTree = new MatchTree();
	manualSearchData: ManualSearchData;
	private readonly releaseLoader: ReleaseLoaderHelper;

	constructor(private readonly jam: JamService, private readonly notify: NotifyService) {
		this.manualSearchData = new ManualSearchData(() => this.matchings);
		this.releaseLoader = new ReleaseLoaderHelper(
			this.matchTree,
			() => this.shouldStop(),
			async (id: string) => this.addReleaseGroupByID(id),
			async (rg: MatchReleaseGroup) => this.loadBestMatchingCurrentRelease(rg)
		);
	}

	abort() {
		this.matchings = [];
		this.isAborted = true;
	}

	stop(): void {
		if (!this.isRunning) {
			return;
		}
		this.isAborted = true;
	}

	start(type: RunType): void {
		if (this.isRunning) {
			return;
		}
		this.isAborted = false;
		this.isRunning = true;
		this.run(type)
			.then(() => {
				this.matchTree.sort();
				this.isRunning = false;
				this.isAborted = false;
				this.currentAction = '';
			})
			.catch((error: unknown) => {
				this.notify.error(error);
				this.isRunning = false;
				this.isAborted = false;
				this.currentAction = '';
			});
	}

	clear(): void {
		if (this.isRunning) {
			return;
		}
		this.matchTree = new MatchTree();
	}

	manualSearch(): void {
		if (this.isRunning) {
			return;
		}
		this.isAborted = false;
		this.isRunning = true;
		this.searchManual()
			.then(() => {
				this.isRunning = false;
				this.isAborted = false;
				this.currentAction = '';
			})
			.catch((error: unknown) => {
				this.notify.error(error);
				this.isRunning = false;
				this.isAborted = false;
				this.currentAction = '';
			});
	}

	prepare(items: Array<Matching>, folder?: Jam.Folder): void {
		this.matchings = items;
		this.folder = folder;
		if (!this.isRunning) {
			this.isAborted = false;
		}
	}

	selectMatch(id: string, group: MatchReleaseGroup, release: MatchRelease, track: MatchingTrack) {
		const match = this.matchings.find(m => m.track.id === id);
		if (!match) {
			return;
		}
		let matching = track.matchings.find(m => m.match.track.id === id);
		if (!matching) {
			matching = { match, score: 1, scores: [] };
			track.matchings.push(matching);
		}
		matching.score = 1;
		if (!matching.scores.some(s => s.name === 'Manual Match')) {
			matching.scores.push({ name: 'Manual Match', score: 1, weight: 1 });
		}
		for (const media of release.media) {
			for (const t of media.tracks) {
				if (t.currentMatch?.match.track.id === match.track.id) {
					t.currentMatch = undefined;
				}
			}
		}
		track.currentMatch = matching;
		group.updateScore();
	}

	setManualSearch(): void {
		this.manual = true;
		if (this.manualSearchData.artist.length === 0) {
			const list = this.manualSearchData.getAutoCompleteArtistList();
			if (list.length > 0) {
				this.manualSearchData.artist = list[0];
			}
		}
		if (this.manualSearchData.releaseGroup.length === 0) {
			const list = this.manualSearchData.getAutoCompleteAlbumList();
			if (list.length > 0) {
				this.manualSearchData.releaseGroup = list[0];
			} else if (this.folder) {
				this.manualSearchData.releaseGroup = this.folder.name;
			}
		}
	}

	apply(group: MatchReleaseGroup, release: MatchRelease) {
		for (const media of release.media) {
			for (const track of media.tracks) {
				if (track.currentMatch) {
					track.currentMatch.match.mbTrack = track.mbTrack;
					track.currentMatch.match.mbMedia = media.mbMedia;
					track.currentMatch.match.mbRelease = release.mbRelease;
					track.currentMatch.match.mbGroup = group.mbGroup;
				}
			}
		}
	}

	stopApply() {
		for (const match of this.matchings) {
			match.mbTrack = undefined;
			match.mbMedia = undefined;
			match.mbRelease = undefined;
			match.mbGroup = undefined;
			match.genres = undefined;
		}
	}

	setRunning(action: string): void {
		this.currentAction = action;
		this.isRunning = true;
	}

	stopRunning(): void {
		this.isRunning = false;
		this.currentAction = '';
	}

	async searchManual(): Promise<void> {
		const q: JamParameters.MusicBrainzSearchParameters = { type: MusicBrainzSearchType.releaseGroup };
		if (this.manualSearchData.artist && this.manualSearchData.artist.trim().length > 0) {
			q.artist = this.manualSearchData.artist;
		}
		if (this.manualSearchData.releaseGroup && this.manualSearchData.releaseGroup.trim().length > 0) {
			q.releasegroup = this.manualSearchData.releaseGroup;
		}
		if (Object.keys(q).length > 1) {
			const query = new MusicbrainzSearchQuery(q);
			await this.runQuery(query, []);
		}
	}

	setRelease(group: MatchReleaseGroup, release: MatchRelease): void {
		group.currentRelease = release;
		if (!release.loaded) {
			this.loadRelease(release).catch((error: unknown) => {
				this.notify.error(error);
			});
		}
	}

	removeMatching(group: MatchReleaseGroup, track: MatchingTrack): void {
		track.currentMatch = undefined;
		group.updateScore();
	}

	loadLyrics(release?: MatchRelease): void {
		if (this.isRunning || !release) {
			return;
		}
		this.setRunning('Searching Lyrics');
		this.loadLyricsOVH(release)
			.then(() => {
				this.stopRunning();
			})
			.catch((error: unknown) => {
				this.stopRunning();
				this.notify.error(error);
			});
	}

	loadMoods(release?: MatchRelease): void {
		if (this.isRunning || !release) {
			return;
		}
		this.setRunning('Searching Moods');
		this.loadAcousticBrainz(release)
			.then(() => {
				this.stopRunning();
			})
			.catch((error: unknown) => {
				this.stopRunning();
				this.notify.error(error);
			});
	}

	private async loadAcousticBrainz(release: MatchRelease): Promise<void> {
		for (const media of release.media) {
			for (const track of media.tracks) {
				if (!track.abData && track.currentMatch?.match.mbTrack?.recording?.id) {
					const recordingId = track.currentMatch.match.mbTrack.recording.id;
					const result = await this.jam.metadata.acousticbrainzLookup({ mbID: recordingId });
					const res = result.data as AcousticBrainz.Response;
					const abData = AcousticBrainzHelper.processAcousticBrainzData(res);
					if (abData) {
						track.abData = abData;
						track.currentMatch.match.abdata = abData;
					}
				}
			}
		}
	}

	private shouldStop(): boolean {
		return (this.matchTree.enough(this.matchings.length) || this.isAborted);
	}

	private async collectList(): Promise<Array<AcoustIDEntry>> {
		let list: Array<AcoustIDEntry> = [];
		for (const match of this.matchings) {
			if (!match.acoustidEntries) {
				this.currentAction = `Checking files with AcoustID: ${match.track.name}`;
				try {
					const data = await this.jam.metadata.acoustidLookup({ trackID: match.track.id });
					const res = data.data as Array<Acoustid.Result>;
					match.acoustidEntries = acoustidResultToList(res, match.track);
				} catch (error) {
					console.error(error);
				}
				if (this.isAborted) {
					return list;
				}
			}
			if (match.acoustidEntries) {
				list = [...list, ...match.acoustidEntries];
			}
		}
		return list;
	}

	private async acoustId(): Promise<void> {
		this.currentAction = 'Checking files with AcoustID';
		// first make a list of all entries
		const list: Array<AcoustIDEntry> = await this.collectList();
		if (this.isAborted) {
			return;
		}
		// build best matching sorted releases tree
		const acousticResults = new AcoustidTree();
		for (const item of list) {
			acousticResults.add(item);
		}
		// add release to result
		await this.addResultReleases(acousticResults);
	}

	private async addResultReleases(acousticResults: AcoustidTree) {
		for (const rg of acousticResults.releasegroups) {
			if (this.shouldStop()) {
				return;
			}
			let rg2 = this.matchTree.findReleaseGroup(rg.id);
			rg2 ??= await this.addReleaseGroupByID(rg.id);
			if (!rg2.currentRelease) {
				await this.loadBestMatchingCurrentRelease(rg2);
				if (this.shouldStop()) {
					return;
				}
			}
			this.matchTree.sort();
		}
	}

	private async loadLyricsOVH(release: MatchRelease): Promise<void> {
		for (const media of release.media) {
			for (const track of media.tracks) {
				if (track.currentMatch && !track.currentMatch.match.lyrics && track.mbTrack.artistCredit && track.mbTrack.artistCredit.length > 0) {
					const artist = track.mbTrack.artistCredit[0].name;
					const title = track.mbTrack.title;
					const result = await this.jam.metadata.lyricsovhSearch({ title, artist });
					track.currentMatch.match.lyrics = result.data;
				}
			}
		}
	}

	private async loadRelease(release?: MatchRelease): Promise<void> {
		if (!release || release.loaded || release.isLoading) {
			return;
		}
		release.isLoading = true;
		try {
			this.currentAction = `Loading MusicBrainz Release: ${release.mbRelease.id}`;
			const data = await this.jam.metadata.musicbrainzLookup({ type: MusicBrainzLookupType.release, mbID: release.mbRelease.id });
			const res = data.data as MusicBrainz.Response;
			if (!res.release) {
				throw new Error('Got empty data');
			}
			release.setLookupRelease(res.release, this.matchings);
			release.loaded = true;
			release.isLoading = false;
		} catch (error) {
			release.isLoading = false;
			return Promise.reject(error);
		}
	}

	private async addReleaseGroupByReleaseID(releaseID: string): Promise<MatchReleaseGroup> {
		this.currentAction = `Loading MusicBrainz Release: ${releaseID}`;
		const data = await this.jam.metadata.musicbrainzLookup({ type: MusicBrainzLookupType.release, mbID: releaseID });
		const res = data.data as MusicBrainz.Response;
		if (!res.release) {
			return Promise.reject(new Error('Got empty data'));
		}
		return this.addReleaseGroupByID(res.release.releaseGroup.id);
	}

	private async addReleaseGroupByID(releasegroupID: string): Promise<MatchReleaseGroup> {
		let rg = this.matchTree.findReleaseGroup(releasegroupID);
		if (!rg) {
			this.currentAction = `Loading MusicBrainz Release Group: ${releasegroupID}`;
			const data = await this.jam.metadata.musicbrainzLookup({ type: MusicBrainzLookupType.releaseGroup, mbID: releasegroupID });
			const res = data.data as MusicBrainz.Response;
			if (!res.releaseGroup) {
				return Promise.reject(new Error('Got empty data'));
			}
			rg = this.matchTree.addReleaseGroup(res.releaseGroup);
		}
		return rg;
	}

	private buildQuickQueries(): Array<MusicbrainzSearchQuery> {
		return QueryBuilderHelper.buildQuickQueries(this.matchings, this.folder);
	}

	private buildQueries(): Array<MusicbrainzSearchQuery> {
		return QueryBuilderHelper.buildQueries(this.matchings);
	}

	private async loadBestMatchingCurrentRelease(rg: MatchReleaseGroup): Promise<void> {
		const releases = rg.releases.toSorted((a, b) => {
			const resA = Math.abs((a.totalTrack ?? 0) - this.matchings.length);
			const resB = Math.abs((b.totalTrack ?? 0) - this.matchings.length);
			if (resA === resB) {
				return a.sortDate - b.sortDate;
			}
			return resA - resB;
		});
		for (const rel of releases) {
			if (this.shouldStop()) {
				return;
			}
			await this.loadRelease(rel);
			if (rel.complete) {
				rg.currentRelease = rel;
				return;
			}
		}
		if (rg.releases.length > 0) {
			await this.loadRelease(rg.releases[0]);
			rg.currentRelease = rg.releases[0];
		}
	}

	private async loadByReleaseGroups(releaseGroups: Array<MusicBrainz.ReleaseGroup>): Promise<void> {
		await this.releaseLoader.loadByReleaseGroups(releaseGroups);
	}

	private async loadByReleases(releases: Array<MusicBrainz.Release>): Promise<void> {
		await this.releaseLoader.loadByReleases(releases);
	}

	private async loadByRecordings(recordings: Array<MusicBrainz.Recording>): Promise<void> {
		await this.releaseLoader.loadByRecordings(recordings);
	}

	private async runQuery(q: MusicbrainzSearchQuery, queries: Array<MusicbrainzSearchQuery>): Promise<void> {
		if (this.shouldStop()) {
			return;
		}
		this.currentAction = q.name;
		const result = await this.jam.metadata.musicbrainzSearch(q.q);
		const res = result.data as MusicBrainz.Response;
		if (res.releaseGroups) {
			await this.loadByReleaseGroups(res.releaseGroups);
		} else if (res.releases) {
			await this.loadByReleases(res.releases);
		} else if (res.recordings) {
			await this.loadByRecordings(res.recordings);
		} else {
			console.error('Not implemented result set', res);
		}
		this.matchTree.sort();
		if (this.shouldStop()) {
			return;
		}
		const nextQ = queries.shift();
		if (nextQ) {
			await this.runQuery(nextQ, queries);
		}
	}

	private async musicBrainzByQuickTags(): Promise<void> {
		const queries = this.buildQuickQueries();
		const q = queries.shift();
		if (q) {
			await this.runQuery(q, queries);
		}
	}

	private async musicBrainzByTags(): Promise<void> {
		const queries = this.buildQueries();
		const q = queries.shift();
		if (q) {
			await this.runQuery(q, queries);
		}
	}

	private async musicBrainzRefresh(): Promise<void> {
		for (const match of this.matchings) {
			if (this.shouldStop()) {
				return;
			}
			if (!match.track.tag) {
				await this.musicBrainzByTrackTag(match);
			}
		}
	}

	private async musicBrainzByTrackTag(match: Matching) {
		if (!match.track.tag) {
			return;
		}
		let matchReleaseGroup: MatchReleaseGroup | undefined;
		if (match.track.tag.mbReleaseGroupID) {
			matchReleaseGroup = await this.addReleaseGroupByID(match.track.tag.mbReleaseGroupID);
		}
		if (!matchReleaseGroup && match.track.tag.mbReleaseID) {
			matchReleaseGroup = await this.addReleaseGroupByReleaseID(match.track.tag.mbReleaseID);
		}
		if (matchReleaseGroup) {
			await this.applyMatchReleaseGroup(match, matchReleaseGroup);
		}
	}

	private async applyMatchReleaseGroup(match: Matching, matchReleaseGroup: MatchReleaseGroup) {
		if (match.track.tag?.mbReleaseID) {
			const rel = matchReleaseGroup.findRelease(match.track.tag.mbReleaseID);
			if (rel) {
				await this.loadRelease(rel);
			} else {
				console.error('Could not find the release with id', match.track.tag.mbReleaseID);
			}
			matchReleaseGroup.currentRelease = rel;
			if (!matchReleaseGroup.enough(this.matchings.length)) {
				matchReleaseGroup.currentRelease = undefined;
			}
		}
		if (!matchReleaseGroup.currentRelease) {
			await this.loadBestMatchingCurrentRelease(matchReleaseGroup);
		}
	}

	private async run(type: RunType): Promise<void> {
		await RunStrategyHelper.executeStrategy(
			type,
			async () => this.acoustId(),
			async () => this.musicBrainzRefresh(),
			async () => this.musicBrainzByQuickTags(),
			async () => this.musicBrainzByTags(),
			() => this.shouldStop()
		);
	}
}
