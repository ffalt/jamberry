import {Component, inject, input} from '@angular/core';
import {NavigService, PlayerService, QueueService} from '@core/services';
import type {Jam} from '@jam';

@Component({
	selector: 'app-queue-item',
	templateUrl: './queue-item.component.html',
	styleUrls: ['./queue-item.component.scss'],
	standalone: false
})
export class QueueItemComponent {
	readonly entry = input<Jam.MediaBase>();
	readonly index = input<number>(0);
	readonly player = inject(PlayerService);
	readonly queue = inject(QueueService);
	readonly navig = inject(NavigService);
}
