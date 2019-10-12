import {EventEmitter, Injectable} from '@angular/core';
import {DialogOverlayService} from '@app/modules/dialog-overlay';
import {Notifiers} from '@app/utils/notifier';
import {DialogsService, NotifyService} from '@core/services';
import {Jam, JamService} from '@jam';
import {DialogPlaylistComponent} from '@shared/components';

export interface PlaylistEdit {
	playlist?: Jam.Playlist;
	name: string;
	comment: string;
	isPublic: boolean;
	tracks: Array<Jam.Track>;
}

@Injectable()
export class PlaylistService {
	playlistsChange = new EventEmitter<Array<Jam.Playlist>>();
	playlistChange = new Notifiers<Jam.Playlist>();
	private playlists: Array<Jam.Playlist> = [];

	constructor(private jam: JamService, private notify: NotifyService, private dialogOverlay: DialogOverlayService, private dialogsService: DialogsService) {
	}

	newPlaylist(tracks?: Array<Jam.Track>): void {
		const edit: PlaylistEdit = {
			name: '',
			comment: '',
			isPublic: false,
			tracks: tracks ? tracks.slice(0) : []
		};
		this.dialogOverlay.open({
			title: 'New Playlist',
			childComponent: DialogPlaylistComponent,
			data: edit,
			onOkBtn: async () => {
				try {
					await this.applyDialogPlaylist(edit);
					this.notify.success('Playlist created');
				} catch (e) {
					this.notify.error(e);
					return Promise.reject(e);
				}
			},
			onCancelBtn: async () => Promise.resolve()
		});
	}

	removePlaylist(playlist: Jam.Playlist): void {
		this.dialogsService.confirm('Remove Playlist', 'Do you want to remove the playlist?', () => {
			this.remove(playlist)
				.then(() => {
					this.notify.success('Playlist removed');
				})
				.catch(e => {
					this.notify.error(e);
				});
		});
	}

	editPlaylist(playlist: Jam.Playlist): void {
		this.getTracks(playlist.id)
			.then(tracks => {
				const edit: PlaylistEdit = {
					name: playlist.name,
					comment: playlist.comment,
					isPublic: playlist.isPublic,
					tracks: tracks.slice(0),
					playlist
				};
				this.dialogOverlay.open({
						title: 'Edit Playlist',
						childComponent: DialogPlaylistComponent,
						data: edit,
						onOkBtn: async () => {
							try {
								await this.applyDialogPlaylist(edit);
								this.notify.success('Playlist updated');
							} catch (e) {
								this.notify.error(e);
								return Promise.reject(e);
							}
						},
						onCancelBtn: async () => Promise.resolve()
					}
				);
			})
			.catch(e => {
				this.notify.error(e);
			});
	}

	async remove(playlist: Jam.Playlist): Promise<void> {
		await this.jam.playlist.delete({id: playlist.id});
		this.playlists = this.playlists.filter(pl => pl.id !== playlist.id);
		this.playlistsChange.emit(this.playlists);
		this.playlistChange.emit(playlist.id, undefined);
	}

	async applyDialogPlaylist(edit: PlaylistEdit): Promise<void> {
		const trackIDs = edit.tracks.map(t => t.id);
		if (!edit.playlist) {
			if (edit.name.length > 0) {
				const playlist = await this.jam.playlist.create({
					name: edit.name,
					isPublic: edit.isPublic,
					comment: edit.comment,
					trackIDs
				});
				this.playlists.push(playlist);
				this.playlistsChange.emit(this.playlists);
			}
		} else {
			await this.jam.playlist.update({
				id: edit.playlist.id,
				name: edit.name,
				isPublic: edit.isPublic,
				comment: edit.comment,
				trackIDs
			});
			this.refreshPlaylist(edit.playlist.id);
		}
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

	refreshLists(): void {
		this.jam.playlist.search({playlistState: true})
			.then(data => {
				this.playlists = data.items;
				this.playlistsChange.emit(this.playlists);
			})
			.catch(e => {
				this.notify.error(e);
			});
	}

}
