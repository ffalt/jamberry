import {Component} from '@angular/core';
import {AutocompleteDataControl, AutocompleteOption} from '@app/modules/autocomplete';
import {NotifyService} from '@core/services';
import {AlbumType, JamParameters, JamService} from '@jam';
import {LibraryService} from '@library/services';
import {HeaderTab} from '@shared/components';

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
}

@Component({
	selector: 'app-page-search',
	templateUrl: './search-page.component.html',
	styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements AutocompleteDataControl {
	AlbumType = AlbumType;
	value: string = '';
	query: string = '';
	tabsObjs: SearchTabs = {
		artists: {id: 'artist', label: 'Artist'},
		albums: {id: 'album', label: 'Album'},
		folders: {id: 'folder', label: 'Folder'},
		podcasts: {id: 'podcast', label: 'Podcast'},
		episodes: {id: 'episode', label: 'Episodes'},
		series: {id: 'series', label: 'Series'},
		playlists: {id: 'playlist', label: 'Playlist'},
		tracks: {id: 'track', label: 'Track'}
	};
	currentTab: SearchTab = this.tabsObjs.artists;
	tabs: Array<HeaderTab> = Object.keys(this.tabsObjs).map(key => {
		const tab = this.tabsObjs[key];
		tab.click = (): void => {
			this.setCurrentTab(tab);
		};
		return tab;
	});

	constructor(protected jam: JamService, protected notify: NotifyService, public library: LibraryService) {
		this.currentTab = this.tabsObjs.artists;
		this.currentTab.active = true;
	}

	setCurrentTab(tab: SearchTab): void {
		this.currentTab = tab;
		this.tabs.forEach(t => t.active = false);
		tab.active = true;
		this.search();
	}

	search(): void {
		this.query = this.value;
	}

	autocompleteSelectResult(result: AutocompleteOption): string {
		this.value = result.data.name;
		this.search();
		return this.value;
	}

	async autocompleteGetData(query: string): Promise<Array<AutocompleteOption>> {
		const q: JamParameters.AutoCompleteFilterArgs = {query};
		q[this.currentTab.id] = 10;
		const result = await this.jam.autocomplete.autocomplete(q);
		return (result[`${this.currentTab.id}s`] || []).map(data => ({data}));
	}

	autocompleteEnter(query: string): void {
		this.value = query;
		this.search();
	}
}
