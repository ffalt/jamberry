import {Directive, ElementRef, inject} from '@angular/core';

@Directive({
	// eslint-disable-next-line @angular-eslint/directive-selector
	selector: '[toastContainer]',
	exportAs: 'toastContainer',
	standalone: false
})
export class ToastContainerDirective {
	private readonly el = inject(ElementRef);

	getContainerElement(): HTMLElement {
		return this.el.nativeElement;
	}
}
