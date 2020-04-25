import {Component, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NotifyService} from '@core/services';
import {JamService} from '@jam';
import {SearchTab} from '@library/components';
import {LibraryService} from '@library/services';
import {HeaderTab} from '@shared/components';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

export interface GenreTab extends HeaderTab {
	id: string;
}

export interface GenreTabs {
	artists: GenreTab;
	albums: GenreTab;
	tracks: GenreTab;
}

@Component({
	selector: 'app-page-genre',
	templateUrl: './genre-page.component.html',
	styleUrls: ['./genre-page.component.scss']
})
export class GenrePageComponent implements OnDestroy {
	title = 'Genre';
	genre = '';
	mode: string;
	tabsObjs: GenreTabs = {
		artists: {id: 'artist', label: 'Artist'},
		albums: {id: 'album', label: 'Album'},
		tracks: {id: 'track', label: 'Track'}
	};
	currentTab: GenreTab = this.tabsObjs.artists;
	tabs: Array<HeaderTab> = Object.keys(this.tabsObjs).map(key => {
		const tab = this.tabsObjs[key];
		tab.click = () => {
			this.setCurrentTab(tab);
		};
		return tab;
	});
	protected unsubscribe = new Subject();

	constructor(
		protected jam: JamService, protected notify: NotifyService, public library: LibraryService,
		protected route: ActivatedRoute
	) {
		this.route.params
			.pipe(takeUntil(this.unsubscribe)).subscribe(params => {
			this.genre = params.genre;
			this.title = `Genre: ${params.genre}`;
			// this.refresh();
		});
	}

	setCurrentTab(tab: SearchTab): void {
		this.currentTab = tab;
		this.tabs.forEach(t => t.active = false);
		tab.active = true;
		// this.search();
	}

	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}

	// private refresh(): void {
		//
	// }
}
