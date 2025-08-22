import { createOverlayRef } from '@angular/cdk/overlay';
import { Injector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DialogOverlayRef } from './dialog-overlay-ref.class';

describe('DialogOverlayRef', () => {
	it('create an instance', () => {
		const injector = TestBed.inject(Injector);
		const overlayRef = createOverlayRef(injector);
		const ref = new DialogOverlayRef(overlayRef);
		expect(ref).toBeTruthy();
	});
});
