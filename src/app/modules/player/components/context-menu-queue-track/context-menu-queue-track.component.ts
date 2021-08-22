import {Component, ViewChild} from '@angular/core';
import {NavigService, PlayerService, QueueService} from '@core/services';
import {ActionsService, ContextMenuHostComponentInterface} from '@shared/services';
import {ContextMenuComponent} from '@app/modules/ngx-contextmenu';

@Component({
	selector: 'app-context-menu-queue-track',
	templateUrl: './context-menu-queue-track.component.html',
	styleUrls: ['./context-menu-queue-track.component.scss']
})
export class ContextMenuQueueTrackComponent implements ContextMenuHostComponentInterface<any> {
	@ViewChild('queueMenu') contextMenu?: ContextMenuComponent;

	constructor(public navig: NavigService, public queue: QueueService, public player: PlayerService, public actions: ActionsService) {
	}

}
