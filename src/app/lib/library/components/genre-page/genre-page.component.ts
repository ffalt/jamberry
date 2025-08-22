import { Component, inject, type OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ObjsLoaderComponent } from '../objs-loader/objs-loader.component';
import type { SearchTab } from '../search-page/search-page.component';
import { TracksLoaderComponent } from '../tracks-loader/tracks-loader.component';
import type { HeaderTab } from '@core/components/header-tabs/header-tabs.component';
import { LibraryService } from '../../services/library/library.service';
import { HeaderIconSectionComponent } from '@core/components/header-icon-section/header-icon-section.component';

export interface GenreTab extends HeaderTab {
	id: string;
}

export interface GenreTabs {
	artists: GenreTab;
	albums: GenreTab;
	tracks: GenreTab;

	[name: string]: GenreTab;
}

const noClick = (): void => {
	// nop
};

@Component({
	selector: 'app-page-genre',
	templateUrl: './genre-page.component.html',
	styleUrls: ['./genre-page.component.scss'],
	imports: [ObjsLoaderComponent, TracksLoaderComponent, HeaderIconSectionComponent]
})
export class GenrePageComponent implements OnDestroy {
	title = 'Genre';
	genre = '';
	genreID?: string;
	mode?: string;
	library = inject(LibraryService);
	tabsObjs: GenreTabs = {
		artists: { id: 'artist', label: 'Artist', click: noClick },
		albums: { id: 'album', label: 'Album', click: noClick },
		tracks: { id: 'track', label: 'Track', click: noClick }
	};

	currentTab: GenreTab = this.tabsObjs.artists;
	tabs: Array<HeaderTab> = Object.keys(this.tabsObjs).map(key => {
		const tab = this.tabsObjs[key];
		tab.click = (): void => {
			this.setCurrentTab(tab);
		};
		return tab;
	});

	private readonly route = inject(ActivatedRoute);
	private readonly unsubscribe = new Subject<void>();

	constructor() {
		this.route.paramMap
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(paramMap => {
				this.genre = paramMap.get('name') ?? '';
				this.title = `Genre: ${this.genre}`;
				this.genreID = paramMap.get('id') ?? undefined;
				// TODO: load genre by id if param.name is empty
			});
	}

	setCurrentTab(tab: SearchTab): void {
		this.currentTab = tab;
		for (const t of this.tabs) {
			t.active = false;
		}
		tab.active = true;
	}

	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}
}
