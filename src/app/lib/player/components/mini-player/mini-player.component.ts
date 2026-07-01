import { Component, inject } from '@angular/core';
import { MainTabsService } from '../../../main-tabs/services/main-tabs.service';
import { MiniSliderTimeComponent } from '../mini-slider-time/mini-slider-time.component';
import { CoverartImageComponent } from '@core/components/coverart-image/coverart-image.component';
import { AppService } from '@core/services/app/app.service';
import { QueueService } from '@core/services/queue/queue.service';
import { PlayerService } from '@core/services/player/player.service';
import { IconFastBackwardComponent } from '@core/components/icons/icon-fast-backward.component';
import { IconFastForwardComponent } from '@core/components/icons/icon-fast-forward.component';
import { IconInfoComponent } from '@core/components/icons/icon-info.component';
import { IconPauseComponent } from '@core/components/icons/icon-pause.component';
import { IconPlayComponent } from '@core/components/icons/icon-play.component';
import { IconQueueComponent } from '@core/components/icons/icon-queue.component';

@Component({
	selector: 'app-mini-player',
	templateUrl: './mini-player.component.html',
	styleUrls: ['./mini-player.component.scss'],
	imports: [CoverartImageComponent, IconFastBackwardComponent, IconFastForwardComponent, IconInfoComponent, IconPauseComponent, IconPlayComponent, IconQueueComponent, MiniSliderTimeComponent]
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
