import {EventEmitter, Injectable, type OnDestroy, inject} from '@angular/core';
import {Settings} from '@app/app.settings';
import {Subject, takeUntil} from 'rxjs';
import {AppService} from '../app/app.service';
import {PushNotificationService} from '../push-notification/push-notification.service';
import {UserStorageService} from '../userstorage/userstorage.service';

@Injectable({
	providedIn: 'root'
})
export class SettingsStoreService implements OnDestroy {
	private static readonly localstorageName = 'settings';
	readonly settingsChange = new EventEmitter<void>();
	private readonly unsubscribe = new Subject<void>();
	private readonly userStorage = inject(UserStorageService);
	private readonly pushNotificationService = inject(PushNotificationService);
	private readonly app = inject(AppService);

	constructor() {
		const userStorage = this.userStorage;

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
			for (const key of Object.keys(this.app.settings)) {
				this.app.settings[key] = load[key];
			}
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
