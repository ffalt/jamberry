import {Directive, ElementRef, Input, OnInit} from '@angular/core';

@Directive({
	selector: '[appAutofocus]'
})
export class AutofocusDirective implements OnInit {
	@Input() set autofocus(condition: boolean) {
		this.focus = condition;
	}

	private focus: boolean = true;

	constructor(private el: ElementRef) {
	}

	ngOnInit(): void {
		if (this.focus) {
			// Otherwise Angular throws error: Expression has changed after it was checked.
			window.setTimeout(() => {
				this.el.nativeElement.focus();
			});
		}
	}
}
