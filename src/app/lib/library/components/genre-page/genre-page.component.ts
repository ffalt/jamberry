import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ObjsLoaderComponent } from '../objs-loader/objs-loader.component';
import type { SearchTab } from '../search-page/search-page.component';
import { TracksLoaderComponent } from '../tracks-loader/tracks-loader.component';
import type { HeaderTab } from '@core/components/header-tabs/header-tabs.component';
import { LibraryService } from '../../services/library/library.service';
import { HeaderIconSectionComponent } from '@core/components/header-icon-section/header-icon-section.component';
import { IconGenreComponent } from '@core/components/icons/icon-genre.component';

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
export class GenrePageComponent {
	readonly title = signal('Genre');
	readonly genreID = signal<string | undefined>(undefined);
	genre = '';
	mode?: string;
	library = inject(LibraryService);
	tabsObjs: GenreTabs = {
		artists: { id: 'artist', label: 'Artist', click: noClick },
		albums: { id: 'album', label: 'Album', click: noClick },
		tracks: { id: 'track', label: 'Track', click: noClick }
	};

	currentTab: GenreTab = this.tabsObjs.artists;
	tabs: Array<HeaderTab> = Object.values(this.tabsObjs).map(tab => {
		tab.click = (): void => {
			this.setCurrentTab(tab);
		};
		return tab;
	});

	readonly headerIcon = IconGenreComponent;

	private readonly route = inject(ActivatedRoute);
	private readonly lifeRef = inject(DestroyRef);

	constructor() {
		this.route.paramMap
			.pipe(takeUntilDestroyed(this.lifeRef))
			.subscribe(parameterMap => {
				this.genre = parameterMap.get('name') ?? '';
				this.title.set(`Genre: ${this.genre}`);
				this.genreID.set(parameterMap.get('id') ?? undefined);
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
}
