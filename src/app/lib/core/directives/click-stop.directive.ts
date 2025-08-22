import { Directive } from '@angular/core';

@Directive({
	selector: '[appClickStop]',
	host: {
		'(click)': 'stopClick($event)',
		'(mouseup)': 'stopClick($event)'
	}
})
export class ClickStopDirective {
	stopClick(event: Event): void {
		event.preventDefault();
		event.stopPropagation();
	}
}
