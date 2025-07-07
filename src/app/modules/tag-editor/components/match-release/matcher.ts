import {AcoustIDEntry, acoustidResultToList, AcoustidTree} from '@app/modules/tag-editor/model/acoustid.helper';
import {
	Matching,
	MatchingTrack,
	MatchRelease,
	MatchReleaseGroup,
	MatchTree
} from '@app/modules/tag-editor/model/release-matching.helper';
import {NotifyService} from '@core/services';
import {Jam, JamParameters, JamService, MusicBrainz, MusicBrainzLookupType, MusicBrainzSearchType} from '@jam';
import {AcousticBrainzHelper} from './acoustic-brainz.helper';
import {ManualSearchData} from './manual-search-data';
import {MusicbrainzSearchQuery, QueryBuilderHelper} from './query-builder.helper';
import {ReleaseLoaderHelper} from './release-loader.helper';
import {RunStrategyHelper} from './run-strategy.helper';

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
	private releaseLoader: ReleaseLoaderHelper;

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
			.catch(e => {
				this.notify.error(e);
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
			.catch(e => {
				this.notify.error(e);
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
			matching = {match, score: 1, scores: []};
			track.matchings.push(matching);
		}
		matching.score = 1;
		if (!matching.scores.find(s => s.name === 'Manual Match')) {
			matching.scores.push({name: 'Manual Match', score: 1, weight: 1});
		}
		for (const media of release.media) {
			for (const t of media.tracks) {
				if (t.currentMatch && t.currentMatch.match.track.id === match.track.id) {
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
		const q: JamParameters.MusicBrainzSearchArgs = {type: MusicBrainzSearchType.releaseGroup};
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
			this.loadRelease(release)
				.catch(e => {
					this.notify.error(e);
				});
		}
	}

	removeMatching(group: MatchReleaseGroup, release: MatchRelease, track: MatchingTrack): void {
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
			.catch(e => {
				this.stopRunning();
				this.notify.error(e);
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
			.catch(e => {
				this.stopRunning();
				this.notify.error(e);
			});
	}

	private async loadAcousticBrainz(release: MatchRelease): Promise<void> {
		for (const media of release.media) {
			for (const track of media.tracks) {
				if (!track.abData && track.currentMatch?.match?.mbTrack?.recording?.id) {
					const recordingId = track.currentMatch.match.mbTrack.recording.id;
					const res = (await this.jam.metadata.acousticbrainzLookup({mbID: recordingId})).data;
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

	private async acoustId(): Promise<void> {
		this.currentAction = 'Checking files with AcoustID';

		// first make a list of all entries
		let list: Array<AcoustIDEntry> = [];
		for (const match of this.matchings) {
			if (!match.acoustidEntries) {
				this.currentAction = `Checking files with AcoustID: ${match.track.name}`;
				try {
					const data = await this.jam.metadata.acoustidLookup({trackID: match.track.id});
					match.acoustidEntries = acoustidResultToList(data.data, match.track);
				} catch (e: any) {
					console.error(e);
				}
				if (this.isAborted) {
					return;
				}
			}
			if (match.acoustidEntries) {
				list = list.concat(match.acoustidEntries);
			}
		}

		// build best matching sorted releases tree
		const acousticResults = new AcoustidTree();
		for (const item of list) {
			acousticResults.add(item);
		}

		// add release to result
		for (const rg of acousticResults.releasegroups) {
			if (this.shouldStop()) {
				return;
			}
			let rg2 = this.matchTree.findReleaseGroup(rg.id);
			if (!rg2) {
				rg2 = await this.addReleaseGroupByID(rg.id);
			}
			if (rg2 && !rg2.currentRelease) {
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
					track.currentMatch.match.lyrics = (await this.jam.metadata.lyricsovhSearch({title, artist})).data;
				}
			}
		}
	}

	private async loadRelease(release: MatchRelease): Promise<void> {
		if (!release || release.loaded || release.isLoading) {
			return;
		}
		release.isLoading = true;
		try {
			this.currentAction = `Loading MusicBrainz Release: ${release.mbRelease.id}`;
			const res = await this.jam.metadata.musicbrainzLookup({type: MusicBrainzLookupType.release, mbID: release.mbRelease.id});
			if (!res.data?.release) {
				return Promise.reject(Error('Got empty data'));
			}
			release.setLookupRelease(res.data.release, this.matchings);
			release.loaded = true;
			release.isLoading = false;
		} catch (e: any) {
			release.isLoading = false;
			return Promise.reject(e as Error);
		}
	}

	private async addReleaseGroupByReleaseID(releaseID: string): Promise<MatchReleaseGroup> {
		this.currentAction = `Loading MusicBrainz Release: ${releaseID}`;
		const res = await this.jam.metadata.musicbrainzLookup({type: MusicBrainzLookupType.release, mbID: releaseID});
		if (!res.data.release) {
			return Promise.reject(Error('Got empty data'));
		}
		return this.addReleaseGroupByID(res.data.release.releaseGroup.id);
	}

	private async addReleaseGroupByID(releasegroupID: string): Promise<MatchReleaseGroup> {
		let rg = this.matchTree.findReleaseGroup(releasegroupID);
		if (!rg) {
			this.currentAction = `Loading MusicBrainz Release Group: ${releasegroupID}`;
			const data = await this.jam.metadata.musicbrainzLookup({type: MusicBrainzLookupType.releaseGroup, mbID: releasegroupID});
			rg = this.matchTree.addReleaseGroup(data.data.releaseGroup);
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
		const releases = rg.releases.sort((a, b) => {
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
		const res = (await this.jam.metadata.musicbrainzSearch(q.q)).data;
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
			if (match.track.tag) {
				let rg: MatchReleaseGroup | undefined;
				if (match.track.tag.mbReleaseGroupID) {
					rg = await this.addReleaseGroupByID(match.track.tag.mbReleaseGroupID);
				}
				if (!rg && match.track.tag.mbReleaseID) {
					rg = await this.addReleaseGroupByReleaseID(match.track.tag.mbReleaseID);
				}
				if (rg) {
					if (match.track.tag.mbReleaseID) {
						const rel = rg.findRelease(match.track.tag.mbReleaseID);
						if (!rel) {
							console.error('Could not find the release with id', match.track.tag.mbReleaseID);
						} else {
							await this.loadRelease(rel);
						}
						rg.currentRelease = rel;
						if (!rg.enough(this.matchings.length)) {
							rg.currentRelease = undefined;
						}
					}
					if (!rg.currentRelease) {
						await this.loadBestMatchingCurrentRelease(rg);
					}
				}
			}
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
