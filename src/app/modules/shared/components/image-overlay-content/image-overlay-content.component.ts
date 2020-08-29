import {Component} from '@angular/core';
import {DialogOverlay, DialogOverlayDialogConfig, DialogOverlayRef} from '@app/modules/dialog-overlay';

export interface Image {
	name: string;
	url: string;
}

@Component({
	selector: 'app-image-overlay-content',
	templateUrl: './image-overlay-content.component.html',
	styleUrls: ['./image-overlay-content.scss']
})
export class ImageOverlayContentComponent implements DialogOverlay<Image> {
	data?: Image;
	loading = true;

	dialogInit(reference: DialogOverlayRef, options: Partial<DialogOverlayDialogConfig<Image>>): void {
		this.data = options.data;
	}

	onLoad(): void {
		this.loading = false;
	}
}
