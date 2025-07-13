import {Directive, ElementRef, type OnChanges, type SimpleChange, inject, input} from '@angular/core';
import {DeferLoadService} from './defer-load.service';

@Directive({
	selector: '[appDeferLoadScrollHost]',
	standalone: false,
	host: {
		'(scroll)': 'scrollTrack()'
	}
})
export class DeferLoadScrollHostDirective implements OnChanges {
	readonly scrollTo = input<any>();
	private readonly element = inject(ElementRef);
	private readonly scrollNotify = inject(DeferLoadService);

	ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
		if (changes.scrollTo?.currentValue) {
			const o = changes.scrollTo.currentValue;
			if (o.id && o.id.length > 0) {
				const elm = document.getElementById(o.id);
				if (elm) {
					this.element.nativeElement.scrollTop = elm.offsetTop - elm.offsetHeight;
				}
			}
		}
	}

	scrollTrack(): void {
		this.scrollNotify.notifyScroll({name: 'scroll-host', element: this.element.nativeElement});
	}
}
