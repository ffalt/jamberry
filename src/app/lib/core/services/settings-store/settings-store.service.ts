import { DestroyRef, EventEmitter, inject, Service } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Settings } from '../../../../app.settings';
import { AppService } from '../app/app.service';
import { PushNotificationService } from '../push-notification/push-notification.service';
import { UserStorageService } from '../userstorage/userstorage.service';

@Service()
export class SettingsStoreService {
	private static readonly localstorageName = 'settings';
	readonly settingsChange = new EventEmitter<void>();
	private readonly lifeRef = inject(DestroyRef);
	private readonly userStorage = inject(UserStorageService);
	private readonly pushNotificationService = inject(PushNotificationService);
	private readonly app = inject(AppService);

	constructor() {
		this.userStorage.userChange
			.pipe(takeUntilDestroyed(this.lifeRef))
			.subscribe((/* user */) => {
				this.loadFromStorage();
			});
		this.loadFromStorage();
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
		this.userStorage.set(SettingsStoreService.localstorageName, this.app.settings);
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
