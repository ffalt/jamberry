import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {JamAlbumType} from '@app/utils/jam-lists';
import {Jam} from '@jam';

@Injectable({
	providedIn: 'root'
})
export class NavigService {

	constructor(private router: Router) {
	}

	toFolder(folder: Jam.Folder): void {
		this.navigate([`/library/folder/${folder.id}`, {name: folder.name}]);
	}

	toTrack(track: Jam.Track): void {
		this.navigate([`/library/track/${track.id}`, {name: track.tag.title}]);
	}

	toTrackID(trackID: string, name: string): void {
		this.navigate([`/library/track/${trackID}`, {name}]);
	}

	toFolderID(folderID: string, name: string): void {
		this.navigate([`/library/folder/${folderID}`, {name}]);
	}

	toPlaylistID(playlistID: string, name: string): void {
		this.navigate([`/library/playlist/${playlistID}`, {name}]);
	}

	toPodcasts(): void {
		this.navigate(['/library/podcasts']);
	}

	toPodcastSearch(): void {
		this.navigate(['/library/podcast-search']);
	}

	toPodcast(podcast: Jam.Podcast): void {
		this.navigate([`/library/podcast/${podcast.id}`, {name: podcast.name}]);
	}

	toPodcastID(podcastID: string, name: string): void {
		this.navigate([`/library/podcast/${podcastID}`, {name}]);
	}

	toPodcastEpisodeID(podcastEpisodeID: string, name: string): void {
		this.navigate([`/library/episode/${podcastEpisodeID}`, {name}]);
	}

	toPodcastEpisode(episode: Jam.PodcastEpisode): void {
		this.navigate([`/library/episode/${episode.id}`, {name: episode.name}]);
	}

	toArtistIndexEntry(entry: Jam.ArtistIndexEntry): void {
		this.navigate([`/library/artist/${entry.artistID}`, {name: entry.name}]);
	}

	toFolderIndexEntry(entry: Jam.FolderIndexEntry): void {
		this.navigate([`/library/folder/${entry.folderID}`, {name: entry.name}]);
	}

	toArtist(artist: Jam.Artist): void {
		this.navigate([`/library/artist/${artist.id}`, {name: artist.name}]);
	}

	toArtistID(artistID: string, name: string): void {
		this.navigate([`/library/artist/${artistID}`, {name}]);
	}

	toAlbum(album: Jam.Album): void {
		this.navigate([`/library/album/${album.id}`, {name: album.name}]);
	}

	toAlbumID(albumID: string, name: string): void {
		this.navigate([`/library/album/${albumID}`, {name}]);
	}

	toSimilarTrack(track: Jam.Track): void {
		this.navigate(['/library/tracks/similar', {name: track.name, trackId: track.id}]);
	}

	toPlaylist(playlist: Jam.Playlist): void {
		this.navigate([`/library/playlist/${playlist.id}`, {name: playlist.name}]);
	}

	toFolderEditTags(id: string): void {
		this.navigate([`/admin/folder/${id}/tags`]);
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

	toAlbums(albumtype: JamAlbumType): void {
		this.navigate([`/library/${albumtype.link}`]);
	}

	private navigate(commands: Array<any>): void {
		this.router.navigate(commands).catch(e => {
			console.error(e);
		});
	}

}
