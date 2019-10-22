import {Component, ViewChild} from '@angular/core';
import {ContextMenuHostComponentInterface} from '@app/modules/context-menu';
import {ContextMenuComponent} from '@app/modules/context-menu/context-menu.component';
import {NavigService, PlayerService} from '@core/services';
import {ActionsService, PlaylistDialogsService} from '@shared/services';

@Component({
	selector: 'app-context-menu-album',
	templateUrl: 'context-menu-album.component.html',
	styleUrls: ['context-menu-album.component.scss']
})
export class ContextMenuAlbumComponent implements ContextMenuHostComponentInterface<any> {
	@ViewChild('albumMenu') contextMenu: ContextMenuComponent;

	constructor(
		public navig: NavigService, public player: PlayerService, public actions: ActionsService,
		public playlistDialogsService: PlaylistDialogsService
	) {

	}

}
