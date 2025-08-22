import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AlbumType, type Jam, type JamParameters, JamService } from '@jam';
import { EpisodesLoaderComponent } from '../episodes-loader/episodes-loader.component';
import { ObjsLoaderComponent } from '../objs-loader/objs-loader.component';
import { TracksLoaderComponent } from '../tracks-loader/tracks-loader.component';
import { AutocompleteComponent } from '@modules/autocomplete/autocomplete.component';
import { HighlightPipe } from '@modules/autocomplete/option/option-highlight.pipe';
import type { AutocompleteDataControl, AutocompleteOption } from '@modules/autocomplete/autocomplete.types';
import { OptionComponent } from '@modules/autocomplete/option/option.component';
import { AutocompleteContentDirective } from '@modules/autocomplete/autocomplete-content.directive';
import { AutocompleteDirective } from '@modules/autocomplete/autocomplete.directive';
import type { HeaderTab } from '@core/components/header-tabs/header-tabs.component';
import { LibraryService } from '../../services/library/library.service';
import { HeaderIconSectionComponent } from '@core/components/header-icon-section/header-icon-section.component';

interface AutoCompleteAccess extends Jam.AutoComplete {
	[key: string]: Array<Jam.AutoCompleteEntry> | undefined;
}

export interface SearchTab extends HeaderTab {
	id: string;
}

export interface SearchTabs {
	artists: SearchTab;
	albums: SearchTab;
	folders: SearchTab;
	podcasts: SearchTab;
	episodes: SearchTab;
	series: SearchTab;
	playlists: SearchTab;
	tracks: SearchTab;

	[name: string]: SearchTab;
}

const noClick = (): void => {
	// nop;
};

@Component({
	selector: 'app-page-search',
	templateUrl: './search-page.component.html',
	styleUrls: ['./search-page.component.scss'],
	imports: [
		FormsModule,
		TracksLoaderComponent, EpisodesLoaderComponent, ObjsLoaderComponent,
		AutocompleteComponent, OptionComponent, AutocompleteDirective,
		HighlightPipe, AutocompleteContentDirective, HeaderIconSectionComponent
	]
})
export class SearchPageComponent implements AutocompleteDataControl<{ name: string }> {
	readonly library = inject(LibraryService);
	AlbumType = AlbumType;
	value: string = '';
	query: string = '';
	tabsObjs: SearchTabs = {
		artists: { id: 'artist', label: 'Artist', click: noClick },
		albums: { id: 'album', label: 'Album', click: noClick },
		folders: { id: 'folder', label: 'Folder', click: noClick },
		podcasts: { id: 'podcast', label: 'Podcast', click: noClick },
		episodes: { id: 'episode', label: 'Episodes', click: noClick },
		series: { id: 'series', label: 'Series', click: noClick },
		playlists: { id: 'playlist', label: 'Playlist', click: noClick },
		tracks: { id: 'track', label: 'Track', click: noClick }
	};

	currentTab: SearchTab = this.tabsObjs.artists;
	tabs: Array<HeaderTab> = Object.keys(this.tabsObjs).map(key => {
		const tab = this.tabsObjs[key];
		tab.click = (): void => {
			this.setCurrentTab(tab);
		};
		return tab;
	});

	private readonly jam = inject(JamService);

	constructor() {
		this.currentTab = this.tabsObjs.artists;
		this.currentTab.active = true;
	}

	setCurrentTab(tab: SearchTab): void {
		this.currentTab = tab;
		for (const t of this.tabs) {
			t.active = false;
		}
		tab.active = true;
		this.search();
	}

	search(): void {
		this.query = this.value;
	}

	autocompleteSelectResult(result: AutocompleteOption<{ name: string }>): string {
		this.value = result.data.name;
		this.search();
		return this.value;
	}

	async autocompleteGetData(query: string): Promise<Array<AutocompleteOption<{ name: string }>>> {
		const q: JamParameters.AutoCompleteFilterParameters & { [name: string]: number | string } = { query };
		q[this.currentTab.id] = 10;
		const result = await this.jam.autocomplete.autocomplete(q) as AutoCompleteAccess;
		const list = result[`${this.currentTab.id}s`];
		return (list ?? []).map(data => ({ data }));
	}

	autocompleteEnter(query: string): void {
		this.value = query;
		this.search();
	}
}
