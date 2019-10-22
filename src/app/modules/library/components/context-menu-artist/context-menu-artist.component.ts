import {Component, ViewChild} from '@angular/core';
import {ContextMenuHostComponentInterface} from '@app/modules/context-menu';
import {ContextMenuComponent} from '@app/modules/context-menu/context-menu.component';
import {NavigService, PlayerService} from '@core/services';
import {ActionsService, PlaylistDialogsService} from '@shared/services';

@Component({
	selector: 'app-context-menu-artist',
	templateUrl: 'context-menu-artist.component.html',
	styleUrls: ['context-menu-artist.component.scss']
})
export class ContextMenuArtistComponent implements ContextMenuHostComponentInterface<any> {
	@ViewChild('artistMenu') contextMenu: ContextMenuComponent;

	constructor(
		public navig: NavigService, public player: PlayerService, public actions: ActionsService,
		public playlistDialogsService: PlaylistDialogsService
	) {

	}

}
