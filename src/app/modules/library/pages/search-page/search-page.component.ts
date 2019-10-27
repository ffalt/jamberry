import {Component} from '@angular/core';
import {AutocompleteDataControl, AutocompleteOption} from '@app/modules/autocomplete';
import {NotifyService} from '@core/services';
import {AlbumType, JamParameters, JamService} from '@jam';
import {HeaderTab} from '@shared/components';

export interface Tab extends HeaderTab {
	id: string;
}

export interface Tabs {
	artists: Tab;
	albums: Tab;
	folders: Tab;
	podcasts: Tab;
	episodes: Tab;
	playlists: Tab;
	tracks: Tab;
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
	tabsObjs: Tabs = {
		artists: {id: 'artist', label: 'Artist'},
		albums: {id: 'album', label: 'Album'},
		folders: {id: 'folder', label: 'Folder'},
		podcasts: {id: 'podcast', label: 'Podcast'},
		episodes: {id: 'episode', label: 'Episodes'},
		playlists: {id: 'playlist', label: 'Playlist'},
		tracks: {id: 'track', label: 'Track'}
	};
	currentTab: Tab = this.tabsObjs.artists;
	tabs: Array<HeaderTab> = Object.keys(this.tabsObjs).map(key => {
		const tab = this.tabsObjs[key];
		tab.click = () => {
			this.setCurrentTab(tab);
		};
		return tab;
	});

	constructor(protected jam: JamService, protected notify: NotifyService) {
		this.currentTab = this.tabsObjs.artists;
		this.currentTab.active = true;
	}

	setCurrentTab(tab: Tab): void {
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
		const q: JamParameters.AutoComplete = {query};
		q[this.currentTab.id] = 10;
		const result = await this.jam.various.autocomplete(q);
		return (result[`${this.currentTab.id}s`] || []).map(data => ({data}));
	}

	autocompleteEnter(query: string): void {
		this.value = query;
		this.search();
	}
}
