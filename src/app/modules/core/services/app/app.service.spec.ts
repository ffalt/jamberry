import {inject, TestBed} from '@angular/core/testing';
import {AppService} from './app.service';

describe('AppService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
    providers: [AppService],
    teardown: { destroyAfterEach: false }
});
	});

	it('should be created', inject([AppService], (service: AppService) => {
		expect(service).toBeTruthy();
	}));
});
