import { Component, ChangeDetectionStrategy } from '@angular/core';
import type { DialogOverlay, DialogOverlayDialogConfig, DialogOverlayRef } from '@modules/dialog-overlay';
import { IconSpinComponent } from '@core/components/icons/icon-spin.component';

export interface Image {
	name: string;
	url: string;
}

@Component({
	imports: [IconSpinComponent],
	selector: 'app-image-overlay-content',
	templateUrl: './image-overlay-content.component.html',
	changeDetection: ChangeDetectionStrategy.Eager,
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
