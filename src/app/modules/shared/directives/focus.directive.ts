import {Directive, ElementRef, HostListener, OnInit, inject} from '@angular/core';
import {isLeftArrowKey, isLeftRightArrowKeys, isRightArrowKey} from '@app/utils/keys';

@Directive({
	selector: '[appFocusable]',
	standalone: false
})
export class FocusDirective implements OnInit {
	private readonly element = inject(ElementRef);

	getNextElement(event: KeyboardEvent): HTMLElement | undefined {
		if (isRightArrowKey(event)) {
			return this.element.nativeElement.nextElementSibling;
		}
		if (isLeftArrowKey(event)) {
			return this.element.nativeElement.previousElementSibling;
		}
		return;
	}

	@HostListener('keydown', ['$event'])
	onKeyDown(event: KeyboardEvent): void {
		if (isLeftRightArrowKeys(event)) {
			const nextFocused = this.getNextElement(event);
			if (nextFocused) {
				nextFocused.focus();
				event.preventDefault();
				event.stopPropagation();
			}
		}
	}

	ngOnInit(): void {
		this.element.nativeElement.tabIndex = -1; // make it focusable
	}

}
