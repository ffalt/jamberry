import {Component, ViewChild} from '@angular/core';
import {ContextMenuHostComponentInterface} from '@app/modules/context-menu';
import {ContextMenuComponent} from '@app/modules/context-menu/context-menu.component';
import {NavigService, PlayerService} from '@core/services';
import {JamService} from '@jam';
import {ActionsService, PlaylistDialogsService, PodcastService} from '@shared/services';

@Component({
	selector: 'app-context-menu-podcast',
	templateUrl: './context-menu-podcast.component.html',
	styleUrls: ['./context-menu-podcast.component.scss']
})
export class ContextMenuPodcastComponent implements ContextMenuHostComponentInterface<any> {
	@ViewChild('podcastMenu') contextMenu: ContextMenuComponent;

	constructor(
		public navig: NavigService, public player: PlayerService, public actions: ActionsService,
		public playlistDialogsService: PlaylistDialogsService, public podcastService: PodcastService, public jam: JamService
	) {

	}

}
