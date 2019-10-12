import {HttpClient} from '@angular/common/http';
import {ChangeDetectorRef, Component, HostBinding, Input, OnChanges, OnDestroy, SimpleChanges} from '@angular/core';
import {base64ArrayBuffer} from '@app/utils/base64';
import {AppService, NotifyService} from '@core/services';
import {
	CoverArtArchive,
	CoverArtArchiveLookupType,
	Jam,
	JamBaseService,
	JamParameters,
	JamService,
	LastFMLookupType,
	MusicBrainz,
	MusicBrainzLookupType,
	MusicBrainzSearchType
} from '@jam';
import {take} from 'rxjs/operators';
import {AcoustIDEntry, acoustidResultToList, AcoustidTree} from '../../model/acoustid.helper';
import {
	GenreTag,
	getLastFMAlbumGenres,
	getLastFMArtistGenres,
	getMusicBrainzGenres,
	getTrackGenres,
	mergeGenres
} from '../../model/genres.helper';
import {
	ABData,
	Matching,
	MatchingTrack,
	MatchRelease,
	MatchReleaseGroup,
	MatchTree,
	MBTrackMatching
} from '../../model/release-matching.helper';
import {toID3v24} from '../../model/release-matching.id3.helper';
import {stripExtension} from '../../model/utils';
import {Base64Image} from '../image-base64/image-base64.component';

export interface ReleaseDataMatching {
	track: Jam.Track;
	rawTag?: Jam.RawTag;
}

export interface ReleaseMatching {
	matchings: Array<ReleaseDataMatching>;

	apply(): void;

	close?(): void;
}

