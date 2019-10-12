import {Directive, ElementRef} from '@angular/core';

@Directive({
	// tslint:disable-next-line:directive-selector
	selector: '[toastContainer]',
	exportAs: 'toastContainer'
})
export class ToastContainerDirective {
	constructor(private el: ElementRef) {
	}

	getContainerElement(): HTMLElement {
		return this.el.nativeElement;
	}
}

// @NgModule({
// 	declarations: [ToastContainerDirective],
// 	exports: [ToastContainerDirective]
// })
// export class ToastContainerModule {
// }
