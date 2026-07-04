import { EventEmitter, inject, Service, signal } from '@angular/core';

import { type Jam, JamService, PodcastStatus } from '@jam';

@Service()
export class QueueService {
	queueChange = new EventEmitter<void>();
	// Signal-backed so the derived getters (isEmpty/hasPrevious/hasNext) reread reactively under zoneless.
	// Public accessors keep the plain-property API; array mutations reassign so the signal notifies.
	private readonly _entries = signal<Array<Jam.MediaBase>>([]);
	private readonly _currentIndex = signal(-1);
	private readonly _repeatQueue = signal(false);
	private readonly jam = inject(JamService);

	get entries(): Array<Jam.MediaBase> {
		return this._entries();
	}

	set entries(value: Array<Jam.MediaBase>) {
		this._entries.set(value);
	}

	get currentIndex(): number {
		return this._currentIndex();
	}

	set currentIndex(value: number) {
		this._currentIndex.set(value);
	}

	get repeatQueue(): boolean {
		return this._repeatQueue();
	}

	set repeatQueue(value: boolean) {
		this._repeatQueue.set(value);
	}

	get isEmpty(): boolean {
		return this.entries.length === 0;
	}

	get hasPrevious(): boolean {
		return this.currentIndex > 0 && this.entries.length > 1;
	}

	get hasNext(): boolean {
		return !!this.getNext();
	}

	set(tracks?: Array<Jam.Track>): void {
		this.entries = tracks ?? [];
		this.currentIndex = -1;
	}

	indexOfTrack(mediaID: string): number {
		return this.entries.findIndex(t => t.id === mediaID);
	}

	add(track: Jam.MediaBase, allowDuplicates?: boolean): void {
		if (!(allowDuplicates || this.indexOfTrack(track.id) < 0)) {
			return;
		}

		this.entries = [...this.entries, track];
		this.publishChanges();
	}

	addMedias(tracks: Array<Jam.MediaBase>, allowDuplicates?: boolean): number {
		const next = [...this.entries];
		let added = 0;
		if (allowDuplicates) {
			next.push(...tracks);
			added = tracks.length;
		} else {
			const existingIds = new Set(next.map(t => t.id));
			for (const track of tracks) {
				if (existingIds.has(track.id)) {
					continue;
				}

				next.push(track);
				existingIds.add(track.id);
				added++;
			}
		}
		if (added > 0) {
			this.entries = next;
			this.publishChanges();
		}
		return added;
	}

	first(): Jam.MediaBase | undefined {
		if (this.entries.length === 0) {
			return;
		}
		this.currentIndex = 0;
		return this.entries[0];
	}

	getCurrent(): Jam.MediaBase | undefined {
		return this.entries[this.currentIndex];
	}

	getNext(): Jam.MediaBase | undefined {
		if (this.entries.length === 0) {
			return;
		}
		let i = this.currentIndex;
		if (i < this.entries.length - 1) {
			i++;
		} else if (this.repeatQueue) {
			i = 0;
		} else {
			return;
		}
		return this.entries[i];
	}

	next(): Jam.MediaBase | undefined {
		if (this.entries.length === 0) {
			return;
		}
		if (this.currentIndex < this.entries.length - 1) {
			this.currentIndex++;
		} else if (this.repeatQueue) {
			this.currentIndex = 0;
		} else {
			return;
		}
		return this.entries[this.currentIndex];
	}

	previous(): Jam.MediaBase | undefined {
		if (this.entries.length === 0) {
			return;
		}
		if (this.currentIndex > 0) {
			this.currentIndex--;
		} else {
			this.currentIndex = this.entries.length - 1;
		}
		return this.entries[this.currentIndex];
	}

	remove(track: Jam.MediaBase): void {
		const index = this.indexOfTrack(track.id);
		if (index >= 0) {
			this.entries = this.entries.filter((_, i) => i !== index);
			if (index < this.currentIndex) {
				this.currentIndex--;
			} else if (this.currentIndex >= this.entries.length) {
				this.currentIndex = this.entries.length - 1;
			}
			this.publishChanges();
		}
	}

	clear(): void {
		this.entries = [];
		this.currentIndex = -1;
		this.publishChanges();
	}

	shuffle(): void {
		const currentMedia = this.getCurrent();
		const next = [...this.entries];
		for (let i = next.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			const temp = next[i];
			next[i] = next[j];
			next[j] = temp;
		}
		this.entries = next;
		if (currentMedia) {
			this.setIndexByTrack(currentMedia);
		} else {
			this.currentIndex = -1;
		}
		this.publishChanges();
	}

	isPlayed(track: Jam.MediaBase): boolean {
		const index = this.indexOfTrack(track.id);
		return (index < this.currentIndex);
	}

	isInQueue(track: Jam.MediaBase): boolean {
		const index = this.indexOfTrack(track.id);
		return (index >= 0);
	}

	setIndexByTrack(track: Jam.MediaBase): void {
		const index = this.indexOfTrack(track.id);
		if (index > -1) {
			this.currentIndex = index;
		}
	}

	publishChanges(): void {
		this.queueChange.emit();
	}

	async addEpisode(episode: Jam.Episode): Promise<number> {
		return this.addMedias([episode]);
	}

	async addPodcast(podcast: Jam.Podcast): Promise<number> {
		const data = await this.jam.episode.search({
			podcastIDs: [podcast.id],
			statuses: [PodcastStatus.completed],
			episodeIncTag: true,
			episodeIncState: true
		});
		return this.addMedias(data.items);
	}

	async addFolder(folder: Jam.Folder): Promise<number> {
		const data = await this.jam.folder.tracks({ childOfID: folder.id, trackIncTag: true, trackIncState: true });
		return this.addMedias(data.items);
	}

	async addSeries(series: Jam.Series): Promise<number> {
		const data = await this.jam.series.tracks({ ids: [series.id], trackIncTag: true, trackIncState: true });
		return this.addMedias(data.items);
	}

	async addPlaylist(playlist: Jam.Playlist): Promise<number> {
		const data = await this.jam.playlist.entries({
			ids: [playlist.id],
			trackIncTag: true,
			trackIncState: true,
			episodeIncTag: true,
			episodeIncState: true
		});
		return this.addMedias(data.items);
	}

	async addAlbums(albums: Array<Jam.Album>): Promise<number> {
		const data = await this.jam.album.tracks({ ids: albums.map(a => a.id), trackIncTag: true, trackIncState: true });
		return this.addMedias(data.items);
	}

	async addAlbum(album: Jam.Album): Promise<number> {
		const data = await this.jam.album.tracks({ ids: [album.id], trackIncTag: true, trackIncState: true });
		return this.addMedias(data.items);
	}

	async addAlbumByID(id: string): Promise<number> {
		const data = await this.jam.album.tracks({ ids: [id], trackIncTag: true, trackIncState: true });
		return this.addMedias(data.items);
	}

	async addArtist(artist: Jam.Artist): Promise<number> {
		const data = await this.jam.artist.tracks({ ids: [artist.id], trackIncTag: true, trackIncState: true });
		return this.addMedias(data.items);
	}

	async addArtists(artists: Array<Jam.Artist>): Promise<number> {
		const data = await this.jam.artist.tracks({ ids: artists.map(a => a.id), trackIncTag: true, trackIncState: true });
		return this.addMedias(data.items);
	}

	async addArtistByID(artistID: string): Promise<number> {
		const data = await this.jam.artist.tracks({ ids: [artistID], trackIncTag: true, trackIncState: true });
		return this.addMedias(data.items);
	}
}
