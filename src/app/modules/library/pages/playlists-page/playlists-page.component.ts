import {Component} from '@angular/core';
import {JamLists} from '@app/utils/jam-lists';
import {PlaylistDialogsService} from '@shared/services';

@Component({
	selector: 'app-page-playlists',
	templateUrl: 'playlists-page.component.html',
	styleUrls: ['playlists-page.component.scss']
})
export class PlaylistsPageComponent {
	JamLists = JamLists;

	constructor(public playlistDialogsService: PlaylistDialogsService) {
	}
}
