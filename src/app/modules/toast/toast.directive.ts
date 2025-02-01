import {Directive, ElementRef} from '@angular/core';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[toastContainer]',
    exportAs: 'toastContainer',
    standalone: false
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
