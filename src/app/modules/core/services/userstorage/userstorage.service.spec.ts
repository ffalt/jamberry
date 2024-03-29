import {inject, TestBed} from '@angular/core/testing';
import {LocalstorageService, UserStorageService} from '@core/services';

describe('UserStorageService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
    providers: [UserStorageService, LocalstorageService],
    teardown: { destroyAfterEach: false }
});
	});

	it('should be created', inject([UserStorageService], (service: UserStorageService) => {
		expect(service).toBeTruthy();
	}));
});
