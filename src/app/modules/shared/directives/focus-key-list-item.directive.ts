import {FocusableOption} from '@angular/cdk/a11y';
import {Directive, ElementRef, HostBinding, Input} from '@angular/core';

@Directive({
	selector: '[appFocusKeyListItem]'
})
export class FocusKeyListItemDirective implements FocusableOption {
	@HostBinding() tabindex = -1;
	@HostBinding('attr.role') listRole = 'list-item';

	constructor(protected element: ElementRef) {
	}

	focus() {
		this.element.nativeElement.focus();
	}
}
