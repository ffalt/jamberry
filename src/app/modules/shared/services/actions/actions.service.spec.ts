import {inject, TestBed} from '@angular/core/testing';
import {TEST_SHARED_MODULE_IMPORTS} from '@shared/shared.module.mock';
import {ActionsService} from './actions.service';

describe('ActionsService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
    imports: [TEST_SHARED_MODULE_IMPORTS],
    providers: [ActionsService],
    teardown: { destroyAfterEach: false }
});
	});

	it('should be created', inject([ActionsService], (service: ActionsService) => {
		expect(service).toBeTruthy();
	}));
});
