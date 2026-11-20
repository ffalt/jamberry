import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HOTKEYS } from '@utils/keys';
import { MainTabsService } from '../../../main-tabs/services/main-tabs.service';
import { cycleRepeatMode, type RepeatMode, repeatModeOf } from '../../player-bar.utils';
import { ContextMenuPlayerComponent } from '../context-menu-player/context-menu-player.component';
import { SliderTimeComponent } from '../player-slider-time/slider-time.component';
import { SliderVolumeComponent } from '../player-slider-volume/slider-volume.component';
import { CoverartImageComponent } from '@core/components/coverart-image/coverart-image.component';
import { ClickKeyEnterDirective } from '@core/directives/click-enterkey.directive';
import { MediadurationPipe } from '@core/pipes/mediaduration.pipe';
import { StringTogglePipe } from '@core/pipes/string-toggle/string-toggle.pipe';
import { ActionsService } from '@core/services/actions/actions.service';
import { AppService } from '@core/services/app/app.service';
import { MenuService } from '@core/services/contextmenu/menu.service';
import { NavigService } from '@core/services/navig/navig.service';
import { PlayerService } from '@core/services/player/player.service';
import { QueueService } from '@core/services/queue/queue.service';
import { IconEllipsisVertComponent } from '@core/components/icons/icon-ellipsis-vert.component';
import { IconFastBackwardComponent } from '@core/components/icons/icon-fast-backward.component';
import { IconFastForwardComponent } from '@core/components/icons/icon-fast-forward.component';
import { IconFavComponent } from '@core/components/icons/icon-fav.component';
import { IconLoopComponent } from '@core/components/icons/icon-loop.component';
import { IconPauseComponent } from '@core/components/icons/icon-pause.component';
import { IconPlayComponent } from '@core/components/icons/icon-play.component';
import { IconQueueComponent } from '@core/components/icons/icon-queue.component';
import { IconShuffleComponent } from '@core/components/icons/icon-shuffle.component';
import { IconVolumeOffComponent } from '@core/components/icons/icon-volume-off.component';
import { IconVolumeUpComponent } from '@core/components/icons/icon-volume-up.component';

const REPEAT_TITLES: Record<RepeatMode, string> = {
	off: 'Repeat off, click to repeat the queue',
	queue: 'Repeating the queue, click to repeat the current track',
	track: 'Repeating the current track, click to stop repeating'
};

@Component({
	selector: 'app-player-bar',
	templateUrl: './player-bar.component.html',
	styleUrls: ['./player-bar.component.scss'],
	imports: [
		ClickKeyEnterDirective,
		CoverartImageComponent,
		MediadurationPipe,
		RouterLink,
		StringTogglePipe,
		SliderTimeComponent,
		SliderVolumeComponent,
		IconEllipsisVertComponent,
		IconFastBackwardComponent,
		IconFastForwardComponent,
		IconFavComponent,
		IconLoopComponent,
		IconPauseComponent,
		IconPlayComponent,
		IconQueueComponent,
		IconShuffleComponent,
		IconVolumeOffComponent,
		IconVolumeUpComponent
	]
})
export class PlayerBarComponent {
	readonly app = inject(AppService);
	readonly player = inject(PlayerService);
	readonly queue = inject(QueueService);
	readonly navig = inject(NavigService);
	readonly tabService = inject(MainTabsService);
	readonly repeatMode = computed<RepeatMode>(() => repeatModeOf(this.player, this.queue));

	readonly repeatTitle = computed<string>(() => REPEAT_TITLES[this.repeatMode()]);
	readonly faved = computed<boolean>(() => {
		this.favChanged();
		return !!this.player.currentMedia?.state?.faved;
	});

	HOTKEYS = HOTKEYS;
	private readonly actions = inject(ActionsService);
	private readonly menuService = inject(MenuService);
	private readonly favChanged = signal(0);

	togglePlayPause(): void {
		if (this.player.isPlaying || this.player.currentMedia) {
			this.player.togglePlayPause();
		} else {
			this.player.next();
		}
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
			.then(() => {
				this.favChanged.update(value => value + 1);
			})
			.catch((error: unknown) => {
				console.error(error);
			});
	}

	openMenu(event: Event): void {
		this.menuService.openMenuComponent<undefined>(ContextMenuPlayerComponent, undefined, event);
	}
}
