import {AcoustIDEntry, acoustidResultToList, AcoustidTree} from '@app/modules/tag-editor/model/acoustid.helper';
import {
	ABData,
	Matching,
	MatchingTrack,
	MatchRelease,
	MatchReleaseGroup,
	MatchTree
} from '@app/modules/tag-editor/model/release-matching.helper';
import {stripExtension} from '@app/modules/tag-editor/model/utils';
import {NotifyService} from '@core/services';
import {Jam, JamParameters, JamService, MusicBrainz, MusicBrainzLookupType, MusicBrainzSearchType} from '@jam';

export enum RunType {
	acoustID,
	musicbrainzRefresh,
	musicbrainzByTags,
	auto
}

class MusicbrainzSearchQuery {
	id: string;
	name: string;
	matchings: Array<Matching> = [];

	constructor(public q: JamParameters.MusicBrainzSearchArgs) {
		this.id = `musicbrainz-${JSON.stringify(q)}`;
		this.name = `MusicBrainz Search for ${Object.keys(q).filter(key => key !== 'type').map(key => `${key}: "${(q as any)[key]}"`).join(', ')}`;
	}
}

export class Matcher {
	isRunning: boolean = false;
	isAborted: boolean = false;
	manual: boolean = false;
	currentAction?: string;
	folder?: Jam.Folder;
	matchings: Array<Matching> = [];
	matchTree = new MatchTree();
	manualSearchData: {
		artists: Array<string>;
		albums: Array<string>;
		artist: string;
		releaseGroup: string;
		getAutoCompleteAlbumList(): Array<string>;
		getAutoCompleteArtistList(): Array<string>;
	} = {
		artists: [],
		albums: [],
		artist: '',
		releaseGroup: '',

		getAutoCompleteAlbumList: () => {
			if (this.manualSearchData.albums.length === 0) {
				for (const match of this.matchings) {
					const txt = (match.track?.tag?.album || '').trim();
					if (txt.length > 0 && !this.manualSearchData.albums.includes(txt)) {
						this.manualSearchData.albums.push(txt);
					}
				}
			}
			return this.manualSearchData.albums;
		},

		getAutoCompleteArtistList: () => {
			if (this.manualSearchData.artists.length === 0) {
				for (const match of this.matchings) {
					const txt = (match.track?.tag?.artist || '').trim();
					if (txt.length > 0 && !this.manualSearchData.artists.includes(txt)) {
						this.manualSearchData.artists.push(txt);
					}
				}
			}
			return this.manualSearchData.artists;
		}
	};

	constructor(private jam: JamService, private notify: NotifyService) {
	}

