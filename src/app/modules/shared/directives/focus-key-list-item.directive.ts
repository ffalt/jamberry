import type {FocusableOption} from '@angular/cdk/a11y';
import {Directive, ElementRef, inject} from '@angular/core';

@Directive({
	selector: '[appFocusKeyListItem]',
	standalone: false,
	host: {
		"[tabindex]": 'tabindex'
	}
})
export class FocusKeyListItemDirective implements FocusableOption {
	tabindex = -1;
	protected readonly element = inject(ElementRef);

	focus() {
		this.element.nativeElement.focus();
	}
}
