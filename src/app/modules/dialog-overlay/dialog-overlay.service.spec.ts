import {OverlayModule} from '@angular/cdk/overlay';
import {inject, TestBed} from '@angular/core/testing';
import {DialogOverlayService} from './dialog-overlay.service';

describe('DialogOverlayService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [OverlayModule],
			providers: [DialogOverlayService]
		});
	});

	it('should be created', inject([DialogOverlayService], (service: DialogOverlayService) => {
		expect(service).toBeTruthy();
	}));
});
