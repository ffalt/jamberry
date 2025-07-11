import {Component, inject} from '@angular/core';
import {MainTabsService} from '@app/modules/main-tabs/services';
import {AppService, PlayerService, QueueService} from '@core/services';

@Component({
	selector: 'app-mini-player',
	templateUrl: './mini-player.component.html',
	styleUrls: ['./mini-player.component.scss'],
	standalone: false
})
export class MiniPlayerComponent {
	readonly app = inject(AppService);
	readonly player = inject(PlayerService);
	readonly queue = inject(QueueService);
	tabService = inject(MainTabsService);

	togglePlayPause() {
		if (this.player.isPlaying || this.player.currentMedia) {
			this.player.togglePlayPause();
		} else {
			this.player.next();
		}
	}
}
