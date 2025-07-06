import {inject, TestBed} from '@angular/core/testing';
import {DialogOverlayModule} from '@app/modules/dialog-overlay';
import {DialogsService} from './dialogs.service';

describe('DialogsService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
    imports: [DialogOverlayModule],
    providers: [DialogsService],
    teardown: { destroyAfterEach: false }
});
	});

	it('should be created', inject([DialogsService], (service: DialogsService) => {
		expect(service).toBeTruthy();
	}));
});
