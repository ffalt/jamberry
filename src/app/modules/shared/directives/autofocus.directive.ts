import {Directive, ElementRef, Input, OnInit, inject} from '@angular/core';

@Directive({
	selector: '[appAutofocus]',
	standalone: false
})
export class AutofocusDirective implements OnInit {
	private el = inject(ElementRef);

	@Input() set autofocus(condition: boolean) {
		this.focus = condition;
	}

	private focus: boolean = true;

	ngOnInit(): void {
		if (this.focus) {
			// Otherwise Angular throws error: Expression has changed after it was checked.
			window.setTimeout(() => {
				this.el.nativeElement.focus();
			});
		}
	}
}
