import {Component} from '@angular/core';
import {ContextMenuService} from '@app/modules/context-menu';
import {QueueService} from '@core/services';
import {ContextMenuQueueComponent} from '@library/components';
import {PlaylistDialogsService} from '@shared/services';

@Component({
	selector: 'app-page-queue',
	templateUrl: './queue-page.component.html',
	styleUrls: ['./queue-page.component.scss']
})
export class QueuePageComponent {

	constructor(public queue: QueueService, public playlistDialogsService: PlaylistDialogsService, private contextMenuService: ContextMenuService) {
	}

	onContextMenu($event: MouseEvent, item?: any): void {
		this.contextMenuService.open(ContextMenuQueueComponent, item, $event);
	}

}
