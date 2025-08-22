import { inject, TestBed } from '@angular/core/testing';
import { TEST_JAM_MODULE } from '../../../../app.mock';
import { ConfigurationService } from './configuration.service';

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
