import { Component, inject, type OnInit } from '@angular/core';
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
export class SidebarLibraryComponent implements OnInit {
	root?: Jam.Root;
	stats?: Jam.Stats;
	mainList: Array<SidebarListItem> = [];
	musicList: Array<SidebarListItem> = [];
	spokenList: Array<SidebarListItem> = [];
	sections: Array<SidebarList> = [];
	private readonly notify = inject(NotifyService);
	private readonly jam = inject(JamService);

	ngOnInit(): void {
		this.updateNavigation();
		this.refreshStats();
	}

	refreshStats(): void {
		this.jam.stats.get({})
			.then(stats => {
				this.stats = stats;
				this.updateNavigation();
			})
			.catch((error: unknown) => {
				this.notify.error(error);
			});
	}

	updateNavigation(): void {
		this.mainList = [
			{ link: '/library/', name: 'Home', icon: IconBrowseComponent, options: { exact: true } },
			{ link: '/library/search', name: 'Search', icon: IconSearchComponent },
			{ link: '/library/playlists', name: 'Playlists', icon: IconPlaylistComponent },
			{ link: '/library/genres', name: 'Genres', icon: IconGenreComponent },
			{ link: '/library/landscape', name: 'Landscape', icon: IconGenreComponent }
		];
		this.spokenList = [
			{ link: '/library/podcasts', name: 'Podcasts', icon: IconPodcastsComponent }];
		if (this.stats && this.stats.albumTypes.audiobook > 0) {
			this.spokenList.push({ link: '/library/audiobooks', name: 'Books', icon: IconAudiobookComponent });
		}
		if (this.stats && this.stats.series > 0) {
			this.spokenList.push({ link: '/library/series', name: 'Series', icon: IconSeriesComponent });
		}
		this.musicList = [
			{ link: '/library/artists', name: 'Artists', icon: IconArtistComponent },
			{ link: '/library/albums', name: 'Albums', icon: IconAlbumComponent }
		];
		if (this.stats && this.stats.albumTypes.compilation > 0) {
			this.musicList.push({ link: '/library/compilations', name: 'Compilations', icon: IconCompilationComponent });
		}
		if (this.stats && this.stats.albumTypes.soundtrack > 0) {
			this.musicList.push({ link: '/library/soundtracks', name: 'Soundtracks', icon: IconSoundtrackComponent });
		}
		this.musicList.push(
			{ link: '/library/tracks', name: 'Tracks', icon: IconTrackComponent },
			{ link: '/library/folders', name: 'Folders', icon: IconFolderComponent }
		);
		this.sections = [
			{ name: 'Browse', entries: this.mainList },
			{ name: 'Music', entries: this.musicList },
			{ name: 'Spoken', entries: this.spokenList }
		];
	}
}
