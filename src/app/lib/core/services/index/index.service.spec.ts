import { inject, TestBed } from '@angular/core/testing';
import { TEST_IMPORTS, TEST_PROVIDERS } from '../../../../app.mock';
import { IndexService } from './index.service';

describe('IndexService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [...TEST_IMPORTS],
			providers: [...TEST_PROVIDERS, IndexService],
			teardown: { destroyAfterEach: false }
		});
	});

	it('should be created', inject([IndexService], (service: IndexService) => {
		expect(service)
			.toBeTruthy();
	}));
});
