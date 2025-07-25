import {Component, inject, output, viewChild} from '@angular/core';
import {type AutocompleteDataControl, AutocompleteDirective, type AutocompleteOption} from '@app/modules/autocomplete';
import {NavigService} from '@core/services';
import {type Jam, JamService} from '@jam';

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
	templateUrl: './search-box.component.html',
	styleUrls: ['./search-box.component.scss'],
	standalone: false
})
export class SearchBoxComponent implements AutocompleteDataControl {
	readonly autocomplete = viewChild(AutocompleteDirective);
	readonly searchStateChange = output<boolean>();
	private readonly jam = inject(JamService);
	private readonly navig = inject(NavigService);

	setSearchActive(active: boolean) {
		this.searchStateChange.emit(active);
	}

	autocompleteEnter(): void {
		// nada
	}

	search() {
		this.autocomplete()?.run();
	}

	async autocompleteGetData(query: string): Promise<Array<AutocompleteOption>> {
		const result = await this.jam.autocomplete.autocomplete({query, album: 5, artist: 5, playlist: 5, podcast: 5, track: 5, episode: 5});
		const parts: Array<{ type: string; list?: Array<Jam.AutoCompleteEntry> }> = [
			{type: objTypes.artist, list: result.artists},
			{type: objTypes.album, list: result.albums},
			{type: objTypes.track, list: result.tracks},
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
				list = [...list, ...items];
			}
		}
		return list;
	}

	autocompleteSelectResult(result: AutocompleteOption): string {
		const item = result.data;
		switch (item.type) {
			case objTypes.track: {
				this.navig.toTrackID(item.id, item.name);
				break;
			}
			case objTypes.episode: {
				this.navig.toPodcastEpisodeID(item.id, item.name);
				break;
			}
			case objTypes.album: {
				this.navig.toAlbumID(item.id, item.name);
				break;
			}
			case objTypes.artist: {
				this.navig.toArtistID(item.id, item.name);
				break;
			}
			case objTypes.playlist: {
				this.navig.toPlaylistID(item.id, item.name);
				break;
			}
			case objTypes.podcast: {
				this.navig.toPodcastID(item.id, item.name);
				break;
			}
			case objTypes.folder: {
				this.navig.toFolderID(item.id, item.name);
				break;
			}
			default: {
				break;
			}
		}
		return item.name;
	}
}
