import { inject, Injectable } from '@angular/core';
import { DialogOverlayService } from '@modules/dialog-overlay';
import { type Jam, JamService, PodcastStatus } from '@jam';
import { DialogsService } from '../dialogs/dialogs.service';
import { PlaylistService } from '../playlist/playlist.service';
import { DialogPlaylistComponent } from '../../components/dialog-playlist/dialog-playlist.component';
import { type ChoosePlaylistData, DialogChoosePlaylistComponent } from '../../components/dialog-add-to-playlist/dialog-add-to-playlist.component';
import { NotifyService } from '../notify/notify.service';

export interface PlaylistEdit {
	playlist?: Jam.Playlist;
	name: string;
	comment: string;
	isPublic: boolean;
	entries: Array<Jam.MediaBase>;
}

@Injectable({
	providedIn: 'root'
})
export class PlaylistDialogsService {
	private readonly jam = inject(JamService);
	private readonly notify = inject(NotifyService);
	private readonly playlistService = inject(PlaylistService);
	private readonly dialogOverlay = inject(DialogOverlayService);
	private readonly dialogsService = inject(DialogsService);

	newPlaylist(entries?: Array<Jam.MediaBase>): void {
		const edit: PlaylistEdit = {
			name: '',
			comment: '',
			isPublic: false,
			entries: entries ? [...entries] : []
		};
		this.dialogOverlay.open<PlaylistEdit>({
			childComponent: DialogPlaylistComponent,
			title: 'New Playlist',
			data: edit,
			onOkBtn: async () => {
				try {
					await this.applyDialogPlaylist(edit);
					this.notify.success('Playlist created');
				} catch (error) {
					this.notify.error(error);
					return Promise.reject(error);
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
				.catch((error: unknown) => {
					this.notify.error(error);
				});
		});
	}

	editPlaylist(playlist: Jam.Playlist): void {
		this.getPlaylistMedias(playlist.id)
			.then(medias => {
				const edit: PlaylistEdit = {
					name: playlist.name,
					comment: playlist.comment ?? '',
					isPublic: playlist.isPublic,
					entries: [...medias],
					playlist
				};
				this.dialogOverlay
					.open<PlaylistEdit>({
						childComponent: DialogPlaylistComponent,
						title: 'Edit Playlist',
						data: edit,
						onOkBtn: async () => {
							try {
								await this.applyDialogPlaylist(edit);
								this.notify.success('Playlist updated');
							} catch (error) {
								this.notify.error(error);
								return Promise.reject(error);
							}
						},
						onCancelBtn: async () => Promise.resolve()
					});
			})
			.catch((error: unknown) => {
				this.notify.error(error);
			});
	}

	async getPlaylistMedias(id: string): Promise<Array<Jam.MediaBase>> {
		const playlist = await this.jam.playlist.id({ id, playlistIncEntries: true });
		return playlist.entries ?? [];
	}

	async applyDialogPlaylist(edit: PlaylistEdit): Promise<void> {
		const mediaIDs = edit.entries.map(t => t.id);
		if (edit.playlist) {
			await this.jam.playlist.update({
				id: edit.playlist.id,
				name: edit.name,
				isPublic: edit.isPublic,
				comment: edit.comment,
				mediaIDs
			});
			this.playlistService.refreshPlaylist(edit.playlist.id);
		} else if (edit.name.length > 0) {
			await this.jam.playlist.create({
				name: edit.name,
				isPublic: edit.isPublic,
				comment: edit.comment,
				mediaIDs
			});
			this.playlistService.refreshLists();
		}
	}

	choosePlaylist(getMedias: () => Promise<Array<Jam.MediaBase>>): void {
		const data: ChoosePlaylistData = { getMedias };
		this.dialogOverlay.open<ChoosePlaylistData>({
			childComponent: DialogChoosePlaylistComponent,
			title: 'Choose Playlist',
			panelClass: 'overlay-panel-large',
			data
		});
	}

	// unify with player.addXYZ functions

	addTrack(track: Jam.Track): void {
		this.choosePlaylist(async () => PlaylistDialogsService.mediasPromise([track]));
	}

	addAlbum(album: Jam.Album): void {
		this.choosePlaylist(async () => (this.jam.album.tracks({ ids: [album.id], trackIncTag: true, trackIncState: true }))
			.then(data => data.items));
	}

	addFolder(folder: Jam.Folder): void {
		this.choosePlaylist(async () => this.jam.folder.tracks({ childOfID: folder.id, trackIncTag: true, trackIncState: true })
			.then(data => data.items));
	}

	addArtist(artist: Jam.Artist): void {
		this.choosePlaylist(async () => this.jam.artist.tracks({ ids: [artist.id], trackIncTag: true, trackIncState: true })
			.then(data => data.items));
	}

	addPlaylist(playlist: Jam.Playlist): void {
		this.choosePlaylist(async () => this.jam.playlist.entries({
			ids: [playlist.id],
			trackIncTag: true,
			trackIncState: true,
			episodeIncTag: true,
			episodeIncState: true
		})
			.then(data => data.items));
	}

	addSeries(series: Jam.Series): void {
		this.choosePlaylist(async () => this.jam.series.tracks({ ids: [series.id], trackIncTag: true, trackIncState: true })
			.then(data => data.items));
	}

	addPodcast(podcast: Jam.Podcast): void {
		this.choosePlaylist(async () => this.jam.episode.search({
			podcastIDs: [podcast.id],
			episodeIncTag: true,
			episodeIncState: true,
			statuses: [PodcastStatus.completed]
		}).then(data => data.items));
	}

	addEpisode(episode: Jam.Episode): void {
		if (episode.status === PodcastStatus.completed) {
			this.choosePlaylist(async () => PlaylistDialogsService.mediasPromise([episode]));
		}
	}

	private static async mediasPromise(medias: Array<Jam.MediaBase>): Promise<Array<Jam.MediaBase>> {
		return Promise.resolve(medias);
	}
}
