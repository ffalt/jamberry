import {inject, TestBed} from '@angular/core/testing';
import {ToastModule} from '@app/modules/toast/toast.module';
import {NotifyService} from './notify.service';

describe('NotifyService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
    imports: [ToastModule.forRoot()],
    providers: [NotifyService],
    teardown: { destroyAfterEach: false }
});
	});

	it('should be created', inject([NotifyService], (service: NotifyService) => {
		expect(service)
			.toBeTruthy();
	}));
});