function cleanAlbumName(s: string): string {
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

class MusicbrainzSearchQuery {
	id: string;
	name: string;
	matchings: Array<Matching> = [];

	constructor(public q: JamParameters.MusicBrainzSearch) {
		this.id = 'musicbrainz-' + JamBaseService.flattenParams(q);
		this.name = 'MusicBrainz Search for ' +
			Object.keys(q).filter(key => key !== 'type').map(key => `${key}: "${q[key]}"`).join(', ');
	}
}

export enum RunType {
	acoustID,
	musicbrainzRefresh,
	musicbrainzByTags,
	auto
}

export interface ImageNode {
	image: CoverArtArchive.Image;
	base64?: Base64Image;
	checked: boolean;
	requested?: boolean;
}

@Component({
	selector: 'app-match-release',
	templateUrl: 'match-release.component.html',
	styleUrls: ['match-release.component.scss']
})
export class MatchReleaseComponent implements OnChanges, OnDestroy {
	@Input() data: ReleaseMatching;
	isRunning: boolean = false;
	isImageSearchRunning: boolean = false;
	isGenreSearchRunning: boolean = false;
	isAborted: boolean = false;
	currentAction: string;
	showFrontImagesOnly: boolean = true;
	images: Array<ImageNode>;
	coverArtArchive: Array<ImageNode>;
	customGenre = {text: '', checked: true};
	@HostBinding('class.right-active') rightActive: boolean = true;

	matchings: Array<Matching> = [];
	matchTree = new MatchTree();
	manual: boolean = false;
	manualSearchData = {
		artists: [],
		albums: [],
		artist: '',
		releaseGroup: '',

		getAutoCompleteAlbumList: () => {
			if (this.manualSearchData.albums.length === 0) {
				for (const match of this.matchings) {
					const txt = (match.track.tag.album ? match.track.tag.album : '').trim();
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
					const txt = (match.track.tag.artist ? match.track.tag.artist : '').trim();
					if (txt.length > 0 && !this.manualSearchData.artists.includes(txt)) {
						this.manualSearchData.artists.push(txt);
					}
				}
			}
			return this.manualSearchData.artists;
		}
	};

	current: { group: MatchReleaseGroup, release: MatchRelease };
	genres: Array<{ tag: GenreTag, checked: boolean }>;
	RunType = RunType;

	constructor(private app: AppService, private jam: JamService, private notify: NotifyService, private client: HttpClient, private cd: ChangeDetectorRef) {
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (!this.data) {
			this.matchings = [];
			this.isAborted = true;
		} else {
			this.matchings = this.data.matchings.map(m =>
				({track: m.track}));
			if (!this.isRunning) {
				this.isAborted = false;
			}
			this.start(RunType.auto);
		}
	}

	ngOnDestroy(): void {
		this.isAborted = true;
	}

	allowDrop(event): void {
		event.preventDefault();
	}

	drag(event, match): void {
		this.cd.markForCheck();
		event.dataTransfer.setData('text', match.track.id);
	}

	drop(event, group: MatchReleaseGroup, release: MatchRelease, track: MatchingTrack): void {
		event.preventDefault();
		const id = event.dataTransfer.getData('text');
		const match = this.matchings.find(m => m.track.id === id);
		let matching: MBTrackMatching = track.matchings.find(m => m.match.track.id === id);
		if (!matching) {
			matching = {
				match,
				score: 1,
				scores: []
			};
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
			}
		}

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

	stop(): void {
		if (!this.isRunning) {
			return;
		}
		this.isAborted = true;
	}

	apply(): void {
		const genres = this.genres.filter(genre => genre.checked).map(genre => genre.tag.name);
		if (this.customGenre.checked && this.customGenre.text.trim().length > 0) {
			genres.push(this.customGenre.text.trim());
		}
		for (const match of this.matchings) {
			match.genres = genres;
		}
		const images = this.coverArtArchive ? this.coverArtArchive.filter(i => i.checked && i.base64) : [];
		for (const result of this.data.matchings) {
			const match = this.matchings.find(m => m.track.id === result.track.id);
			result.rawTag = match ? toID3v24(match, genres, images) : undefined;
		}
		if (this.data.apply) {
			this.data.apply();
		}
		if (this.data.close) {
			this.data.close();
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

	chooseRelease(group: MatchReleaseGroup, release: MatchRelease): void {
		this.stopApply();
		this.current = {group, release};
		this.images = undefined;
		this.coverArtArchive = undefined;
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
		this.loadGenres(group, release)
			.catch(e => {
				this.notify.error(e);
			});
		this.loadCoverartImages(release.mbRelease.id, group.mbGroup.id)
			.catch(e => {
				this.notify.error(e);
			});
	}

	stopApply(): void {
		this.current = undefined;
		this.genres = undefined;
		for (const match of this.matchings) {
			match.mbTrack = undefined;
			match.mbMedia = undefined;
			match.mbRelease = undefined;
			match.mbGroup = undefined;
			match.genres = undefined;
		}
	}

	onToggleShowFrontImagesOnly(): void {
		if (!this.showFrontImagesOnly) {
			if (this.coverArtArchive) {
				for (const node of this.coverArtArchive) {
					if (!node.base64 && !node.requested) {
						this.getBase64Image(node)
							.catch(e => {
								console.error(e);
							});
					}
				}
			}
		}
		if (this.coverArtArchive) {
			this.images = this.coverArtArchive.filter(i => i.image.front || !this.showFrontImagesOnly);
		}
	}

	loadMoods(release: MatchRelease): void {
		if (this.isRunning) {
			return;
		}
		this.isRunning = true;
		this.loadAcousticBrainz(release)
			.then(() => {
				this.isRunning = false;
			})
			.catch(e => {
				this.isRunning = false;
				this.notify.error(e);
			});
	}

	removeMatching(group: MatchReleaseGroup, release: MatchRelease, track: MatchingTrack): void {
		track.currentMatch = undefined;
		group.updateScore();
	}

	private shouldStop(): boolean {
		return (this.matchTree.enough(this.matchings.length) || this.isAborted);
	}

	private async searchManual(): Promise<void> {
		const q: JamParameters.MusicBrainzSearch = {type: MusicBrainzSearchType.releaseGroup};
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

	private async loadImages(result: CoverArtArchive.Response): Promise<void> {
		if (result.images) {
			this.coverArtArchive = result.images.map(image => {
				if (image.types.length === 0) {
					image.types.push('Other');
				}
				if (image.image) {
					image.image = image.image.replace('http:', 'https:');
				}
				if (image.thumbnails) {
					Object.keys(image.thumbnails).forEach(key => {
						image.thumbnails[key] = image.thumbnails[key].replace('http:', 'https:');
					});
				}
				const node: ImageNode = {
					image,
					checked: false
				};
				if (image.front || !this.showFrontImagesOnly) {
					this.getBase64Image(node)
						.catch(e => {
							console.error(e);
						});
				}
				return node;
			});
			this.images = this.coverArtArchive.filter(i => i.image.front || !this.showFrontImagesOnly);
			const front = this.images.find(i => i.image.front);
			if (front) {
				front.checked = true;
			}
		} else {
			this.images = undefined;
			this.coverArtArchive = [];
		}
	}

	private async loadCoverartImages(releaseID: string, releaseGroupID: string): Promise<void> {
		if (releaseID) {
			this.isImageSearchRunning = true;
			let res = await this.jam.metadata.coverartarchive_lookup({type: CoverArtArchiveLookupType.release, id: releaseID});
			await this.loadImages(res);
			if (this.coverArtArchive.length === 0 && releaseGroupID) {
				this.images = undefined;
				this.coverArtArchive = undefined;
				res = await this.jam.metadata.coverartarchive_lookup({type: CoverArtArchiveLookupType.releaseGroup, id: releaseGroupID});
				await this.loadImages(res);
				this.isImageSearchRunning = false;
			} else {
				this.isImageSearchRunning = false;
			}
		}
	}

	private async getBase64Image(image: ImageNode): Promise<void> {
		if (image.requested) {
			return;
		}
		const imageUrl = image.image.thumbnails['500'] || image.image.thumbnails.small;
		image.requested = true;
		return new Promise<void>((resolve, reject) => {
			this.client.get(imageUrl, {observe: 'response', responseType: 'arraybuffer' as 'arraybuffer'})
				.pipe(take(1)).subscribe(resp => {
					image.requested = false;
					image.base64 = {
						mimeType: resp.headers.get('Content-Type'),
						base64: base64ArrayBuffer(resp.body)
					};
					resolve();
				},
				err => {
					image.requested = false;
					if (err.status === 0) {
						this.notify.error({error: 'Could not reach server https://coverartarchive.org'});
						return;
					}
					this.notify.error(err);
					resolve();
				});
		});
	}

	private async loadGenres(group: MatchReleaseGroup, release: MatchRelease): Promise<void> {
		this.isGenreSearchRunning = true;
		const tracksGenres: Array<{ count: number; name: string; }> = [];
		if (group.mbGroup.secondaryTypes) {
			if (group.mbGroup.secondaryTypes.find(s => ['audiobook', 'audio drama', 'spokenword'].includes(s))) {
				tracksGenres.push({count: 1, name: 'Audiobook'});
			}
		}

		for (const match of this.data.matchings) {
			if (match.track.tag.genre) {
				const c = tracksGenres.find(t => t.name === match.track.tag.genre);
				if (c) {
					c.count++;
				} else {
					tracksGenres.push({count: 1, name: match.track.tag.genre});
				}
			}
		}
		let genres = getTrackGenres(tracksGenres);
		let tags = [];
		if (release.mbRelease.tags) {
			tags = tags.concat(release.mbRelease.tags);
		}
		if (group.mbGroup.tags) {
			tags = tags.concat(group.mbGroup.tags);
		}
		genres = mergeGenres(genres, getMusicBrainzGenres(tags));
		const data = await this.jam.metadata.lastfm_lookup({type: LastFMLookupType.album, id: release.mbRelease.id});
		if (data.album) {
			genres = mergeGenres(genres, getLastFMAlbumGenres(data.album));
		}
		if (genres.length === 0 && release.mbRelease.artistCredit.length > 0) {
			const artistData = await this.jam.metadata.lastfm_lookup({
				type: LastFMLookupType.artist,
				id: release.mbRelease.artistCredit[0].artist.id
			});
			if (artistData && artistData.artist) {
				genres = mergeGenres(genres, getLastFMArtistGenres(artistData.artist));
			}
		}
		this.genres = genres.sort((a, b) => b.count - a.count).map((tag, index) =>
			({tag, checked: index === 0}));
		this.isGenreSearchRunning = false;
	}

	private async loadAcousticBrainz(release: MatchRelease): Promise<void> {
		for (const media of release.media) {
			for (const track of media.tracks) {
				if (!track.abData && track.currentMatch) {
					const res = await this.jam.metadata.acousticbrainz_lookup({id: track.currentMatch.match.mbTrack.recording.id});
					if (res.highlevel) {
						const abData: ABData = {
							genres: [],
							moods: [],
							tonal: [],
							other: []
						};
						const keys = Object.keys(res.highlevel);
						for (const key of keys) {
							const value = res.highlevel[key].value;
							const prop = res.highlevel[key].probability;
							if (prop > 0.8 && !value.includes('not_')) {
								if (key.startsWith('mood_') || key === 'timbre' || key === 'danceability') {
									if (!abData.moods.includes(value)) {
										abData.moods.push(value);
									}
								} else if (key.startsWith('genre_')) {
									if (!abData.genres.includes(value)) {
										abData.genres.push(value);
									}
								} else if (key.startsWith('tonal_') || key === 'voice_instrumental') {
									if (!abData.tonal.includes(value)) {
										abData.tonal.push(value);
									}
								} else {
									if (!abData.other.includes(value)) {
										abData.other.push(value);
									}
								}
							}
						}
						track.abData = abData;
						track.currentMatch.match.abdata = abData;
					}
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
			this.currentAction = 'Loading MusicBrainz Release: ' + release.mbRelease.id;
			const res = await this.jam.metadata.musicbrainz_lookup({type: MusicBrainzLookupType.release, id: release.mbRelease.id});
			if (!res.release) {
				return Promise.reject(Error('Got empty data'));
			}
			release.setLookupRelease(res.release, this.matchings);
			release.loaded = true;
			release.isLoading = false;
		} catch (e) {
			release.isLoading = false;
			return Promise.reject(e);
		}
	}

	private async addReleaseGroupByReleaseID(releaseID: string): Promise<MatchReleaseGroup> {
		this.currentAction = 'Loading MusicBrainz Release: ' + releaseID;
		const res = await this.jam.metadata.musicbrainz_lookup({type: MusicBrainzLookupType.release, id: releaseID});
		if (!res.release) {
			return Promise.reject(Error('Got empty data'));
		}
		return this.addReleaseGroupByID(res.release.releaseGroup.id);
	}

	private async addReleaseGroupByID(releasegroupID: string): Promise<MatchReleaseGroup> {
		let rg: MatchReleaseGroup = this.matchTree.findReleaseGroup(releasegroupID);
		if (!rg) {
			this.currentAction = 'Loading MusicBrainz Release Group: ' + releasegroupID;
			const data = await this.jam.metadata.musicbrainz_lookup({type: MusicBrainzLookupType.releaseGroup, id: releasegroupID});
			rg = this.matchTree.addReleaseGroup(data.releaseGroup);
		}
		return rg;
	}

	private async acoustId(): Promise<void> {
		this.currentAction = 'Checking files with AcoustID';

		// first make a list of all entries
		let list: Array<AcoustIDEntry> = [];
		for (const match of this.matchings) {
			if (!match.acoustidEntries) {
				this.currentAction = 'Checking files with AcoustID: ' + match.track.name;
				const data = await this.jam.metadata.acoustid_lookup({id: match.track.id});
				if (this.isAborted) {
					return;
				}
				match.acoustidEntries = acoustidResultToList(data, match.track);
			}
			list = list.concat(match.acoustidEntries);
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

	private buildQuickQueries(): Array<MusicbrainzSearchQuery> {
		const queries: Array<MusicbrainzSearchQuery> = [];
		const albums = [];
		const artists = [];
		for (const match of this.matchings) {
			if (match.track.tag && match.track.tag.album) {
				const s = cleanAlbumName(match.track.tag.album);
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
		return queries;
	}

	private buildQueries(): Array<MusicbrainzSearchQuery> {
		const queries: Array<MusicbrainzSearchQuery> = [];

		const addQuery = (q: MusicbrainzSearchQuery, match: Matching) => {
			const samequery = queries.find(qu => qu.id === q.id);
			if (samequery) {
				samequery.matchings.push(match);
				return;
			}
			q.matchings.push(match);
			queries.push(q);
		};

		const addMBQuery = (fields: JamParameters.MusicBrainzSearch, match: Matching, trackslength?: boolean) => {
			const q: JamParameters.MusicBrainzSearch = {type: fields.type};
			for (const key in fields) {
				if (fields.hasOwnProperty(key)) {
					const val = (fields as any)[key];
					if ((val === undefined) || (val === '') || (val.toString().trim() === '')) {
						// if one is invalid, don't add
						return;
					}
					const parts = val.toString().split('(');
					if (parts.length > 0) {
						q[key] = parts[0];
					}
				}
			}
			if (trackslength) {
				q.tracks = this.matchings.length;
			}
			addQuery(new MusicbrainzSearchQuery(q), match);
		};

		// next we search the release group
		for (const match of this.matchings) {
			addMBQuery({type: MusicBrainzSearchType.releaseGroup, releasegroup: match.track.tag.album, artist: match.track.tag.artist}, match);
		}

		// check releases with track length
		// addQuery('release', {release: tag.album, artist: tag.artist}, null, true);
		for (const match of this.matchings) {
			addMBQuery({type: MusicBrainzSearchType.release, release: match.track.tag.album, artist: match.track.tag.artist}, match, true);
		}

		// now without track length
		for (const match of this.matchings) {
			addMBQuery({type: MusicBrainzSearchType.release, release: match.track.tag.album, artist: match.track.tag.artist}, match);
		}

		// now check recordings
		for (const match of this.matchings) {
			if (!match.track.tag.title) {
				const trackname = stripExtension(match.track.name);
				addMBQuery({
					type: MusicBrainzSearchType.recording,
					recording: trackname,
					release: match.track.tag.album,
					artist: match.track.tag.artist
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
			if (!match.track.tag.title) {
				const trackname = stripExtension(match.track.name);
				addMBQuery({type: MusicBrainzSearchType.recording, recording: trackname, release: match.track.tag.album}, match);
				addMBQuery({type: MusicBrainzSearchType.recording, recording: trackname, artist: match.track.tag.artist}, match);
			} else {
				addMBQuery({type: MusicBrainzSearchType.recording, recording: match.track.tag.title, release: match.track.tag.album}, match);
				addMBQuery({type: MusicBrainzSearchType.recording, recording: match.track.tag.title, artist: match.track.tag.artist}, match);
			}
		}

		// now get even more fuzzier
		for (const match of this.matchings) {
			addMBQuery({type: MusicBrainzSearchType.releaseGroup, releasegroup: match.track.tag.album}, match);
			addMBQuery({type: MusicBrainzSearchType.release, release: match.track.tag.album}, match, true);
			addMBQuery({type: MusicBrainzSearchType.release, release: match.track.tag.album}, match);
		}

		// the fuzziest
		for (const match of this.matchings) {
			if (!match.track.tag.title) {
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
			const resA = Math.abs(a.totalTrack - this.matchings.length);
			const resB = Math.abs(b.totalTrack - this.matchings.length);
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
		const res = await this.jam.metadata.musicbrainz_search(q.q);
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
			if (match.track.tag && match.track.tag.musicbrainz) {
				let rg: MatchReleaseGroup;
				if (match.track.tag.musicbrainz.releaseGroupID) {
					rg = await this.addReleaseGroupByID(match.track.tag.musicbrainz.releaseGroupID);
				}
				if (!rg && match.track.tag.musicbrainz.releaseID) {
					rg = await this.addReleaseGroupByReleaseID(match.track.tag.musicbrainz.releaseID);
				}
				if (rg) {
					if (match.track.tag.musicbrainz.releaseID) {
						const rel = rg.findRelease(match.track.tag.musicbrainz.releaseID);
						if (!rel) {
							console.error('Could not find the release with id', match.track.tag.musicbrainz.releaseID);
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

}
