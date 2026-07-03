import { inject, TestBed } from '@angular/core/testing';
import { UserStorageService } from './userstorage.service';
import { LocalstorageService } from '../localstorage/localstorage.service';
import { describe, it, expect, beforeEach } from 'vitest';

describe('UserStorageService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [UserStorageService, LocalstorageService],
			teardown: { destroyAfterEach: false }
		});
	});

	it('should be created', inject([UserStorageService], (service: UserStorageService) => {
		expect(service).toBeTruthy();
	}));
});
