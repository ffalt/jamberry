import { Component, signal } from '@angular/core';
import type { DialogOverlay, DialogOverlayDialogConfig, DialogOverlayRef } from '@modules/dialog-overlay';

@Component({
	selector: 'app-text-overlay-content',
	templateUrl: './text-overlay-content.component.html',
	styleUrls: ['./text-overlay-content.component.scss']
})
export class TextOverlayContentComponent implements DialogOverlay<string> {
	readonly data = signal<string | undefined>(undefined);

	dialogInit(_reference: DialogOverlayRef, options: Partial<DialogOverlayDialogConfig<string>>): void {
		this.data.set(options.data);
	}
}
