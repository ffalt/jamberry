import { inject, TestBed } from '@angular/core/testing';
import { TEST_IMPORTS, TEST_PROVIDERS } from '../../../../app.mock';
import { PlayerService } from './player.service';

describe('PlayerService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [...TEST_IMPORTS],
			providers: [...TEST_PROVIDERS],
			teardown: { destroyAfterEach: false }
		});
	});

	it('should be created', inject([PlayerService], (service: PlayerService) => {
		expect(service).toBeTruthy();
	}));
});
