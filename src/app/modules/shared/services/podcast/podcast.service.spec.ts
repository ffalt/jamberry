import {inject, TestBed} from '@angular/core/testing';
import {TEST_LIBRARY_IMPORTS, TEST_LIBRARY_PROVIDERS} from '@library/library.module.mock';
import {PodcastService} from './podcast.service';

describe('PodcastService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [...TEST_LIBRARY_IMPORTS],
			providers: [...TEST_LIBRARY_PROVIDERS]
		});
	});

	it('should be created', inject([PodcastService], (service: PodcastService) => {
		expect(service).toBeTruthy();
	}));
});
