import {Directive, HostBinding, Input, OnChanges, SimpleChange, inject} from '@angular/core';
import {ImageFormatType, JamService} from '@jam';

@Directive({
	selector: '[appBackgroundImage]',
	standalone: false
})
export class BackgroundImageDirective implements OnChanges {
	@Input('appBackgroundImage') backgroundImageID?: string;
	@HostBinding('style.backgroundImage') backgroundImage?: string;
	private readonly jam = inject(JamService);

	ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
		if (changes.backgroundImageID) {
			const id = changes.backgroundImageID.currentValue;
			this.backgroundImage = `url(${this.jam.image.imageUrl({id, size: 600, format: ImageFormatType.webp})})`;
		}
	}

}
