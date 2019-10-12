import {Directive, ElementRef, HostBinding, Input, OnChanges, SimpleChange} from '@angular/core';
import {JamService} from '@jam';

@Directive({
	selector: '[appBackgroundImage]'
})
export class BackgroundImageDirective implements OnChanges {
	@Input('appBackgroundImage') backgroundImageID: string;
	@HostBinding('style.backgroundImage') backgroundImage: string = undefined;

	constructor(private element: ElementRef, private jam: JamService) {
	}

	ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
		if (changes.backgroundImageID) {
			const id = changes.backgroundImageID.currentValue;
			this.backgroundImage = `url(${this.jam.base.image_url(id, 400)})`;
		}
	}

}
