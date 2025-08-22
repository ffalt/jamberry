import { inject, TestBed } from '@angular/core/testing';
import { SettingsStoreService } from './settings-store.service';
import { TEST_PROVIDERS } from '../../../../app.mock';

describe('SettingsStoreService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [...TEST_PROVIDERS],
			teardown: { destroyAfterEach: false }
		});
	});

	it('should be created', inject([SettingsStoreService], (service: SettingsStoreService) => {
		expect(service).toBeTruthy();
	}));
});
