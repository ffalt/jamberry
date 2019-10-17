import {Component, Input, ViewChild} from '@angular/core';
import {ContextMenuComponent} from '@app/modules/context-menu/context-menu.component';
import {NavigService, PlayerService} from '@core/services';
import {PlaylistService} from '@shared/services';
import {ActionsService} from '@shared/services';

@Component({
	selector: 'app-context-menu-artist',
	templateUrl: 'context-menu-artist.component.html',
	styleUrls: ['context-menu-artist.component.scss']
})
export class ContextMenuArtistComponent {
	@ViewChild('artistMenu') contextMenu: ContextMenuComponent;

	constructor(
		public navig: NavigService, public player: PlayerService, public actions: ActionsService,
		public playlistService: PlaylistService
	) {

	}

}
