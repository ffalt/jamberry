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
	[name: string]: SearchTab;

	artists: SearchTab;
	albums: SearchTab;
	folders: SearchTab;
	podcasts: SearchTab;
	episodes: SearchTab;
	series: SearchTab;
	playlists: SearchTab;
	tracks: SearchTab;
}

const noClick = (): void => {
	// nop;
};

@Component({
    selector: 'app-page-search',
    templateUrl: './search-page.component.html',
    styleUrls: ['./search-page.component.scss'],
    standalone: false
})
export class SearchPageComponent implements AutocompleteDataControl {
	AlbumType = AlbumType;
	value: string = '';
	query: string = '';
	tabsObjs: SearchTabs = {
		artists: {id: 'artist', label: 'Artist', click: noClick},
		albums: {id: 'album', label: 'Album', click: noClick},
		folders: {id: 'folder', label: 'Folder', click: noClick},
		podcasts: {id: 'podcast', label: 'Podcast', click: noClick},
		episodes: {id: 'episode', label: 'Episodes', click: noClick},
		series: {id: 'series', label: 'Series', click: noClick},
		playlists: {id: 'playlist', label: 'Playlist', click: noClick},
		tracks: {id: 'track', label: 'Track', click: noClick}
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
		const q: JamParameters.AutoCompleteFilterArgs & { [name: string]: number | string } = {query};
		q[this.currentTab.id] = 10;
		const result: { [name: string]: any } = await this.jam.autocomplete.autocomplete(q);
		return (result[`${this.currentTab.id}s`] || []).map((data: any) => ({data}));
	}

	autocompleteEnter(query: string): void {
		this.value = query;
		this.search();
	}
}
