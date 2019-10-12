import {Component} from '@angular/core';
import {JamLists} from '@app/utils/jam-lists';
import {PlaylistService} from '@library/services';

@Component({
	selector: 'app-page-playlists',
	templateUrl: 'playlists-page.component.html',
	styleUrls: ['playlists-page.component.scss']
})
export class PlaylistsPageComponent {
	JamLists = JamLists;

	constructor(public playlistService: PlaylistService) {
	}
}
