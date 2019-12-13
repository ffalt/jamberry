import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AppService, NotifyService, SidebarProvider} from '@core/services';
import {Jam, JamService} from '@jam';
import {SidebarListItem} from '@library/components';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy, SidebarProvider {
	root: Jam.Root;
	showMobileNavig: boolean = false;
	stats: Jam.Stats;
	mainList: Array<SidebarListItem> = [];
	musicList: Array<SidebarListItem> = [];
	spokenList: Array<SidebarListItem> = [];

	constructor(
		public app: AppService,
		protected router: Router,
		protected notify: NotifyService,
		protected jam: JamService
	) {

	}

	ngOnInit(): void {
		this.updateNavigation();
		this.refreshStats();
		this.app.view.currentSidebar = this;
		this.router.events.forEach(event => {
			this.showMobileNavig = false;
		}).catch(e => {
			console.error(e);
		});
	}

	onNavigate(): void {
		this.showMobileNavig = false;
	}

	ngOnDestroy(): void {
		this.app.view.currentSidebar = undefined;
	}

	toggleMobileNavig(): void {
		this.showMobileNavig = !this.showMobileNavig;
	}

	refreshStats(): void {
		this.jam.various.stats({})
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
			{link: '/library/artist-index', name: 'Browse', icon: 'icon-browse'},
			{link: '/library/search', name: 'Search', icon: 'icon-search'},
			{link: '/library/playlists', name: 'Playlists', icon: 'icon-playlist'}
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
		this.musicList.push({link: '/library/folders/index', name: 'Folders', icon: 'icon-folder'});
	}

}
