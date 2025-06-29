import {Component, ViewChild, inject} from '@angular/core';
import {NavigService, PlayerService, QueueService} from '@core/services';
import {ActionsService, ContextMenuHostComponentInterface} from '@shared/services';
import {ContextMenuComponent} from '@app/modules/ngx-contextmenu';

@Component({
	selector: 'app-context-menu-queue-track',
	templateUrl: './context-menu-queue-track.component.html',
	styleUrls: ['./context-menu-queue-track.component.scss'],
	standalone: false
})
export class ContextMenuQueueTrackComponent implements ContextMenuHostComponentInterface<any> {
	@ViewChild('queueMenu') contextMenu?: ContextMenuComponent;
	readonly navig = inject(NavigService);
	readonly queue = inject(QueueService);
	readonly player = inject(PlayerService);
	readonly actions = inject(ActionsService);
}
