import {FocusableOption} from '@angular/cdk/a11y';
import {Directive, ElementRef, HostBinding} from '@angular/core';

@Directive({
    selector: '[appFocusKeyListItem]',
    standalone: false
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