	static cleanAlbumName(s: string): string {
		// TODO: better sanitize album name
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

	// eslint-disable-next-line complexity
	private async loadAcousticBrainz(release: MatchRelease): Promise<void> {
		for (const media of release.media) {
			for (const track of media.tracks) {
				if (!track.abData && track.currentMatch?.match?.mbTrack?.recording?.id) {
					const res = (await this.jam.metadata.acousticbrainzLookup({mbID: track.currentMatch.match.mbTrack.recording.id})).data;
					if (res.highlevel) {
						const genres: Array<string> = [];
						const moods: Array<string> = [];
						const tonal: Array<string> = [];
						const other: Array<string> = [];
						const keys = Object.keys(res.highlevel);
						for (const key of keys) {
							const value = res.highlevel[key].value;
							const prop = res.highlevel[key].probability;
							if (prop > 0.8 && !value.includes('not_')) {
								if (key.startsWith('mood_') || key === 'timbre' || key === 'danceability') {
									if (!moods.includes(value)) {
										moods.push(value);
									}
								} else if (key.startsWith('genre_')) {
									if (!genres.includes(value)) {
										genres.push(value);
									}
								} else if (key.startsWith('tonal_') || key === 'voice_instrumental') {
									if (!tonal.includes(value)) {
										tonal.push(value);
									}
								} else {
									if (!other.includes(value)) {
										other.push(value);
									}
								}
							}
						}
						const abData: ABData = {genres, moods, tonal, other};
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
			return Promise.reject(e);
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
		const queries: Array<MusicbrainzSearchQuery> = [];
		const albums: Array<string> = [];
		const artists: Array<string> = [];
		for (const match of this.matchings) {
			if (match.track.tag && match.track.tag.album) {
				const s = Matcher.cleanAlbumName(match.track.tag.album);
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

		if (this.folder?.tag) {
			queries.push(new MusicbrainzSearchQuery({
				type: MusicBrainzSearchType.releaseGroup,
				releasegroup: this.folder.name,
				artist: this.folder.tag.artist
			}));
		}

		return queries;
	}

	// eslint-disable-next-line complexity
	private buildQueries(): Array<MusicbrainzSearchQuery> {
		const queries: Array<MusicbrainzSearchQuery> = [];

		const addQuery = (q: MusicbrainzSearchQuery, match: Matching): void => {
			const samequery = queries.find(qu => qu.id === q.id);
			if (samequery) {
				samequery.matchings.push(match);
				return;
			}
			q.matchings.push(match);
			queries.push(q);
		};

		const addMBQuery = (fields: JamParameters.MusicBrainzSearchArgs, match: Matching, trackslength?: boolean): void => {
			const q: JamParameters.MusicBrainzSearchArgs = {type: fields.type};
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
				q.tracks = this.matchings.length;
			}
			addQuery(new MusicbrainzSearchQuery(q), match);
		};

		// next we search the release group
		for (const match of this.matchings) {
			addMBQuery({type: MusicBrainzSearchType.releaseGroup, releasegroup: match.track.tag?.album, artist: match.track.tag?.artist}, match);
		}

		// check releases with track length
		// addQuery('release', {release: tag.album, artist: tag.artist}, null, true);
		for (const match of this.matchings) {
			addMBQuery({type: MusicBrainzSearchType.release, release: match.track.tag?.album, artist: match.track.tag?.artist}, match, true);
		}

		// now without track length
		for (const match of this.matchings) {
			addMBQuery({type: MusicBrainzSearchType.release, release: match.track.tag?.album, artist: match.track.tag?.artist}, match);
		}

		// now check recordings
		for (const match of this.matchings) {
			if (!match.track.tag?.title) {
				const trackname = stripExtension(match.track.name);
				addMBQuery({
					type: MusicBrainzSearchType.recording,
					recording: trackname,
					release: match.track.tag?.album,
					artist: match.track.tag?.artist
				}, match);
			} else {
				addMBQuery({
					type: MusicBrainzSearchType.recording,
					recording: match.track.tag.title,
					release: match.track.tag.album,
					artist: match.track.tag.artist
				}, match);
			}
		}

		// now get even fuzzier
		for (const match of this.matchings) {
			if (!match.track.tag?.title) {
				const trackname = stripExtension(match.track.name);
				addMBQuery({type: MusicBrainzSearchType.recording, recording: trackname, release: match.track.tag?.album}, match);
				addMBQuery({type: MusicBrainzSearchType.recording, recording: trackname, artist: match.track.tag?.artist}, match);
			} else {
				addMBQuery({type: MusicBrainzSearchType.recording, recording: match.track.tag.title, release: match.track.tag.album}, match);
				addMBQuery({type: MusicBrainzSearchType.recording, recording: match.track.tag.title, artist: match.track.tag.artist}, match);
			}
		}

		// now get even more fuzzier
		for (const match of this.matchings) {
			addMBQuery({type: MusicBrainzSearchType.releaseGroup, releasegroup: match.track.tag?.album}, match);
			addMBQuery({type: MusicBrainzSearchType.release, release: match.track.tag?.album}, match, true);
			addMBQuery({type: MusicBrainzSearchType.release, release: match.track.tag?.album}, match);
		}

		// the fuzziest
		for (const match of this.matchings) {
			if (!match.track.tag?.title) {
				const trackname = stripExtension(match.track.name);
				addMBQuery({type: MusicBrainzSearchType.recording, recording: trackname}, match);
			} else {
				addMBQuery({type: MusicBrainzSearchType.recording, recording: match.track.tag.title}, match);
			}
		}

		// ok, give up
		return queries;
	}

	private async loadBestMatchingCurrentRelease(rg: MatchReleaseGroup): Promise<void> {
		const releases = rg.releases.sort((a, b) => {
			const resA = Math.abs((a.totalTrack || 0) - this.matchings.length);
			const resB = Math.abs((b.totalTrack || 0) - this.matchings.length);
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
		for (const r of releaseGroups) {
			if (this.shouldStop()) {
				return;
			}
			let rg = this.matchTree.findReleaseGroup(r.id);
			if (!rg) {
				rg = await this.addReleaseGroupByID(r.id);
			}
			if (rg && !rg.currentRelease) {
				await this.loadBestMatchingCurrentRelease(rg);
			}
		}
	}

	private async loadByReleases(releases: Array<MusicBrainz.Release>): Promise<void> {
		for (const rel of releases) {
			if (this.shouldStop()) {
				return;
			}
			let rg = this.matchTree.findReleaseGroup(rel.releaseGroup.id);
			if (!rg) {
				rg = await this.addReleaseGroupByID(rel.releaseGroup.id);
			}
			if (rg && !rg.currentRelease) {
				await this.loadBestMatchingCurrentRelease(rg);
			}
		}
	}

	private async loadByRecordings(recordings: Array<MusicBrainz.Recording>): Promise<void> {
		for (const rec of recordings) {
			if (this.shouldStop()) {
				return;
			}
			if (rec.releases) {
				for (const rel of rec.releases) {
					if (this.shouldStop()) {
						return;
					}
					let rg = this.matchTree.findReleaseGroup(rel.releaseGroup.id);
					if (!rg) {
						rg = await this.addReleaseGroupByID(rel.releaseGroup.id);
					}
					if (rg && !rg.currentRelease) {
						await this.loadBestMatchingCurrentRelease(rg);
					}
				}
			}
		}
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
			console.error('TODO', res);
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
		switch (type) {
			case RunType.acoustID:
				await this.acoustId();
				break;
			case RunType.musicbrainzByTags:
				await this.musicBrainzByQuickTags();
				if (this.shouldStop()) {
					return;
				}
				await this.musicBrainzByTags();
				break;
			case RunType.musicbrainzRefresh:
				await this.musicBrainzRefresh();
				break;
			case RunType.auto:
				await this.musicBrainzRefresh();
				if (this.shouldStop()) {
					return;
				}
				await this.musicBrainzByQuickTags();
				if (this.shouldStop()) {
					return;
				}
				await this.acoustId();
				if (this.shouldStop()) {
					return;
				}
				await this.musicBrainzByTags();
				break;
			default:
				break;
		}
	}
}
