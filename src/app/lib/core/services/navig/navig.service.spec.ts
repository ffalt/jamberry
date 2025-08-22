import { inject, TestBed } from '@angular/core/testing';
import { NavigService } from './navig.service';

describe('NavigService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [],
			providers: [],
			teardown: { destroyAfterEach: false }
		});
	});

	it('should be created', inject([NavigService], (service: NavigService) => {
		expect(service).toBeTruthy();
	}));
});
