import { inject, TestBed } from '@angular/core/testing';
import { PushNotificationService } from './push-notification.service';
import { describe, it, expect, beforeEach } from 'vitest';

describe('PushNotificationService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [PushNotificationService],
			teardown: { destroyAfterEach: false }
		});
	});

	it('should be created', inject([PushNotificationService], (service: PushNotificationService) => {
		expect(service).toBeTruthy();
	}));
});
