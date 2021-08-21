import {FocusableOption} from '@angular/cdk/a11y';
import {Directive, ElementRef, HostBinding} from '@angular/core';

@Directive({
	selector: '[appFocusKeyListItem]'
})
export class FocusKeyListItemDirective implements FocusableOption {
	@HostBinding() tabindex = -1;
	@HostBinding('attr.role') role = 'list-item';

	constructor(protected element: ElementRef) {
	}

	focus() {
		this.element.nativeElement.focus();
	}
}
