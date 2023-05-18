import {Component, Input, OnChanges} from '@angular/core';

export interface Base64Image {
	base64: string;
	mimeType: string;
	title: string;
}

@Component({
	selector: 'app-image-base64',
	templateUrl: './image-base64.component.html',
	styleUrls: ['./image-base64.component.scss']
})
export class ImageBase64Component implements OnChanges {
	@Input() image?: Base64Image;
	src?: string;

	ngOnChanges(): void {
		this.src = undefined;
		if (this.image) {
			this.src = `data:${(this.image.mimeType || 'image/jpeg')};base64,${this.image.base64}`;
		}
	}
}
