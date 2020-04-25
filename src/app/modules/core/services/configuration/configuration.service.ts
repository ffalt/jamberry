import {Inject, Injectable, InjectionToken} from '@angular/core';

import {Auth, Jam, JamConfiguration} from '@jam';
import {AppService} from '../app/app.service';
import {LocalstorageService} from '../localstorage/localstorage.service';
import {UserStorageService} from '../userstorage/userstorage.service';

export const WINDOW = new InjectionToken('window',
	{providedIn: 'root', factory: (): Window => window}
);

@Injectable({
	providedIn: 'root'
})
export class ConfigurationService extends JamConfiguration {
	static localStorageName = 'jam.auth';
	clientName: string;
	clientDomain?: string = undefined;

	constructor(
		private localstorage: LocalstorageService, private userStorage: UserStorageService, private app: AppService,
		@Inject(WINDOW) private window: Window
	) {
		super();
		this.clientName = app.name;
		this.clientDomain = window.location.origin;
	}

	domain(): string {
		return this.clientDomain;
	}

	async fromStorage(): Promise<{ user: Jam.User; auth: Auth } | undefined> {
		return this.localstorage.get<{ user: Jam.User; auth: Auth }>(ConfigurationService.localStorageName);
	}

	async toStorage(data: { user: Jam.User; auth: Auth } | undefined): Promise<void> {
		this.localstorage.set(ConfigurationService.localStorageName, data);
	}

	async userChangeNotify(user: Jam.User | undefined): Promise<void> {
		this.userStorage.notifyUserChange(user);
	}

}
