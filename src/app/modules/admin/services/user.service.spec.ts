import {TEST_ADMIN_MODULE_IMPORTS, TEST_ADMIN_MODULE_PROVIDERS} from '@admin/admin.module.mock';
import {inject, TestBed} from '@angular/core/testing';
import {UserService} from './user.service';

describe('UserService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule(
			{
				imports: [...TEST_ADMIN_MODULE_IMPORTS],
				providers: [...TEST_ADMIN_MODULE_PROVIDERS]
			});
	});

	it('should be created', inject([UserService], (service: UserService) => {
		expect(service).toBeTruthy();
	}));
});
