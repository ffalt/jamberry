import {Component} from '@angular/core';
import {AutocompleteDataControl, AutocompleteOption} from '@app/modules/autocomplete';
import {NavigService, NotifyService} from '@core/services';
import {JamService} from '@jam';

const objTypes = {
	track: 'Track',
	album: 'Album',
	artist: 'Artist',
	playlist: 'Playlist',
	podcast: 'Podcast',
	episode: 'Episode',
	folder: 'Folder'
};

@Component({
	selector: 'app-search-box',
	templateUrl: 'search-box.component.html',
	styleUrls: ['search-box.component.scss']
})
export class SearchBoxComponent implements AutocompleteDataControl {
	// asyncSelected: string = '';
	// loading: number = 0;

	constructor(private jam: JamService, private notify: NotifyService, private navig: NavigService) {
	}

	autocompleteEnter(query: string): void {
		// nada
	}

	async autocompleteGetData(query: string): Promise<Array<AutocompleteOption>> {
		const result = await this.jam.various.autocomplete({query, album: 5, artist: 5, playlist: 5, podcast: 5, track: 5, episode: 5});
		const parts: Array<{ type: string, list: Array<{ id: string, name: string }> }> = [
			{type: objTypes.track, list: result.tracks},
			{type: objTypes.album, list: result.albums},
			{type: objTypes.artist, list: result.artists},
			{type: objTypes.playlist, list: result.playlists},
			{type: objTypes.podcast, list: result.podcasts},
			{type: objTypes.episode, list: result.episodes},
			{type: objTypes.folder, list: result.folders}
		];
		let list: Array<AutocompleteOption> = [];
		for (const part of parts) {
			if (part.list && part.list.length > 0) {
				const items: Array<AutocompleteOption> = part.list.map(data =>
					({data: {type: part.type, ...data}}));
				items[0].header = part.type;
				list = list.concat(items);
			}
		}
		return list;
	}

	autocompleteSelectResult(result: AutocompleteOption): string {
		const item = result.data;
		switch (item.type) {
			case objTypes.track:
				this.navig.toTrackID(item.id, item.name);
				break;
			case objTypes.episode:
				this.navig.toPodcastEpisodeID(item.id, item.name);
				break;
			case objTypes.album:
				this.navig.toAlbumID(item.id, item.name);
				break;
			case objTypes.artist:
				this.navig.toArtistID(item.id, item.name);
				break;
			case objTypes.playlist:
				this.navig.toPlaylistID(item.id, item.name);
				break;
			case objTypes.podcast:
				this.navig.toPodcastID(item.id, item.name);
				break;
			case objTypes.folder:
				this.navig.toFolderID(item.id, item.name);
				break;
			default:
				break;
		}
		return item.name;
	}

	/*
	// ngOnChanges(changes: SimpleChanges): void {
		// if (changes.value && changes.value.currentValue && changes.value.currentValue !== this.asyncSelected) {
		// 	this.asyncSelected = changes.value.currentValue;
		// }
	// }

	async getData(query: string): Promise<Array<any>> {
		this.loading++;
		try {
			const result = await this.jam.various.autocomplete({query, album: 5, artist: 5, playlist: 5, podcast: 5, track: 5, episode: 5});
			const data = []
				.concat((result.tracks || []).map(o => ({type: objTypes.track, ...o})))
				.concat((result.albums || []).map(o => ({type: objTypes.album, ...o})))
				.concat((result.artists || []).map(o => ({type: objTypes.artist, ...o})))
				.concat((result.playlists || []).map(o => ({type: objTypes.playlist, ...o})))
				.concat((result.podcasts || []).map(o => ({type: objTypes.podcast, ...o})))
				.concat((result.episodes || []).map(o => ({type: objTypes.episode, ...o})))
				.concat((result.folders || []).map(o => ({type: objTypes.folder, ...o})));
			this.loading--;
			return data;
		} catch (e) {
			this.loading--;
			this.notify.error(e);
			return [];
		}
	}

	isEmpty(): boolean {
		return ((!this.asyncSelected) || (this.asyncSelected.length === 0));
	}

	typeaheadOnSelect(item: any): void {

	}

	 */

}
