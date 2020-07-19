import {inject, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {DialogOverlayModule} from '@app/modules/dialog-overlay';
import {DialogsService} from './dialogs.service';

describe('DialogsService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [RouterTestingModule, DialogOverlayModule],
			providers: [DialogsService]
		});
	});

	it('should be created', inject([DialogsService], (service: DialogsService) => {
		expect(service).toBeTruthy();
	}));
});
