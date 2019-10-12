import {Directive, HostListener} from '@angular/core';

@Directive({
	selector: '[appClickStop]'
})
export class ClickStopDirective {

	@HostListener('click', ['$event'])
	@HostListener('mouseup', ['$event'])
	stopClick(event: Event): void {
		event.preventDefault();
		event.stopPropagation();
	}

}
