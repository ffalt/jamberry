import {FocusableOption} from '@angular/cdk/a11y';
import {Directive, ElementRef, HostBinding, inject} from '@angular/core';

@Directive({
	selector: '[appFocusKeyListItem]',
	standalone: false
})
export class FocusKeyListItemDirective implements FocusableOption {
	@HostBinding() tabindex = -1;
	protected readonly element = inject(ElementRef);

	focus() {
		this.element.nativeElement.focus();
	}
}
