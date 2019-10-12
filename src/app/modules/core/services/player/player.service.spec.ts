import {inject, TestBed} from '@angular/core/testing';
import {ToastModule} from '@app/modules/toast';
import {TEST_JAM_MODULE} from '@core/jam.module.mock';
import {PlayerService, PushNotificationService, QueueService} from '@core/services';

describe('PlayerService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ToastModule.forRoot(), TEST_JAM_MODULE],
			providers: [QueueService, PushNotificationService]
		});
	});

	it('should be created', inject([PlayerService], (service: PlayerService) => {
		expect(service).toBeTruthy();
	}));
});
