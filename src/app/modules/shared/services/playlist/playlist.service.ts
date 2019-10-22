import {EventEmitter, Injectable} from '@angular/core';
import {Notifiers} from '@app/utils/notifier';
import {NotifyService} from '@core/services';
import {Jam, JamService} from '@jam';

@Injectable()
export class PlaylistService {
	playlistsChange = new EventEmitter<Array<Jam.Playlist>>();
	playlistChange = new Notifiers<Jam.Playlist>();
	private playlists: Array<Jam.Playlist> = [];

	constructor(private jam: JamService, private notify: NotifyService) {
	}

	async remove(playlist: Jam.Playlist): Promise<void> {
		await this.jam.playlist.delete({id: playlist.id});
		this.playlists = this.playlists.filter(pl => pl.id !== playlist.id);
		this.playlistsChange.emit(this.playlists);
		this.playlistChange.emit(playlist.id, undefined);
	}

	savePlaylist(playlist: Jam.Playlist, trackIDs: Array<string>): void {
		this.jam.playlist.update({id: playlist.id, trackIDs})
			.then(() => {
				this.notify.success('Playlist updated');
				this.refreshPlaylist(playlist.id);
			})
			.catch(e => {
				this.notify.error(e);
			});
	}

	addToPlaylist(playlist: Jam.Playlist, newTrackIDs: Array<string>): void {
		this.savePlaylist(playlist, (playlist.trackIDs || []).concat(newTrackIDs));
	}

	removeFromPlaylist(playlist: Jam.Playlist, removeTrackIDs: Array<string>): void {
		const trackIDs = (playlist.trackIDs || []).filter(t => removeTrackIDs.includes(t));
		this.savePlaylist(playlist, trackIDs);
	}

	refreshPlaylist(id: string): void {
		this.jam.playlist.id({id, playlistTracks: true, playlistState: true, trackTag: true, trackState: true})
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

	async getTracks(id: string): Promise<Array<Jam.Track>> {
		const playlist = await this.jam.playlist.id({id, playlistTracks: true});
		return playlist.tracks || [];
	}

	async getLists(): Promise<Array<Jam.Playlist>> {
		const list = await this.jam.playlist.search({playlistState: true});
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
