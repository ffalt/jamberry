import { Component, ChangeDetectionStrategy } from '@angular/core';
import type { DialogOverlay, DialogOverlayDialogConfig, DialogOverlayRef } from '@modules/dialog-overlay';

@Component({
	selector: 'app-text-overlay-content',
	templateUrl: './text-overlay-content.component.html',
	changeDetection: ChangeDetectionStrategy.Eager,
	styleUrls: ['./text-overlay-content.component.scss']
})
export class TextOverlayContentComponent implements DialogOverlay<string> {
	data?: string;

	dialogInit(reference: DialogOverlayRef, options: Partial<DialogOverlayDialogConfig<string>>): void {
		this.data = options.data;
	}
}
