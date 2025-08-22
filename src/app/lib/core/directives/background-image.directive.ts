import { Directive, inject, input, type OnChanges } from '@angular/core';
import { ImageFormatType, JamService } from '@jam';

@Directive({
	selector: '[appBackgroundImage]',
	host: {
		'[style.backgroundImage]': 'backgroundImage'
	}
})
export class BackgroundImageDirective implements OnChanges {
	readonly backgroundImageID = input<string>(undefined, { alias: 'appBackgroundImage' });
	backgroundImage?: string;
	private readonly jam = inject(JamService);

	ngOnChanges(changes: { backgroundImageID?: { currentValue?: string } }): void {
		if (changes.backgroundImageID) {
			this.backgroundImage = changes.backgroundImageID.currentValue ?
				`url(${this.jam.image.imageUrl(
					{ id: changes.backgroundImageID.currentValue, size: 600, format: ImageFormatType.webp }
				)})` :
				undefined;
		}
	}
}
