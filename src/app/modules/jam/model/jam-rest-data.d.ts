// tslint:disable:max-file-line-count
import {AcousticBrainz} from './acousticbrainz-rest-data';
import {Acoustid} from './acoustid-rest-data';
import {CoverArtArchive} from './coverartarchive-rest-data';
import {ID3v2Frames} from './id3v2-frames';
import {LastFM} from './lastfm-rest-data';
import {MusicBrainz} from './musicbrainz-rest-data';
import {WikiData} from './wikidata-rest-data';

export declare namespace Jam {

	export type AlbumType = 'unknown' | 'album' | 'compilation' | 'live' | 'bootleg' | 'soundtrack' | 'audiobook' | 'ep' | 'single' | 'audiodrama';
	export type FolderType = 'unknown' | 'artist' | 'collection' | 'album' | 'multialbum' | 'extras';
	export type PodcastStatusType = 'new' | 'downloading' | 'completed' | 'error';
	export type PodcastEpisodeStatusType = 'new' | 'downloading' | 'completed' | 'error' | 'deleted';
	export type ArtworkImageType = 'front' | 'back' | 'booklet' | 'medium' | 'tray' | 'obi' | 'spine' | 'track' | 'liner' | 'sticker' | 'poster' | 'watermark' | 'raw' | 'unedited' | 'other' | 'artist';
	export type RootScanStrategy = 'auto' | 'artistalbum' | 'compilation' | 'audiobook';
	export type SessionMode = 'browser' | 'jwt' | 'subsonic';

	/*
	 * Base Data
	 */

	export interface ListResult {
		offset?: number;
		amount?: number;
		total?: number;
	}

	export interface Base {
		id: string;
		state?: State;
		name: string;
		created: number;
	}

	/*
	 * State Data
	 */

	export interface State {
		played?: number;
		lastplayed?: number;
		faved?: number;
		rated?: number;
	}

	export interface States {
		[id: string]: State;
	}

	/*
	 * Track/Folder Health Data
	 */

	export interface HealthHint {
		id: string;
		name: string;
		details?: Array<{ reason: string, expected?: string, actual?: string }>;
	}

	/*
	 * Track/Folder/Artist/Album Info Data
	 */

	export interface ExtendedInfo {
		description: string;
		source: string;
		license: string;
		url: string;
		licenseUrl: string;
	}

	export interface Info {
		info?: ExtendedInfo;
	}

	/*
	 * Ping Data
	 */

	export interface Ping {
		version: Version;
	}

	export type Version = string; // \d+\.\d+\.\d+

	/*
	 * Session Data
	 */

	export interface Session {
		version: Version;
		user?: SessionUser;
		jwt?: string;
		allowedCookieDomains: Array<string>;
	}

	export interface UserSession {
		id: string;
		client: string;
		expires: number;
		mode: SessionMode;
		platform?: string;
		agent?: string;
		os?: string;
	}

	export interface SubsonicToken {
		token?: string;
	}

	/*
	 * Root Data
	 */

	export interface Root extends Base {
		path: string;
		status: RootStatus;
		strategy: RootScanStrategy;
	}

	export interface RootStatus {
		lastScan: number;
		error?: string;
		scanning?: boolean;
	}

	export interface RootList extends ListResult {
		items: Array<Root>;
	}

	/*
	 * Bookmark Data
	 */

	export interface Bookmark {
		id: string;
		track?: Track;
		trackID: string;
		position: number;
		comment?: string;
		created: number;
		changed: number;
	}

	export interface BookmarkList extends ListResult {
		items: Array<Bookmark>;
	}

	/*
	 * NowPlaying Data
	 */

	export interface NowPlaying {
		username: string;
		minutesAgo: number;
		track?: Track;
	}

	export interface NowPlayingList extends ListResult {
		items: Array<NowPlaying>;
	}

	/*
	 * Track Data
	 */

	export interface TrackMBTag {
		trackID?: string;
		recordingID?: string;
		releaseTrackID?: string;
		releaseGroupID?: string;
		releaseID?: string;
		artistID?: string;
	}

	export interface TrackTag {
		title?: string;
		album?: string;
		artist?: string;
		genre?: string;
		year?: number;
		trackNr?: number;
		disc?: number;
		musicbrainz?: TrackMBTag;
	}

	export interface TrackMedia {
		bitRate?: number;
		format: string;
		channels?: number;
		sampleRate?: number;
		size: number;
	}

	export interface Track extends Base {
		duration: number;
		tag?: TrackTag;
		tagRaw?: RawTag;
		media?: TrackMedia;
		parentID: string;
		artistID?: string;
		albumArtistID?: string;
		albumID?: string;
	}

