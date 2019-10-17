import {Component, ViewChild} from '@angular/core';
import {ContextMenuHostComponentInterface} from '@app/modules/context-menu';
import {ContextMenuComponent} from '@app/modules/context-menu/context-menu.component';
import {NavigService, PlayerService} from '@core/services';
import {ActionsService, PlaylistService} from '@shared/services';

@Component({
	selector: 'app-context-menu-folder',
	templateUrl: 'context-menu-folder.component.html',
	styleUrls: ['context-menu-folder.component.scss']
})
export class ContextMenuFolderComponent implements ContextMenuHostComponentInterface {
	@ViewChild('folderMenu') contextMenu: ContextMenuComponent;

	constructor(
		public navig: NavigService, public player: PlayerService, public actions: ActionsService,
		public playlistService: PlaylistService
	) {

	}

}
