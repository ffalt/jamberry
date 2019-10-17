import {Component, Input, ViewChild} from '@angular/core';
import {ContextMenuHostComponentInterface} from '@app/modules/context-menu';
import {ContextMenuComponent} from '@app/modules/context-menu/context-menu.component';
import {NavigService, PlayerService} from '@core/services';
import {ActionsService, PlaylistService} from '@shared/services';

@Component({
	selector: 'app-context-menu-episode',
	templateUrl: 'context-menu-episode.component.html',
	styleUrls: ['context-menu-episode.component.scss']
})
export class ContextMenuEpisodeComponent implements ContextMenuHostComponentInterface {
	@Input() showGoTo: boolean = true;
	@ViewChild('episodeMenu') contextMenu: ContextMenuComponent;

	constructor(
		public navig: NavigService, public player: PlayerService, public actions: ActionsService,
		public playlistService: PlaylistService
	) {

	}

}
