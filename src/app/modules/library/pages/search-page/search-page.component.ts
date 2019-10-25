import {Component} from '@angular/core';
import {AutocompleteDataControl, AutocompleteOption} from '@app/modules/autocomplete';
import {NotifyService} from '@core/services';
import {AlbumType, JamParameters, JamService} from '@jam';

export interface Tab {
	id: string;
	name: string;
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
	templateUrl: 'search-page.component.html',
	styleUrls: ['search-page.component.scss']
})
export class SearchPageComponent implements AutocompleteDataControl {
	AlbumType = AlbumType;
	value: string = '';
	query: string = '';
	tabs: Tabs = {
		artists: {id: 'artist', name: 'Artist'},
		albums: {id: 'album', name: 'Album'},
		folders: {id: 'folder', name: 'Folder'},
		podcasts: {id: 'podcast', name: 'Podcast'},
		episodes: {id: 'episode', name: 'Episodes'},
		playlists: {id: 'playlist', name: 'Playlist'},
		tracks: {id: 'track', name: 'Track'}
	};
	currentTab: { id: string; name: string; } = this.tabs.artists;
	tabList = Object.keys(this.tabs).map(key => this.tabs[key]);

	constructor(protected jam: JamService, protected notify: NotifyService) {
	}

	setCurrentTab(tab: { id: string; name: string; }): void {
		this.currentTab = tab;
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
