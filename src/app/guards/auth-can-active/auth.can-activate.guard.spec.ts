import {inject, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {ToastModule} from '@app/modules/toast';
import {TEST_JAM_MODULE} from '@core/jam.module.mock';
import {SharedModule} from '@shared/shared.module';
import {AuthCanActivateGuard} from './auth.can-activate.guard';

describe('AuthGuard', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
    imports: [SharedModule, RouterTestingModule, ToastModule.forRoot(), TEST_JAM_MODULE],
    providers: [AuthCanActivateGuard],
    teardown: { destroyAfterEach: false }
});
	});

	it('should create', inject([AuthCanActivateGuard], (guard: AuthCanActivateGuard) => {
		expect(guard).toBeTruthy();
	}));
});
