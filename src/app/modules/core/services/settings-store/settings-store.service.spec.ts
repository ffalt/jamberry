import {inject, TestBed} from '@angular/core/testing';
import {AppService, LocalstorageService, PushNotificationService, UserStorageService} from '@core/services';
import {SettingsStoreService} from './settings-store.service';

describe('SettingsStoreService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [SettingsStoreService, AppService, UserStorageService, PushNotificationService, LocalstorageService]
		});
	});

	it('should be created', inject([SettingsStoreService], (service: SettingsStoreService) => {
		expect(service).toBeTruthy();
	}));
});
