import {Component} from '@angular/core';
import {MainTabsService} from '@app/modules/main-tabs/services';
import {AppService, PlayerService, QueueService} from '@core/services';

@Component({
	selector: 'app-mini-player',
	templateUrl: './mini-player.component.html',
	styleUrls: ['./mini-player.component.scss']
})
export class MiniPlayerComponent {

	constructor(public app: AppService, public player: PlayerService, public queue: QueueService, public tabService: MainTabsService) {
	}

	defaultPlay(): void {
		if (this.player.currentMedia) {
			this.player.togglePlayPause();
		} else {
			this.player.next();
		}
	}

}
