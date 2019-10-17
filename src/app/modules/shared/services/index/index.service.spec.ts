import {inject, TestBed} from '@angular/core/testing';
import {TEST_LIBRARY_IMPORTS, TEST_LIBRARY_PROVIDERS} from '@library/library.module.mock';
import {IndexService} from './index.service';

describe('IndexService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [...TEST_LIBRARY_IMPORTS],
			providers: [...TEST_LIBRARY_PROVIDERS]
		});
	});

	it('should be created', inject([IndexService], (service: IndexService) => {
		expect(service)
			.toBeTruthy();
	}));
});
