import { Component, inject } from '@angular/core';
import type { TabComponent } from '@modules/tab-portal';
import { PlayerCurrentInfoComponent } from '../../../player/components/player-current-info/player-current-info.component';
import { SliderSpeedComponent } from '../../../player/components/player-slider-speed/slider-speed.component';
import { SliderTimeComponent } from '../../../player/components/player-slider-time/slider-time.component';
import { SliderVolumeComponent } from '../../../player/components/player-slider-volume/slider-volume.component';
import { MediadurationPipe } from '@core/pipes/mediaduration.pipe';
import { NavigService } from '@core/services/navig/navig.service';
import { PlayerService } from '@core/services/player/player.service';
import { IconSpeedComponent } from '@core/components/icons/icon-speed.component';
import { IconVolumeOffComponent } from '@core/components/icons/icon-volume-off.component';
import { IconVolumeUpComponent } from '@core/components/icons/icon-volume-up.component';

@Component({
	selector: 'app-tab-player',
	templateUrl: './tab-player.component.html',
	styleUrls: ['./tab-player.component.scss'],
	imports: [IconSpeedComponent, IconVolumeOffComponent, IconVolumeUpComponent, MediadurationPipe, PlayerCurrentInfoComponent, SliderSpeedComponent, SliderTimeComponent, SliderVolumeComponent]
})
export class TabPlayerComponent implements TabComponent {
	readonly player = inject(PlayerService);
	readonly navig = inject(NavigService);

	onActivate(): void {
		//
	}
}
