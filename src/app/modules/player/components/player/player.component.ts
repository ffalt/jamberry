import {Component} from '@angular/core';
import {MainTabsService} from '@app/modules/main-tabs/services';
import {HOTKEYS} from '@app/utils/keys';
import {AppService, PlayerService, QueueService} from '@core/services';

@Component({
    selector: 'app-player',
    templateUrl: './player.component.html',
    styleUrls: ['./player.component.scss'],
    standalone: false
})
export class PlayerComponent {
	showSpeed: boolean = false;
	HOTKEYS = HOTKEYS;

	constructor(
		public app: AppService,
		public player: PlayerService,
		public queue: QueueService,
		public tabService: MainTabsService
	) {
	}

	toggleRepeat(): void {
		this.player.repeatTrack = !this.player.repeatTrack;
	}

	togglePlayPause() {
		if (this.player.isPlaying || this.player.currentMedia) {
			this.player.togglePlayPause();
		} else {
			this.player.next();
		}
	}
}
