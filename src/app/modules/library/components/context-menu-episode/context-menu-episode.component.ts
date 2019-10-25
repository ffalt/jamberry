import {Component, ViewChild} from '@angular/core';
import {ContextMenuHostComponentInterface} from '@app/modules/context-menu';
import {ContextMenuComponent} from '@app/modules/context-menu/context-menu.component';
import {NavigService, PlayerService} from '@core/services';
import {ActionsService, PlaylistDialogsService} from '@shared/services';

export interface ContextMenuEpisodeComponentOpts {
	showGoTo: boolean;
}

@Component({
	selector: 'app-context-menu-episode',
	templateUrl: './context-menu-episode.component.html',
	styleUrls: ['./context-menu-episode.component.scss']
})
export class ContextMenuEpisodeComponent implements ContextMenuHostComponentInterface<ContextMenuEpisodeComponentOpts> {
	showGoTo: boolean = true;
	@ViewChild('episodeMenu') contextMenu: ContextMenuComponent;

	constructor(
		public navig: NavigService, public player: PlayerService, public actions: ActionsService,
		public playlistDialogsService: PlaylistDialogsService
	) {

	}

	initOpts(opts: ContextMenuEpisodeComponentOpts): void {
		this.showGoTo = opts.showGoTo;
	}

}
