import {Injectable} from '@angular/core';
import {DialogOverlayService} from '@app/modules/dialog-overlay';
import {DialogsService, NotifyService} from '@core/services';
import {Jam, JamService, PodcastStatus} from '@jam';
import {ChoosePlaylistData, DialogChoosePlaylistComponent, DialogPlaylistComponent} from '@shared/components';
import {PlaylistService} from '../playlist/playlist.service';

export interface PlaylistEdit {
	playlist?: Jam.Playlist;
	name: string;
	comment: string;
	isPublic: boolean;
	tracks: Array<Jam.Track>;
}

@Injectable()
export class PlaylistDialogsService {

	constructor(
		private jam: JamService, private notify: NotifyService,
		private playlistService: PlaylistService,
		private dialogOverlay: DialogOverlayService, private dialogsService: DialogsService) {
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
			this.playlistService.remove(playlist)
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

	async getTracks(id: string): Promise<Array<Jam.Track>> {
		const playlist = await this.jam.playlist.id({id, playlistTracks: true});
		return playlist.tracks || [];
	}

	async applyDialogPlaylist(edit: PlaylistEdit): Promise<void> {
		const trackIDs = edit.tracks.map(t => t.id);
		if (!edit.playlist) {
			if (edit.name.length > 0) {
				await this.jam.playlist.create({
					name: edit.name,
					isPublic: edit.isPublic,
					comment: edit.comment,
					trackIDs
				});
				this.playlistService.refreshLists();
			}
		} else {
			await this.jam.playlist.update({
				id: edit.playlist.id,
				name: edit.name,
				isPublic: edit.isPublic,
				comment: edit.comment,
				trackIDs
			});
			this.playlistService.refreshPlaylist(edit.playlist.id);
		}
	}

	choosePlaylist(getTracks: () => Promise<Jam.TrackList>): void {
		const data: ChoosePlaylistData = {
			getTracks
		};
		this.dialogOverlay.open({
			title: 'Choose Playlist',
			panelClass: 'overlay-panel-large',
			childComponent: DialogChoosePlaylistComponent,
			data
		});
	}

	// unify with player.addXYZ functions

	addTrack(track: Jam.Track): void {
		this.choosePlaylist(() => PlaylistDialogsService.tracksPromise([track]));
	}

	addAlbum(album: Jam.Album): void {
		this.choosePlaylist(() => this.jam.album.tracks({ids: [album.id], trackTag: true, trackState: true}));
	}

	addFolder(folder: Jam.Folder): void {
		this.choosePlaylist(() => this.jam.folder.tracks({ids: [folder.id], recursive: true, trackTag: true, trackState: true}));
	}

	addArtist(artist: Jam.Artist): void {
		this.choosePlaylist(() => this.jam.artist.tracks({ids: [artist.id], trackTag: true, trackState: true}));
	}

	addSeries(series: Jam.Series): void {
		this.choosePlaylist(() => this.jam.series.tracks({ids: [series.id], trackTag: true, trackState: true}));
	}

	addPodcast(podcast: Jam.Podcast): void {
		this.choosePlaylist(() => this.jam.episode.search({
			podcastID: podcast.id,
			trackTag: true,
			trackState: true,
			status: PodcastStatus.completed
		}));
	}

	addEpisode(episode: Jam.PodcastEpisode): void {
		if (episode.status === PodcastStatus.completed) {
			this.choosePlaylist(() => PlaylistDialogsService.tracksPromise([episode]));
		}
	}

	private static async tracksPromise(tracks: Array<Jam.Track>): Promise<Jam.TrackList> {
		return new Promise<Jam.TrackList>(resolve => {
			resolve({items: tracks});
		});
	}

}
