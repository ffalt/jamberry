import {Component, Input, ViewChild} from '@angular/core';
import {ContextMenuComponent} from '@app/modules/context-menu/context-menu.component';
import {NavigService, PlayerService} from '@core/services';
import {PlaylistService} from '@shared/services';
import {ActionsService} from '@shared/services';

@Component({
	selector: 'app-context-menu-album',
	templateUrl: 'context-menu-album.component.html',
	styleUrls: ['context-menu-album.component.scss']
})
export class ContextMenuAlbumComponent {
	@ViewChild('albumMenu') contextMenu: ContextMenuComponent;

	constructor(
		public navig: NavigService, public player: PlayerService, public actions: ActionsService,
		public playlistService: PlaylistService
	) {

	}

}
