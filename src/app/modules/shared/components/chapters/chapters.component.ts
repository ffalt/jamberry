import {Component, Input} from '@angular/core';
import {PlayerService, QueueService} from '@core/services';
import {Jam} from '@jam';

@Component({
    selector: 'app-chapters',
    templateUrl: './chapters.component.html',
    styleUrls: ['./chapters.component.scss'],
    standalone: false
})
export class ChaptersComponent {
	@Input() episode?: Jam.Episode;

	constructor(public player: PlayerService, public queue: QueueService) {
	}

}
