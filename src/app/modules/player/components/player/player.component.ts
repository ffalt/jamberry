import {Component} from '@angular/core';
import {MainTabsService} from '@app/modules/main-tabs/services';
import {AppService, PlayerService, QueueService} from '@core/services';

@Component({
	selector: 'app-player',
	templateUrl: './player.component.html',
	styleUrls: ['./player.component.scss']
})
export class PlayerComponent {
	showSpeed: boolean = false;

	constructor(
		public app: AppService,
		public player: PlayerService,
		public queue: QueueService,
		public tabService: MainTabsService
	) {
	}

	defaultPlay(): void {
		if (this.player.currentTrack) {
			this.player.togglePlayPause();
		} else {
			this.player.next();
		}
	}

	toggleRepeat(): void {
		this.player.repeatTrack = !this.player.repeatTrack;
	}

}
