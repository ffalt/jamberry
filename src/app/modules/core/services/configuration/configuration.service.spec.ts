import {inject, TestBed} from '@angular/core/testing';
import {TEST_JAM_MODULE} from '@core/jam.module.mock';
import {ConfigurationService} from '@core/services';

describe('ConfigurationService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
    imports: [TEST_JAM_MODULE],
    providers: [ConfigurationService],
    teardown: { destroyAfterEach: false }
});
	});

	it('should be created', inject([ConfigurationService], (service: ConfigurationService) => {
		expect(service).toBeTruthy();
	}));
});
