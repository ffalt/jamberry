import { Component, signal } from '@angular/core';
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
	styleUrls: ['./image-overlay-content.scss']
})
export class ImageOverlayContentComponent implements DialogOverlay<Image> {
	readonly data = signal<Image | undefined>(undefined);
	readonly loading = signal(true);

	dialogInit(_reference: DialogOverlayRef, options: Partial<DialogOverlayDialogConfig<Image>>): void {
		this.data.set(options.data);
	}

	onLoad(): void {
		this.loading.set(false);
	}
}
