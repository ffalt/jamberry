import { Component, computed, inject, signal } from '@angular/core';
import { NotifyService } from '@core/services/notify/notify.service';
import { type Jam, JamService } from '@jam';
import { CurrentPlayingComponent } from '../current-playing/current-playing.component';
import type { SidebarListItem } from '@core/components/sidebar-list-item/sidebar-list-item.component';
import type { SidebarList } from '@core/components/sidebar-list/sidebar-list.component';
import { SidebarComponent } from '@core/components/sidebar/sidebar.component';
import { IconAlbumComponent } from '@core/components/icons/icon-album.component';
import { IconArtistComponent } from '@core/components/icons/icon-artist.component';
import { IconAudiobookComponent } from '@core/components/icons/icon-audiobook.component';
import { IconBrowseComponent } from '@core/components/icons/icon-browse.component';
import { IconCompilationComponent } from '@core/components/icons/icon-compilation.component';
import { IconFolderComponent } from '@core/components/icons/icon-folder.component';
import { IconGenreComponent } from '@core/components/icons/icon-genre.component';
import { IconPlaylistComponent } from '@core/components/icons/icon-playlist.component';
import { IconPodcastsComponent } from '@core/components/icons/icon-podcasts.component';
import { IconSearchComponent } from '@core/components/icons/icon-search.component';
import { IconSeriesComponent } from '@core/components/icons/icon-series.component';
import { IconSoundtrackComponent } from '@core/components/icons/icon-soundtrack.component';
import { IconTrackComponent } from '@core/components/icons/icon-track.component';

@Component({
	selector: 'app-libary-sidebar',
	templateUrl: './sidebar-library.component.html',
	styleUrls: ['./sidebar-library.component.scss'],
	imports: [CurrentPlayingComponent, SidebarComponent]
})
export class SidebarLibraryComponent {
	readonly stats = signal<Jam.Stats | undefined>(undefined);
	readonly sections = computed<Array<SidebarList>>(() => {
		const stats = this.stats();
		const mainList: Array<SidebarListItem> = [
			{ link: '/library/', name: 'Home', icon: IconBrowseComponent, options: { exact: true } },
			{ link: '/library/search', name: 'Search', icon: IconSearchComponent },
			{ link: '/library/playlists', name: 'Playlists', icon: IconPlaylistComponent },
			{ link: '/library/genres', name: 'Genres', icon: IconGenreComponent },
			{ link: '/library/landscape', name: 'Landscape', icon: IconGenreComponent }
		];
		const spokenList: Array<SidebarListItem> = [
			{ link: '/library/podcasts', name: 'Podcasts', icon: IconPodcastsComponent }
		];
		if (stats && stats.albumTypes.audiobook > 0) {
			spokenList.push({ link: '/library/audiobooks', name: 'Books', icon: IconAudiobookComponent });
		}
		if (stats && stats.series > 0) {
			spokenList.push({ link: '/library/series', name: 'Series', icon: IconSeriesComponent });
		}
		const musicList: Array<SidebarListItem> = [
			{ link: '/library/artists', name: 'Artists', icon: IconArtistComponent },
			{ link: '/library/albums', name: 'Albums', icon: IconAlbumComponent }
		];
		if (stats && stats.albumTypes.compilation > 0) {
			musicList.push({ link: '/library/compilations', name: 'Compilations', icon: IconCompilationComponent });
		}
		if (stats && stats.albumTypes.soundtrack > 0) {
			musicList.push({ link: '/library/soundtracks', name: 'Soundtracks', icon: IconSoundtrackComponent });
		}
		musicList.push(
			{ link: '/library/tracks', name: 'Tracks', icon: IconTrackComponent },
			{ link: '/library/folders', name: 'Folders', icon: IconFolderComponent }
		);
		return [
			{ name: 'Browse', entries: mainList },
			{ name: 'Music', entries: musicList },
			{ name: 'Spoken', entries: spokenList }
		];
	});

	private readonly notify = inject(NotifyService);
	private readonly jam = inject(JamService);

	constructor() {
		this.refreshStats();
	}

	refreshStats(): void {
		this.jam.stats.get({})
			.then(stats => {
				this.stats.set(stats);
			})
			.catch((error: unknown) => {
				this.notify.error(error);
			});
	}
}
