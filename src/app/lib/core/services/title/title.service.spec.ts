import { inject, TestBed } from '@angular/core/testing';
import { TitleService } from './title.service';
import { TEST_IMPORTS, TEST_PROVIDERS } from '../../../../app.mock';

describe('TitleService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [...TEST_IMPORTS],
			providers: [...TEST_PROVIDERS, TitleService],
			teardown: { destroyAfterEach: false }
		});
	});

	it('should be created', inject([TitleService], (service: TitleService) => {
		expect(service).toBeTruthy();
	}));
});
