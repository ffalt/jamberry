import {Directive, HostListener} from '@angular/core';

@Directive({
    selector: '[appClickStop]',
    standalone: false
})
export class ClickStopDirective {

	@HostListener('click', ['$event'])
	@HostListener('mouseup', ['$event'])
	stopClick(event: Event): void {
		event.preventDefault();
		event.stopPropagation();
	}

}
