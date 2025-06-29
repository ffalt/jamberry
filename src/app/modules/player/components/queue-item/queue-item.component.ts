import {Component, Input, inject} from '@angular/core';
import {NavigService, PlayerService, QueueService} from '@core/services';
import {Jam} from '@jam';

@Component({
	selector: 'app-queue-item',
	templateUrl: './queue-item.component.html',
	styleUrls: ['./queue-item.component.scss'],
	standalone: false
})
export class QueueItemComponent {
	@Input() entry?: Jam.MediaBase;
	@Input() index: number = 0;
	readonly player = inject(PlayerService);
	readonly queue = inject(QueueService);
	readonly navig = inject(NavigService);
}
