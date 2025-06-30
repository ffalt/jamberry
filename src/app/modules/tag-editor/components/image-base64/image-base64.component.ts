import {Component, OnChanges, input} from '@angular/core';

export interface Base64Image {
	base64: string;
	mimeType: string;
	title: string;
}

@Component({
	selector: 'app-image-base64',
	templateUrl: './image-base64.component.html',
	styleUrls: ['./image-base64.component.scss'],
	standalone: false
})
export class ImageBase64Component implements OnChanges {
	readonly image = input<Base64Image>();
	src?: string;

	ngOnChanges(): void {
		this.src = undefined;
		const image = this.image();
		if (image) {
			this.src = `data:${(image.mimeType || 'image/jpeg')};base64,${image.base64}`;
		}
	}
}
