import {Component, type OnInit, inject} from '@angular/core';
import {NotifyService} from '@core/services';
import {type Jam, JamService} from '@jam';
import type {SidebarList, SidebarListItem} from '@shared/components';

@Component({
	selector: 'app-libary-sidebar',
	templateUrl: './sidebar-library.component.html',
	styleUrls: ['./sidebar-library.component.scss'],
	standalone: false
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
			.catch(e => {
				this.notify.error(e);
			});
	}

	updateNavigation(): void {
		this.mainList = [
			{link: '/library/', name: 'Browse', icon: 'icon-browse', options: {exact: true}},
			{link: '/library/search', name: 'Search', icon: 'icon-search'},
			{link: '/library/playlists', name: 'Playlists', icon: 'icon-playlist'},
			{link: '/library/genres', name: 'Genres', icon: 'icon-genre'}
		];
		this.spokenList = [
			{link: '/library/podcasts', name: 'Podcasts', icon: 'icon-podcasts'}];
		if (this.stats && this.stats.albumTypes.audiobook > 0) {
			this.spokenList.push({link: '/library/audiobooks', name: 'Books', icon: 'icon-audiobook'});
		}
		if (this.stats && this.stats.series > 0) {
			this.spokenList.push({link: '/library/series', name: 'Series', icon: 'icon-series'});
		}
		this.musicList = [
			{link: '/library/artists', name: 'Artists', icon: 'icon-artist'},
			{link: '/library/albums', name: 'Albums', icon: 'icon-album'}
		];
		if (this.stats && this.stats.albumTypes.compilation > 0) {
			this.musicList.push({link: '/library/compilations', name: 'Compilations', icon: 'icon-compilation'});
		}
		if (this.stats && this.stats.albumTypes.soundtrack > 0) {
			this.musicList.push({link: '/library/soundtracks', name: 'Soundtracks', icon: 'icon-soundtrack'});
		}
		this.musicList.push({link: '/library/tracks', name: 'Tracks', icon: 'icon-track'});
		this.musicList.push({link: '/library/folders', name: 'Folders', icon: 'icon-folder'});

		this.sections = [
			{name: 'Main', entries: this.mainList},
			{name: 'Spoken', entries: this.spokenList},
			{name: 'Music', entries: this.musicList}
		];
	}
}
