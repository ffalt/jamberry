import {Component} from '@angular/core';
import {QueueService} from '@core/services';
import {PlaylistDialogsService} from '@shared/services';

@Component({
	selector: 'app-page-queue',
	templateUrl: './queue-page.component.html',
	styleUrls: ['./queue-page.component.scss']
})
export class QueuePageComponent {

	constructor(public queue: QueueService, public playlistDialogsService: PlaylistDialogsService) {
	}

}
