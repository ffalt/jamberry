import {Component, ViewChild} from '@angular/core';
import {ContextMenuHostComponentInterface} from '@app/modules/context-menu';
import {ContextMenuComponent} from '@app/modules/context-menu/context-menu.component';
import {NavigService, PlayerService} from '@core/services';
import {ActionsService, PlaylistDialogsService} from '@shared/services';

@Component({
	selector: 'app-context-menu-playlist',
	templateUrl: './context-menu-playlists.component.html',
	styleUrls: ['./context-menu-playlists.component.scss']
})
export class ContextMenuPlaylistsComponent implements ContextMenuHostComponentInterface<any> {
	@ViewChild('playlistsMenu') contextMenu: ContextMenuComponent;

	constructor(
		public navig: NavigService, public player: PlayerService, public actions: ActionsService,
		public playlistDialogsService: PlaylistDialogsService
	) {

	}

}
