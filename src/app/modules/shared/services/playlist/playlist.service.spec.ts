import {inject, TestBed} from '@angular/core/testing';
import {TEST_LIBRARY_IMPORTS, TEST_LIBRARY_PROVIDERS} from '@library/library.module.mock';
import {PlaylistService} from './playlist.service';

describe('PlaylistService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
    imports: [...TEST_LIBRARY_IMPORTS],
    providers: [...TEST_LIBRARY_PROVIDERS],
    teardown: { destroyAfterEach: false }
});
	});

	it('should be created', inject([PlaylistService], (service: PlaylistService) => {
		expect(service)
			.toBeTruthy();
	}));
});
