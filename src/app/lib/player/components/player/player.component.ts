import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { HOTKEYS } from '@utils/keys';
import { MainTabsService } from '../../../main-tabs/services/main-tabs.service';
import { SliderSpeedComponent } from '../player-slider-speed/slider-speed.component';
import { SliderTimeComponent } from '../player-slider-time/slider-time.component';
import { SliderVolumeComponent } from '../player-slider-volume/slider-volume.component';
import { MediadurationPipe } from '@core/pipes/mediaduration.pipe';
import { StringTogglePipe } from '@core/pipes/string-toggle/string-toggle.pipe';
import { AppService } from '@core/services/app/app.service';
import { QueueService } from '@core/services/queue/queue.service';
import { PlayerService } from '@core/services/player/player.service';
import { IconFastBackwardComponent } from '@core/components/icons/icon-fast-backward.component';
import { IconFastForwardComponent } from '@core/components/icons/icon-fast-forward.component';
import { IconInfoComponent } from '@core/components/icons/icon-info.component';
import { IconLoopComponent } from '@core/components/icons/icon-loop.component';
import { IconPauseComponent } from '@core/components/icons/icon-pause.component';
import { IconPlayComponent } from '@core/components/icons/icon-play.component';
import { IconQueueComponent } from '@core/components/icons/icon-queue.component';
import { IconSpeedComponent } from '@core/components/icons/icon-speed.component';
import { IconVolumeOffComponent } from '@core/components/icons/icon-volume-off.component';
import { IconVolumeUpComponent } from '@core/components/icons/icon-volume-up.component';

@Component({
	selector: 'app-player',
	templateUrl: './player.component.html',
	styleUrls: ['./player.component.scss'],
	changeDetection: ChangeDetectionStrategy.Eager,
	imports: [
		IconFastBackwardComponent, IconFastForwardComponent, IconInfoComponent, IconLoopComponent, IconPauseComponent, IconPlayComponent, IconQueueComponent,
		IconSpeedComponent, IconVolumeOffComponent, IconVolumeUpComponent, MediadurationPipe, SliderSpeedComponent, SliderTimeComponent, SliderVolumeComponent, StringTogglePipe
	]
})
export class PlayerComponent {
	readonly app = inject(AppService);
	readonly player = inject(PlayerService);
	readonly queue = inject(QueueService);
	showSpeed: boolean = false;
	HOTKEYS = HOTKEYS;
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
