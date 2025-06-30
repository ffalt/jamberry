import {Directive, output} from '@angular/core';

@Directive({
	// eslint-disable-next-line @angular-eslint/directive-selector
	selector: '[clickenter]',
	standalone: false,
	host: {
		'(click)': 'stopClick($event)',
		'(keydown.enter)': 'stopClick($event)'
	}
})
export class ClickKeyEnterDirective {
	readonly clickenter = output<KeyboardEvent | MouseEvent>();

	stopClick(event: KeyboardEvent | MouseEvent): void {
		this.clickenter.emit(event);
	}
}
