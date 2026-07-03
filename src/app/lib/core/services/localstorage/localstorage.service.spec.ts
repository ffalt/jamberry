import { inject, TestBed } from '@angular/core/testing';
import { LocalstorageService } from './localstorage.service';
import { describe, it, expect, beforeEach } from 'vitest';

describe('LocalstorageService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [LocalstorageService],
			teardown: { destroyAfterEach: false }
		});
	});

	it('should be created', inject([LocalstorageService], (service: LocalstorageService) => {
		expect(service).toBeTruthy();
	}));
});
