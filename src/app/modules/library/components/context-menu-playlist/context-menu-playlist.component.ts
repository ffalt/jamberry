import {Component, Input, ViewChild} from '@angular/core';
import {ContextMenuHostComponentInterface} from '@app/modules/context-menu';
import {ContextMenuComponent} from '@app/modules/context-menu/context-menu.component';
import {NavigService, PlayerService} from '@core/services';
import {JamService} from '@jam';
import {ActionsService, PlaylistService} from '@shared/services';

@Component({
	selector: 'app-context-menu-playlist',
	templateUrl: 'context-menu-playlist.component.html',
	styleUrls: ['context-menu-playlist.component.scss']
})
export class ContextMenuPlaylistComponent implements ContextMenuHostComponentInterface {
	@Input() canEdit: boolean = false;
	@ViewChild('playlistMenu') contextMenu: ContextMenuComponent;

	constructor(
		public navig: NavigService, public player: PlayerService, public actions: ActionsService,
		public playlistService: PlaylistService, public jam: JamService
	) {

	}

}
