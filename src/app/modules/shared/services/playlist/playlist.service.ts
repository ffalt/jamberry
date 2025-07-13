import {EventEmitter, Injectable, inject} from '@angular/core';
import {Notifiers} from '@app/utils/notifier';
import {NotifyService} from '@core/services';
import {type Jam, JamService} from '@jam';

@Injectable()
export class PlaylistService {
	playlistsChange = new EventEmitter<Array<Jam.Playlist>>();
	playlistChange = new Notifiers<Jam.Playlist>();
	private playlists: Array<Jam.Playlist> = [];
	private readonly jam = inject(JamService);
	private readonly notify = inject(NotifyService);

	async remove(playlist: Jam.Playlist): Promise<void> {
		await this.jam.playlist.remove({id: playlist.id});
		this.playlists = this.playlists.filter(pl => pl.id !== playlist.id);
		this.playlistsChange.emit(this.playlists);
		this.playlistChange.emit(playlist.id, undefined);
	}

	savePlaylist(playlist: Jam.Playlist, mediaIDs: Array<string>): void {
		this.jam.playlist.update({id: playlist.id, name: playlist.name, isPublic: playlist.isPublic, mediaIDs})
			.then(() => {
				this.notify.success('Playlist updated');
				this.refreshPlaylist(playlist.id);
			})
			.catch(e => {
				this.notify.error(e);
			});
	}

	async getPlaylistEntriesIDs(playlist: Jam.Playlist): Promise<Array<string>> {
		let list: Array<string> = [];
		if (playlist.entriesIDs) {
			list = playlist.entriesIDs;
		} else if (playlist.entries) {
			list = playlist.entries.map(entry => entry.id);
		} else {
			const pl = await this.jam.playlist.id({id: playlist.id, playlistIncEntriesIDs: true});
			list = pl.entriesIDs;
		}
		return list;
	}

	addToPlaylist(playlist: Jam.Playlist, newMediaIDs: Array<string>): void {
		this.getPlaylistEntriesIDs(playlist)
			.then(list => {
				this.savePlaylist(playlist, list.concat(newMediaIDs));
			})
			.catch(e => this.notify.error(e));
	}

	removeFromPlaylist(playlist: Jam.Playlist, removeTrackIDs: Array<string>): void {
		const trackIDs = (playlist.entries || []).map(entry => entry.id).filter(t => removeTrackIDs.includes(t));
		this.savePlaylist(playlist, trackIDs);
	}

	refreshPlaylist(id: string): void {
		this.jam.playlist.id({
			id,
			playlistIncEntries: true,
			playlistIncState: true,
			trackIncTag: true,
			trackIncState: true,
			episodeIncTag: true,
			episodeIncState: true
		})
			.then(playlist => {
				const index = this.playlists.findIndex(p => p.id === id);
				if (index < 0) {
					this.playlists.push(playlist);
				} else {
					this.playlists[index] = playlist;
				}
				this.playlistsChange.emit(this.playlists);
				this.playlistChange.emit(id, playlist);
			})
			.catch(e => {
				this.notify.error(e);
			});
	}

	async getTracks(id: string): Promise<Array<Jam.MediaBase>> {
		const playlist = await this.jam.playlist.id({id, playlistIncEntries: true});
		return (playlist.entries || []);
	}

	async getLists(): Promise<Array<Jam.Playlist>> {
		const list = await this.jam.playlist.search({playlistIncState: true});
		this.playlists = list.items;
		this.playlistsChange.emit(this.playlists);
		return list.items;
	}

	refreshLists(): void {
		this.getLists().catch(e => {
			this.notify.error(e);
		});
	}
}
