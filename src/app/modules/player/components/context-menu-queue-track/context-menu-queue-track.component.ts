import {Component, inject, viewChild} from '@angular/core';
import {NavigService, QueueService} from '@core/services';
import {ActionsService, type ContextMenuHostComponentInterface} from '@shared/services';
import type {ContextMenuComponent} from '@app/modules/ngx-contextmenu';

@Component({
	selector: 'app-context-menu-queue-track',
	templateUrl: './context-menu-queue-track.component.html',
	styleUrls: ['./context-menu-queue-track.component.scss'],
	standalone: false
})
export class ContextMenuQueueTrackComponent implements ContextMenuHostComponentInterface<any> {
	readonly contextMenu = viewChild.required<ContextMenuComponent>('queueMenu');
	readonly actions = inject(ActionsService);
	readonly navig = inject(NavigService);
	readonly queue = inject(QueueService);
}
