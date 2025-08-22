import { inject, TestBed } from '@angular/core/testing';
import { TEST_IMPORTS, TEST_PROVIDERS } from '../../../../app.mock';
import { PodcastService } from './podcast.service';

describe('PodcastService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [...TEST_IMPORTS],
			providers: [...TEST_PROVIDERS],
			teardown: { destroyAfterEach: false }
		});
	});

	it('should be created', inject([PodcastService], (service: PodcastService) => {
		expect(service).toBeTruthy();
	}));
});
