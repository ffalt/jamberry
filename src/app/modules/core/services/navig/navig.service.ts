import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Jam} from '@jam';

@Injectable({
	providedIn: 'root'
})
export class NavigService {

	constructor(private router: Router) {
	}

	toTrackID(id: string, name: string): void {
		this.navigate([`/library/tracks/id/${id}`, {name}]);
	}

	toFolderID(id: string, name: string): void {
		this.navigate([`/library/folders/id/${id}`, {name}]);
	}

	toPlaylistID(id: string, name: string): void {
		this.navigate([`/library/playlists/id/${id}`, {name}]);
	}

	toPodcastID(id: string, name: string): void {
		this.navigate([`/library/podcasts/id/${id}`, {name}]);
	}

	toPodcastEpisodeID(id: string, name: string): void {
		this.navigate([`/library/episodes/id/${id}`, {name}]);
	}

	toSeriesID(id: string, name: string): void {
		this.navigate([`/library/series/id/${id}`, {name}]);
	}

	toArtistID(id: string, name: string): void {
		this.navigate([`/library/artists/id/${id}`, {name}]);
	}

	toAlbumID(id: string, name: string): void {
		this.navigate([`/library/albums/id/${id}`, {name}]);
	}

	toPodcasts(): void {
		this.navigate(['/library/podcasts']);
	}

	toPodcastSearch(): void {
		this.navigate(['/library/podcasts/search']);
	}

	toPlaylists(): void {
		this.navigate(['/library/playlists']);
	}

	toLibraryStart(): void {
		this.navigate(['/library/']);
	}

	toUser(): void {
		this.navigate(['/user/']);
	}

	toUserSettings(): void {
		this.navigate(['/user/settings']);
	}

	toAbout(): void {
		this.navigate(['/about']);
	}

	toAdmin(): void {
		this.navigate(['/admin']);
	}

	toLogout(): void {
		this.navigate(['/logout']);
	}

	toGenreID(genre: string): void {
		this.navigate([`/library/genres/id/${genre}`]);
	}

	toGenre(genre: Jam.Genre): void {
		this.toGenreID(genre.name);
	}

	toPodcast(podcast: Jam.Podcast): void {
		this.toPodcastID(podcast.id, podcast.name);
	}

	toFolder(folder: Jam.Folder): void {
		this.toFolderID(folder.id, folder.name);
	}

	toTrack(track: Jam.Track): void {
		this.toTrackID(track.id, track.tag?.title || track.name);
	}

	toPodcastEpisode(episode: Jam.Episode): void {
		this.toPodcastEpisodeID(episode.id, episode.name);
	}

	toSeries(series: Jam.Series): void {
		this.toSeriesID(series.id, series.name);
	}

	toArtist(artist: Jam.Artist): void {
		this.toArtistID(artist.id, artist.name);
	}

	toAlbum(album: Jam.Album): void {
		this.toAlbumID(album.id, album.name);
	}

	toPlaylist(playlist: Jam.Playlist): void {
		this.toPlaylistID(playlist.id, playlist.name);
	}

	navigate(commands: Array<any>): void {
		this.router.navigate(commands).catch(e => {
			console.error(e);
		});
	}

}
