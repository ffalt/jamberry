import {Directive, EventEmitter, HostListener, Output} from '@angular/core';

@Directive({
	// eslint-disable-next-line @angular-eslint/directive-selector
	selector: '[clickenter]'
})
export class ClickKeyEnterDirective {
	@Output() readonly clickenter: EventEmitter<KeyboardEvent | MouseEvent> = new EventEmitter();

	@HostListener('click', ['$event'])
	@HostListener('keydown.enter', ['$event'])
	stopClick(event: KeyboardEvent | MouseEvent): void {
		this.clickenter.emit(event);
	}

}
