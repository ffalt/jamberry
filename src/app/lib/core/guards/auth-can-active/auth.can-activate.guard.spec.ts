import { inject, TestBed } from '@angular/core/testing';
import { AuthCanActivateGuard } from './auth.can-activate.guard';
import { TEST_IMPORTS } from '../../../../app.mock';

describe('AuthCanActivateGuard', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [...TEST_IMPORTS],
			providers: [AuthCanActivateGuard],
			teardown: { destroyAfterEach: false }
		});
	});

	it('should create', inject([AuthCanActivateGuard], (guard: AuthCanActivateGuard) => {
		expect(guard).toBeTruthy();
	}));
});