	export interface TrackList extends ListResult {
		items: Array<Track>;
	}

	export interface RawTag {
		version: number;
		frames: ID3v2Frames.Frames;
	}

	export interface RawTags {
		[trackID: string]: RawTag;
	}

	export interface TrackHealth {
		track: Track;
		health: Array<HealthHint>;
	}

	export interface TrackLyrics {
		lyrics?: string;
		source?: string;
	}

	/*
	 * PodcastEpisode Data
	 */

	export interface PodcastEpisodeChapter {
		start: number;
		title: string;
	}

	export interface PodcastEpisode extends Track {
		podcastID: string;
		podcast: string;
		status: PodcastEpisodeStatusType;
		date: number;
		summary?: string;
		guid?: string;
		author?: string;
		link?: string;
		errorMessage?: string;
		chapters?: Array<PodcastEpisodeChapter>;
	}

	export interface PodcastEpisodeList extends ListResult {
		items: Array<PodcastEpisode>;
	}

	export interface PodcastEpisodeStatus {
		status: PodcastEpisodeStatusType;
	}

	export interface PodcastStatus {
		status: PodcastStatusType;
		lastCheck?: number;
	}

	/*
	 * Podcast Data
	 */

	export interface Podcast extends Base {
		url: string;
		status: PodcastStatusType;
		lastCheck?: number;
		errorMessage?: string;
		description?: string;
		episodes?: Array<PodcastEpisode>;
	}

	export interface PodcastList extends ListResult {
		items: Array<Podcast>;
	}

	/*
	 * Radio Data
	 */

	export interface Radio extends Base {
		url: string;
		homepage?: string;
		created: number;
		changed: number;
	}

	export interface RadioList extends ListResult {
		items: Array<Radio>;
	}

	/*
	 * Folder Data
	 */

	export interface Folder extends Base {
		parentID?: string;
		level: number;
		type: FolderType;
		trackCount?: number;
		folderCount?: number;
		tag?: FolderTag;
		info?: ExtendedInfo;
		folders?: Array<Folder>;
		tracks?: Array<Track>;
		parents?: Array<FolderParent>;
		artworks?: Array<ArtworkImage>;
		similar?: Array<Folder>;
	}

	export interface FolderList extends ListResult {
		items: Array<Folder>;
	}

	export interface FolderHealth {
		folder: Folder;
		health: Array<HealthHint>;
	}

	export interface FolderParent {
		id: string;
		name: string;
	}

	export interface ArtworkImage {
		id: string;
		name: string;
		types: Array<ArtworkImageType>;
		height?: number;
		width?: number;
		format?: string;
		size: number;
	}

	export interface FolderMBTag {
		artistID?: string;
		releaseID?: string;
		releaseGroupID?: string;
	}

	export interface FolderTag {
		album?: string;
		albumType?: AlbumType;
		artist?: string;
		artistSort?: string;
		genre?: string;
		year?: number;
		musicbrainz?: FolderMBTag;
	}

	export interface FolderChildren {
		folders: Array<Folder>;
		tracks: Array<Track>;
	}

	export interface FolderIndexEntry {
		name: string;
		folderID: string;
		trackCount: number;
	}

	export interface FolderIndexGroup {
		name: string;
		entries: Array<FolderIndexEntry>;
	}

	export interface FolderIndex {
		lastModified: number;
		groups: Array<FolderIndexGroup>;
	}

	/*
	 * Album Data
	 */

	export interface Album extends Base {
		artist?: string;
		tag?: AlbumTag;
		albumType: AlbumType;
		trackCount: number;
		artistID: string;
		trackIDs?: Array<string>;
		tracks?: Array<Track>;
		info?: ExtendedInfo;
	}

	export interface AlbumTag {
		duration: number;
		created: number;
		genre?: string;
		year?: number;
		musicbrainz?: {
			artistID?: string;
			albumID?: string;
		};
	}

	export interface AlbumList extends ListResult {
		items: Array<Album>;
	}

	export interface AlbumIndexEntry {
		id: string;
		name: string;
		artist: string;
		artistID: string;
		trackCount: number;
	}

	export interface AlbumIndexGroup {
		name: string;
		entries: Array<AlbumIndexEntry>;
	}

	export interface AlbumIndex {
		lastModified: number;
		groups: Array<AlbumIndexGroup>;
	}

	/*
	 * Artist Data
	 */

	export interface Artist extends Base {
		albumCount: number;
		trackCount: number;
		musicbrainz?: {
			artistID?: string;
		};
		albumTypes: Array<AlbumType>;
		tracks?: Array<Track>;
		trackIDs?: Array<string>;
		albumIDs?: Array<string>;
		albums?: Array<Album>;
		similar?: Array<Artist>;
		info?: ExtendedInfo;
	}

