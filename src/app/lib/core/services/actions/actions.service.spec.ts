import { inject, TestBed } from '@angular/core/testing';
import { TEST_IMPORTS } from '../../../../app.mock';
import { ActionsService } from './actions.service';
import { describe, it, expect, beforeEach } from 'vitest';

describe('ActionsService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [...TEST_IMPORTS],
			providers: [ActionsService],
			teardown: { destroyAfterEach: false }
		});
	});

	it('should be created', inject([ActionsService], (service: ActionsService) => {
		expect(service).toBeTruthy();
	}));
});
