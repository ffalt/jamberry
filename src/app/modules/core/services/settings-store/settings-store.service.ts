import {EventEmitter, Injectable, OnDestroy} from '@angular/core';
import {Settings} from '@app/app.settings';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {AppService} from '../app/app.service';
import {PushNotificationService} from '../push-notification/push-notification.service';
import {UserStorageService} from '../userstorage/userstorage.service';

@Injectable({
	providedIn: 'root'
})
export class SettingsStoreService implements OnDestroy {
	private static localstorageName = 'settings';
	settingsChange = new EventEmitter<void>();
	protected unsubscribe = new Subject();

	constructor(private userStorage: UserStorageService, private pushNotificationService: PushNotificationService, private app: AppService) {
		userStorage.userChange
			.pipe(takeUntil(this.unsubscribe)).subscribe((/*user*/) => {
				this.loadFromStorage();
			});
		this.loadFromStorage();
	}

	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}

	loadFromStorage(): void {
		const load = this.userStorage.get<Settings>(SettingsStoreService.localstorageName);
		if (load) {
			Object.keys(this.app.settings)
				.forEach(key => {
					(this.app.settings as any)[key] = (load as any)[key]; // TODO: save & typed settings restore
				});
			this.setTheme();
			this.pushNotificationService.enabled = this.app.settings.notificationSong;
		} else {
			this.app.settings = new Settings();
		}
	}

	saveSettings(): void {
		this.userStorage.set<Settings>(SettingsStoreService.localstorageName, this.app.settings);
	}

	applySettings(): void {
		this.saveSettings();
		this.pushNotificationService.enabled = this.app.settings.notificationSong;
		setTimeout(() => {
			this.setTheme();
		}, 0);
	}

	setTheme(): void {
		this.settingsChange.emit();
	}

}
