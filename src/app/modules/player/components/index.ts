import {ContextMenuQueueTrackComponent} from './context-menu-queue-track/context-menu-queue-track.component';
import {MiniPlayerComponent} from './mini-player/mini-player.component';
import {MiniSliderTimeComponent} from './mini-slider-time/mini-slider-time.component';
import {PlayerCurrentInfoComponent} from './player-current-info/player-current-info.component';
import {SliderSpeedComponent} from './player-slider-speed/slider-speed.component';
import {SliderTimeComponent} from './player-slider-time/slider-time.component';
import {SliderVolumeComponent} from './player-slider-volume/slider-volume.component';
import {PlayerComponent} from './player/player.component';
import {QueueComponent} from './queue/queue.component';

export const entryComponents: Array<any> = [
	ContextMenuQueueTrackComponent
];

export const components: Array<any> = [
	...entryComponents,
	MiniPlayerComponent,
	MiniSliderTimeComponent,
	PlayerComponent,
	PlayerCurrentInfoComponent,
	SliderTimeComponent,
	SliderVolumeComponent,
	SliderSpeedComponent,
	QueueComponent
];

export * from './context-menu-queue-track/context-menu-queue-track.component';
export * from './player-current-info/player-current-info.component';
export * from './player-slider-speed/slider-speed.component';
export * from './player-slider-time/slider-time.component';
export * from './player-slider-volume/slider-volume.component';
export * from './player/player.component';
export * from './queue/queue.component';
export * from './mini-player/mini-player.component';
export * from './mini-slider-time/mini-slider-time.component';
