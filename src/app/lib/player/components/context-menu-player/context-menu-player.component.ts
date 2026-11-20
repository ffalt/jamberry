import { Component, inject, viewChild } from '@angular/core';
import { MainTabsService } from '../../../main-tabs/services/main-tabs.service';
import { cycleRepeatMode, PLAYER_BAR_COMPACT_WIDTH, PLAYER_BAR_PHONE_WIDTH, type RepeatMode, repeatModeOf } from '../../player-bar.utils';
import { SliderSpeedComponent } from '../player-slider-speed/slider-speed.component';
import { SliderVolumeComponent } from '../player-slider-volume/slider-volume.component';
import { MediadurationPipe } from '@core/pipes/mediaduration.pipe';
import type { ContextMenuHostComponentInterface } from '@core/services/contextmenu/menu.service';
import { ActionsService } from '@core/services/actions/actions.service';
import { NavigService } from '@core/services/navig/navig.service';
import { PlayerService } from '@core/services/player/player.service';
import { QueueService } from '@core/services/queue/queue.service';
import { ContextMenuModule } from '@modules/ngx-contextmenu/lib/ngx-contextmenu.module';
import type { ContextMenuComponent } from '@modules/ngx-contextmenu/lib/contextmenu.component';
import { IconHeartEmptyComponent } from '@core/components/icons/icon-heart-empty.component';
import { IconHeartFullComponent } from '@core/components/icons/icon-heart-full.component';
import { IconClockComponent } from '@core/components/icons/icon-clock.component';
import { IconInfoComponent } from '@core/components/icons/icon-info.component';
import { IconQueueComponent } from '@core/components/icons/icon-queue.component';
import { IconLoopComponent } from '@core/components/icons/icon-loop.component';
import { IconShuffleComponent } from '@core/components/icons/icon-shuffle.component';
import { IconVolumeOffComponent } from '@core/components/icons/icon-volume-off.component';
import { IconVolumeUpComponent } from '@core/components/icons/icon-volume-up.component';
import { IconSpeedComponent } from '@core/components/icons/icon-speed.component';

const matchesUpTo = (width: number): boolean => matchMedia(`(max-width: ${width}px)`).matches;

@Component({
	selector: 'app-context-menu-player',
	templateUrl: './context-menu-player.component.html',
	styleUrls: ['./context-menu-player.component.scss'],
	imports: [
		ContextMenuModule,
		MediadurationPipe,
		IconClockComponent,
		IconQueueComponent,
		IconHeartEmptyComponent,
		IconHeartFullComponent,
		IconInfoComponent,
		IconLoopComponent,
		IconShuffleComponent,
		IconSpeedComponent,
		IconVolumeOffComponent,
		IconVolumeUpComponent,
		SliderSpeedComponent,
		SliderVolumeComponent
	]
})
export class ContextMenuPlayerComponent implements ContextMenuHostComponentInterface<undefined> {
	readonly navig = inject(NavigService);
	readonly player = inject(PlayerService);
	readonly queue = inject(QueueService);
	readonly tabService = inject(MainTabsService);
	readonly contextMenu = viewChild.required<ContextMenuComponent>('playerMenu');
	readonly showCompactControls = matchesUpTo(PLAYER_BAR_COMPACT_WIDTH);
	readonly showTransportExtras = matchesUpTo(PLAYER_BAR_PHONE_WIDTH);
	private readonly actions = inject(ActionsService);

	get repeatMode(): RepeatMode {
		return repeatModeOf(this.player, this.queue);
	}

	get faved(): boolean {
		return !!this.player.currentMedia?.state?.faved;
	}

	get hasMedia(): boolean {
		return !!this.player.currentMedia;
	}

	cycleRepeat(): void {
		cycleRepeatMode(this.player, this.queue);
	}

	toggleFav(): void {
		const media = this.player.currentMedia;
		if (!media) {
			return;
		}
		this.actions.toggleMediaBaseFav(media)
			.catch((error: unknown) => {
				console.error(error);
			});
	}
}
