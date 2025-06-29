import {Directive, HostListener, output} from '@angular/core';

@Directive({
	// eslint-disable-next-line @angular-eslint/directive-selector
	selector: '[clickenter]',
	standalone: false
})
export class ClickKeyEnterDirective {
	readonly clickenter = output<KeyboardEvent | MouseEvent>();

	@HostListener('click', ['$event'])
	@HostListener('keydown.enter', ['$event'])
	stopClick(event: KeyboardEvent | MouseEvent): void {
		this.clickenter.emit(event);
	}

}
