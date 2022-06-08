import {TabInfoComponent} from './tab-info/tab-info.component';
import {TabMainComponent} from './tab-main/tab-main.component';
import {TabPlayerComponent} from './tab-player/tab-player.component';
import {TabQueueComponent} from './tab-queue/tab-queue.component';

export const components: Array<any> = [
	TabMainComponent, TabPlayerComponent, TabQueueComponent, TabInfoComponent
];

export * from './tab-main/tab-main.component';
export * from './tab-player/tab-player.component';
export * from './tab-info/tab-info.component';
export * from './tab-queue/tab-queue.component';
