import {Directive, OnChanges, SimpleChange, inject, input} from '@angular/core';
import {ImageFormatType, JamService} from '@jam';

@Directive({
	selector: '[appBackgroundImage]',
	standalone: false,
	host: {
		'[style.backgroundImage]': 'backgroundImage'
	}
})
export class BackgroundImageDirective implements OnChanges {
	readonly backgroundImageID = input<string>(undefined, {alias: 'appBackgroundImage'});
	backgroundImage?: string;
	private readonly jam = inject(JamService);

	ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
		if (changes.backgroundImageID) {
			const id = changes.backgroundImageID.currentValue;
			this.backgroundImage = `url(${this.jam.image.imageUrl({id, size: 600, format: ImageFormatType.webp})})`;
		}
	}
}
