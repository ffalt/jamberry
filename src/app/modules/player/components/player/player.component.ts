import {Component, inject} from '@angular/core';
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
	readonly app = inject(AppService);
	readonly player = inject(PlayerService);
	readonly queue = inject(QueueService);
	tabService = inject(MainTabsService);

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
