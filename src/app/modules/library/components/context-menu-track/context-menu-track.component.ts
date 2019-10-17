import {Component, ViewChild} from '@angular/core';
import {ContextMenuHostComponentInterface} from '@app/modules/context-menu';
import {ContextMenuComponent} from '@app/modules/context-menu/context-menu.component';
import {NavigService, PlayerService} from '@core/services';
import {ActionsService, PlaylistService} from '@shared/services';

@Component({
	selector: 'app-context-menu-track',
	templateUrl: 'context-menu-track.component.html',
	styleUrls: ['context-menu-track.component.scss']
})
export class ContextMenuTrackComponent implements ContextMenuHostComponentInterface {
	@ViewChild('trackMenu') contextMenu: ContextMenuComponent;
	showGoTo: boolean = true;

	constructor(
		public navig: NavigService, public player: PlayerService, public actions: ActionsService,
		public playlistService: PlaylistService
	) {

	}

}
