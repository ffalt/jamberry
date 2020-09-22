import {Injectable} from '@angular/core';
import {DialogOverlayService} from '@app/modules/dialog-overlay';
import {NotifyService} from '@core/services';
import {Jam, JamObjectType, JamService} from '@jam';
import {DialogRateComponent, RateEdit} from '@shared/components';

@Injectable()
export class ActionsService {

	constructor(
		private jam: JamService, private notify: NotifyService,
		private dialogOverlay: DialogOverlayService
	) {
	}

	rateTrack(track: Jam.Track): void {
		this.rate(JamObjectType.track, track);
	}

	rateAlbum(album: Jam.Album): void {
		this.rate(JamObjectType.album, album);
	}

	rateArtist(artist: Jam.Artist): void {
		this.rate(JamObjectType.artist, artist);
	}

	rateSeries(series: Jam.Series): void {
		this.rate(JamObjectType.series, series);
	}

	rateFolder(folder: Jam.Folder): void {
		this.rate(JamObjectType.folder, folder);
	}

	rateEpisode(episode: Jam.Episode): void {
		this.rate(JamObjectType.episode, episode);
	}

	ratePodcast(podcast: Jam.Podcast): void {
		this.rate(JamObjectType.podcast, podcast);
	}

	rate(type: JamObjectType, base: Jam.Base): void {
		const data: RateEdit = {
			rating: base.state?.rated || 0,
			id: base.id
		};
		this.dialogOverlay.open({
			childComponent: DialogRateComponent,
			data,
			onOkBtn: async () => {
				try {
					const rating = data.rating;
					if (rating === undefined) {
						return;
					}
					await this.jam.state.rate({id: base.id, rating});
					const state = base.state || {};
					state.rated = rating;
					base.state = state;
					this.notify.success('Rated ' + type);
				} catch (e) {
					this.notify.error(e);
					return Promise.reject(e);
				}
			}
		});
	}

	async toggleFav(type: string, base: Jam.Base): Promise<void> {
		base.state = base.state || {};
		const remove = !!base.state.faved;
		try {
			await this.jam.state.fav({id: base.id, remove});
			base.state.faved = remove ? undefined : Date.now();
			this.notify.success(`Favorite ${type} ${remove ? 'removed' : 'added'}`);
		} catch (e) {
			this.notify.error(e);
		}
	}

	async toggleFolderFav(folder: Jam.Folder): Promise<void> {
		return this.toggleFav(JamObjectType.folder, folder);
	}

	async toggleMediaBaseFav(media: Jam.MediaBase): Promise<void> {
		return this.toggleFav(media.objType, media);
	}

	async toggleAlbumFav(album: Jam.Album): Promise<void> {
		return this.toggleFav(JamObjectType.album, album);
	}

	async toggleGenreFav(genre: Jam.Genre): Promise<void> {
		return this.toggleFav(JamObjectType.genre, genre);
	}

	async toggleArtistFav(artist: Jam.Artist): Promise<void> {
		return this.toggleFav(JamObjectType.artist, artist);
	}

	async toggleSeriesFav(series: Jam.Series): Promise<void> {
		return this.toggleFav(JamObjectType.series, series);
	}

	async togglePlaylistFav(playlist: Jam.Playlist): Promise<void> {
		return this.toggleFav(JamObjectType.playlist, playlist);
	}

	async togglePodcastFav(podcast: Jam.Podcast): Promise<void> {
		return this.toggleFav(JamObjectType.podcast, podcast);
	}

	download(base: Jam.Base): void {
		if (base) {
			window.location.href = this.jam.download.downloadUrl({id: base.id});
		}
	}

}
