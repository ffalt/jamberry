import {Injectable} from '@angular/core';
import {DialogOverlayService} from '@app/modules/dialog-overlay';
import {NotifyService} from '@core/services';
import {Jam, JamObjectType, JamService} from '@jam';
import {DialogRateComponent, RateEdit} from '@shared/components';

@Injectable()
export class ActionsService {

	constructor(private jam: JamService, private notify: NotifyService, private dialogOverlay: DialogOverlayService) {
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

	rateFolder(folder: Jam.Folder): void {
		this.rate(JamObjectType.folder, folder);
	}

	rateEpisode(episode: Jam.PodcastEpisode): void {
		this.rate(JamObjectType.episode, episode);
	}

	ratePodcast(podcast: Jam.Podcast): void {
		this.rate(JamObjectType.podcast, podcast);
	}

	rate(type: JamObjectType, base: Jam.Base): void {
		const data: RateEdit = {
			rating: base.state.rated || 0,
			id: base.id
		};
		this.dialogOverlay.open({
			childComponent: DialogRateComponent,
			data,
			onOkBtn: async () => {
				try {
					await this.jam.base.rate(type, {id: base.id, rating: data.rating});
					base.state.rated = data.rating;
					this.notify.success('Rated ' + type);
				} catch (e) {
					this.notify.error(e);
					return Promise.reject(e);
				}
			}
		});
	}

	toggleFav(type: string, base: Jam.Base): void {
		base.state = base.state || {};
		const remove = !!base.state.faved;
		this.jam.base.fav(type, {id: base.id, remove})
			.then(() => {
				base.state.faved = remove ? undefined : Date.now();
				this.notify.success('Favorite ' + (remove ? 'removed' : 'added'));
			}).catch(e => {
			this.notify.error(e);
		});
	}

	toggleFolderFav(folder: Jam.Folder): void {
		this.toggleFav(JamObjectType.folder, folder);
	}

	toggleTrackFav(track: Jam.Track): void {
		this.toggleFav(JamObjectType.track, track);
	}

	toggleAlbumFav(album: Jam.Album): void {
		this.toggleFav(JamObjectType.album, album);
	}

	toggleArtistFav(artist: Jam.Artist): void {
		this.toggleFav(JamObjectType.artist, artist);
	}

	togglePlaylistFav(playlist: Jam.Playlist): void {
		this.toggleFav(JamObjectType.playlist, playlist);
	}

	togglePodcastFav(podcast: Jam.Podcast): void {
		this.toggleFav(JamObjectType.podcast, podcast);
	}

	toggleEpisodeFav(episode: Jam.PodcastEpisode): void {
		this.toggleFav(JamObjectType.episode, episode);
	}

	download(base: Jam.Base): void {
		if (base) {
			window.location.href = this.jam.media.download_url(base.id);
		}
	}

}
