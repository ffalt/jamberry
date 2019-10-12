import {EventEmitter, Injectable} from '@angular/core';

import {Jam, JamService, PodcastStatus} from '@jam';

@Injectable({
	providedIn: 'root'
})
export class QueueService {
	tracks: Array<Jam.Track> = [];
	currentIndex = -1;
	repeatQueue = false;
	queueChange = new EventEmitter<void>();

	constructor(private jam: JamService) {
	}

	isEmpty(): boolean {
		return this.tracks.length === 0;
	}

	set(tracks: Array<Jam.Track>): void {
		this.tracks = tracks || [];
		this.currentIndex = -1;
	}

	indexOfTrack(track: Jam.Track): number {
		return this.tracks.findIndex(t => t.id === track.id);
	}

	add(track: Jam.Track, allowDuplicates?: boolean): void {
		if (allowDuplicates || this.indexOfTrack(track) < 0) {
			this.tracks.push(track);
			this.publishChanges();
		}
	}

	addTracks(tracks: Array<Jam.Track>, allowDuplicates?: boolean): number {
		let added = 0;
		tracks.forEach(track => {
			if (allowDuplicates || this.indexOfTrack(track) < 0) {
				this.tracks.push(track);
				added++;
			}
		});
		if (added > 0) {
			this.publishChanges();
		}
		return added;
	}

	first(): Jam.Track | undefined {
		if (this.tracks.length === 0) {
			return;
		}
		this.currentIndex = 0;
		return this.tracks[0];
	}

	getCurrent(): Jam.Track | undefined {
		return this.tracks[this.currentIndex];
	}

	getNext(): Jam.Track | undefined {
		if (this.tracks.length === 0) {
			return;
		}
		let i = this.currentIndex;
		if (i < this.tracks.length - 1) {
			i++;
		} else {
			if (this.repeatQueue) {
				i = 0;
			} else {
				return;
			}
		}
		return this.tracks[i];
	}

	next(): Jam.Track | undefined {
		if (this.tracks.length === 0) {
			return;
		}
		if (this.currentIndex < this.tracks.length - 1) {
			this.currentIndex++;
		} else {
			if (this.repeatQueue) {
				this.currentIndex = 0;
			} else {
				return;
			}
		}
		return this.tracks[this.currentIndex];
	}

	previous(): Jam.Track | undefined {
		if (this.tracks.length === 0) {
			return;
		}
		if (this.currentIndex > 0) {
			this.currentIndex--;
		} else {
			this.currentIndex = this.tracks.length - 1;
		}
		return this.tracks[this.currentIndex];
	}

	remove(track: Jam.Track): void {
		const index = this.indexOfTrack(track);
		if (index >= 0) {
			this.tracks.splice(index, 1);
			if (this.currentIndex >= this.tracks.length) {
				this.currentIndex = this.tracks.length - 1;
			}
			this.publishChanges();
		}
	}

	clear(): void {
		this.tracks = [];
		this.currentIndex = -1;
		this.publishChanges();
	}

	shuffle(): void {
		this.tracks.sort(() => 0.5 - Math.random());
		this.publishChanges();
	}

	isPlayed(track: Jam.Track): boolean {
		const index = this.indexOfTrack(track);
		return (index < this.currentIndex);
	}

	isInQueue(track: Jam.Track): boolean {
		const index = this.indexOfTrack(track);
		return (index >= 0);
	}

	setIndexByTrack(track: Jam.Track): void {
		const index = this.indexOfTrack(track);
		if (index > -1) {
			this.currentIndex = index;
		}
	}

	publishChanges(): void {
		this.queueChange.emit();
	}

	async addEpisode(episode: Jam.PodcastEpisode): Promise<number> {
		return this.addTracks([episode]);
	}

	async addPodcast(podcast: Jam.Podcast): Promise<number> {
		const data = await this.jam.episode.search({podcastID: podcast.id, trackTag: true, trackState: true, status: PodcastStatus.completed});
		return this.addTracks(data.items);
	}

	async addFolder(folder: Jam.Folder): Promise<number> {
		const data = await this.jam.folder.tracks({ids: [folder.id], recursive: true, trackTag: true, trackState: true});
		return this.addTracks(data.items);
	}

	async addPlaylist(playlist: Jam.Playlist): Promise<number> {
		const data = await this.jam.playlist.tracks({ids: [playlist.id], trackTag: true, trackState: true});
		return this.addTracks(data.items);
	}

	async addAlbums(albums: Array<Jam.Album>): Promise<number> {
		const data = await this.jam.album.tracks({ids: albums.map(a => a.id), trackTag: true, trackState: true});
		return this.addTracks(data.items);
	}

	async addAlbum(album: Jam.Album): Promise<number> {
		const data = await this.jam.album.tracks({ids: [album.id], trackTag: true, trackState: true});
		return this.addTracks(data.items);
	}

	async addAlbumByID(id: string): Promise<number> {
		const data = await this.jam.album.tracks({ids: [id], trackTag: true, trackState: true});
		return this.addTracks(data.items);
	}

	async addArtist(artist: Jam.Artist): Promise<number> {
		const data = await this.jam.artist.tracks({ids: [artist.id], trackTag: true, trackState: true});
		return this.addTracks(data.items);
	}

	async addArtists(artists: Array<Jam.Artist>): Promise<number> {
		const data = await this.jam.artist.tracks({ids: artists.map(a => a.id), trackTag: true, trackState: true});
		return this.addTracks(data.items);
	}

	async addArtistByID(artistID: string): Promise<number> {
		const data = await this.jam.artist.tracks({ids: [artistID], trackTag: true, trackState: true});
		return this.addTracks(data.items);
	}

}
