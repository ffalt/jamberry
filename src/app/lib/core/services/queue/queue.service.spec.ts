import { inject, TestBed } from '@angular/core/testing';
import { ToastModule } from '@modules/toast';
import { QueueService } from './queue.service';
import { TEST_JAM_MODULE } from '../../../../app.mock';

describe('QueueService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ToastModule.forRoot(), TEST_JAM_MODULE],
			teardown: { destroyAfterEach: false }
		});
	});

	it('should be created', inject([QueueService], (service: QueueService) => {
		expect(service).toBeTruthy();
	}));
});
