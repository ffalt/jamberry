import type { FocusableOption } from '@angular/cdk/a11y';
import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
	selector: '[appFocusKeyListItem]',
	host: {
		'[tabindex]': 'tabindex'
	}
})
export class FocusKeyListItemDirective implements FocusableOption {
	tabindex = -1;
	protected readonly element = inject<ElementRef<HTMLElement>>(ElementRef);

	focus() {
		this.element.nativeElement.focus();
	}
}
