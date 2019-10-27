import {Component, ViewChild} from '@angular/core';
import {ContextMenuHostComponentInterface} from '@app/modules/context-menu';
import {ContextMenuComponent} from '@app/modules/context-menu/context-menu.component';
import {NavigService, PlayerService, QueueService} from '@core/services';
import {ActionsService, PlaylistDialogsService} from '@shared/services';

@Component({
	selector: 'app-context-menu-queue',
	templateUrl: './context-menu-queue.component.html',
	styleUrls: ['./context-menu-queue.component.scss']
})
export class ContextMenuQueueComponent implements ContextMenuHostComponentInterface<any> {
	@ViewChild('queueMenu') contextMenu: ContextMenuComponent;

	constructor(
		public navig: NavigService, public player: PlayerService, public actions: ActionsService,
		public playlistDialogsService: PlaylistDialogsService, public queue: QueueService
	) {

	}

}
