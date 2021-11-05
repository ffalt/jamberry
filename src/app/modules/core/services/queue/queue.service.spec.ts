import {inject, TestBed} from '@angular/core/testing';
import {ToastModule} from '@app/modules/toast';
import {TEST_JAM_MODULE} from '@core/jam.module.mock';
import {QueueService} from './queue.service';

describe('QueueService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
    imports: [ToastModule.forRoot(), TEST_JAM_MODULE],
    providers: [],
    teardown: { destroyAfterEach: false }
});
	});

	it('should be created', inject([QueueService], (service: QueueService) => {
		expect(service).toBeTruthy();
	}));
});
