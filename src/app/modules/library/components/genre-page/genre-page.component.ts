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
	[name: string]: GenreTab;

	artists: GenreTab;
	albums: GenreTab;
	tracks: GenreTab;
}

const noClick = (): void => {
	// nop
};

@Component({
	selector: 'app-page-genre',
	templateUrl: './genre-page.component.html',
	styleUrls: ['./genre-page.component.scss']
})
export class GenrePageComponent implements OnDestroy {
	title = 'Genre';
	genre = '';
	genreID?: string;
	mode?: string;
	tabsObjs: GenreTabs = {
		artists: {id: 'artist', label: 'Artist', click: noClick},
		albums: {id: 'album', label: 'Album', click: noClick},
		tracks: {id: 'track', label: 'Track', click: noClick}
	};
	currentTab: GenreTab = this.tabsObjs.artists;
	tabs: Array<HeaderTab> = Object.keys(this.tabsObjs).map(key => {
		const tab = this.tabsObjs[key];
		tab.click = (): void => {
			this.setCurrentTab(tab);
		};
		return tab;
	});
	protected unsubscribe = new Subject<void>();

	constructor(
		protected jam: JamService, protected notify: NotifyService, public library: LibraryService,
		protected route: ActivatedRoute
	) {
		this.route.params
			.pipe(takeUntil(this.unsubscribe)).subscribe(params => {
			this.genre = params.name;
			this.title = `Genre: ${params.name}`;
			this.genreID = params.id;
			// TODO: load genre by id if param.name is empty
		});
	}

	setCurrentTab(tab: SearchTab): void {
		this.currentTab = tab;
		this.tabs.forEach(t => t.active = false);
		tab.active = true;
	}

	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}
}