	export interface ArtistList extends ListResult {
		items: Array<Artist>;
	}

	export interface ArtistIndexEntry {
		name: string;
		artistID: string;
		trackCount: number;
	}

	export interface ArtistIndexGroup {
		name: string;
		entries: Array<ArtistIndexEntry>;
	}

	export interface ArtistIndex {
		lastModified: number;
		groups: Array<ArtistIndexGroup>;
	}

	/*
	 * Playlist Data
	 */

	export interface Playlist extends Base {
		userID: string;
		isPublic: boolean;
		comment?: string;
		duration: number;
		trackCount: number;
		changed: number;
		tracks?: Array<Track>;
		trackIDs?: Array<string>;
	}

	export interface PlaylistList extends ListResult {
		items: Array<Playlist>;
	}

	/*
	 * Stats Data
	 */

	export interface StatsAlbumTypes {
		album: number;
		compilation: number;
		artist_compilation: number;
		unknown: number;
		live: number;
		audiobook: number;
		audiodrama: number;
		soundtrack: number;
		bootleg: number;
		ep: number;
		single: number;
	}

	export interface Stats {
		rootID?: string;
		track: number;
		folder: number;
		artist: number;
		artistTypes: StatsAlbumTypes;
		album: number;
		albumTypes: StatsAlbumTypes;
	}

	/*
	 * Session User Data
	 */

	export interface Roles {
		stream?: boolean;
		upload?: boolean;
		podcast?: boolean;
		admin?: boolean;
	}

	export interface SessionUser extends Base {
		roles: Roles;
	}

	/*
	 * User Data
	 */

	export interface User extends Base {
		email: string;
		roles: Roles;
	}

	export interface UserList extends ListResult {
		items: Array<User>;
	}

	/*
	 * Genre Data
	 */

	export interface Genre {
		name: string;
		trackCount: number;
		albumCount: number;
		artistCount: number;
	}

	export interface GenreList extends ListResult {
		items: Array<Genre>;
	}

	/*
	 * Chat Data
	 */

	export interface ChatMessage {
		username: string;
		userID: string;
		time: number;
		message: string;
	}

	/*
	 * PlayQueue Data
	 */

	export interface PlayQueue {
		trackIDs?: Array<string>;
		tracks?: Array<Track>;
		currentID?: string;
		position?: number;
		changed: number;
		changedBy: string;
	}

	/*
	 * AutoComplete Data
	 */

	export interface AutoComplete {
		tracks?: Array<{ id: string; name: string; }>;
		artists?: Array<{ id: string; name: string; }>;
		albums?: Array<{ id: string; name: string; }>;
		folders?: Array<{ id: string; name: string; }>;
		playlists?: Array<{ id: string; name: string; }>;
		podcasts?: Array<{ id: string; name: string; }>;
		episodes?: Array<{ id: string; name: string; }>;
	}

	/*
	 * AdminSettings Data
	 */

	export interface AdminSettingsChat {
		maxMessages: number;
		maxAge: {
			value: number;
			unit: string;
		};
	}

	export interface AdminSettingsIndex {
		ignoreArticles: Array<string>;
	}

	export interface AdminSettingsLibrary {
		scanAtStart: boolean;
	}

	export interface AdminSettings {
		chat: AdminSettingsChat;
		index: AdminSettingsIndex;
		library: AdminSettingsLibrary;
	}

	/*
	 * AdminChangeQueueInfo Data
	 */

	export interface AdminChangeQueueInfo {
		id: string;
		pos?: number;
		error?: string;
		done?: number;
	}

	/*
	 * Metadata Data
	 */

	export interface WikipediaSummary {
		title: string;
		summary: string;
		url: string;
	}

	export interface WikipediaSummaryResponse {
		summary?: WikipediaSummary;
	}

	export interface WikidataLookupResponse {
		entity?: WikiData.Entity;
	}

	export interface LastFMResponse extends LastFM.Result {
	}

	export interface AcoustidResponse extends Acoustid.Result {
	}

	export interface MusicBrainzResponse extends MusicBrainz.Response {
	}

	export interface AcousticBrainzResponse extends AcousticBrainz.Response {
	}

	export interface CoverArtArchiveResponse extends CoverArtArchive.Response {
	}

	export interface ExternalFormats {
		coverartarchive: CoverArtArchiveResponse;
		acousticbrainz: AcousticBrainzResponse;
		musicbrainz: MusicBrainzResponse;
		lastfm: LastFMResponse;
		acoustid: AcoustidResponse;
		wikidata: WikidataLookupResponse;
	}

}