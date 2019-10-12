import {AppService} from './app/app.service';
import {ConfigurationService} from './configuration/configuration.service';
import {DialogsService} from './dialogs/dialogs.service';
import {LocalstorageService} from './localstorage/localstorage.service';
import {NavigService} from './navig/navig.service';
import {NotifyService} from './notify/notify.service';
import {PlayerService} from './player/player.service';
import {PushNotificationService} from './push-notification/push-notification.service';
import {QueueService} from './queue/queue.service';
import {SettingsStoreService} from './settings-store/settings-store.service';
import {TitleService} from './title/title.service';
import {UserStorageService} from './userstorage/userstorage.service';

export const services: Array<any> = [
	UserStorageService,
	TitleService,
	SettingsStoreService,
	QueueService,
	PushNotificationService,
	PlayerService,
	NotifyService,
	NavigService,
	LocalstorageService,
	DialogsService,
	ConfigurationService,
	AppService
];

export * from './app/app.service';
export * from './configuration/configuration.service';
export * from './dialogs/dialogs.service';
export * from './localstorage/localstorage.service';
export * from './navig/navig.service';
export * from './notify/notify.service';
export * from './player/player.service';
export * from './player/player.interface';
export * from './push-notification/push-notification.service';
export * from './queue/queue.service';
export * from './settings-store/settings-store.service';
export * from './title/title.service';
export * from './userstorage/userstorage.service';
