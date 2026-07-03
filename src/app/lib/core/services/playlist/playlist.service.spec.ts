import { inject, TestBed } from '@angular/core/testing';
import { TEST_IMPORTS, TEST_PROVIDERS } from '../../../../app.mock';
import { PlaylistService } from './playlist.service';
import { describe, it, expect, beforeEach } from 'vitest';

describe('PlaylistService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [...TEST_IMPORTS],
			providers: [...TEST_PROVIDERS],
			teardown: { destroyAfterEach: false }
		});
	});

	it('should be created', inject([PlaylistService], (service: PlaylistService) => {
		expect(service)
			.toBeTruthy();
	}));
});
