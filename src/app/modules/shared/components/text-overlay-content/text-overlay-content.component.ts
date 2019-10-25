import {Component} from '@angular/core';
import {DialogOverlay, DialogOverlayDialogConfig, DialogOverlayRef} from '@app/modules/dialog-overlay';

@Component({
	selector: 'app-text-overlay-content',
	templateUrl: './text-overlay-content.component.html',
	styleUrls: ['./text-overlay-content.component.scss']
})
export class TextOverlayContentComponent implements DialogOverlay<string> {
	data: string;

	dialogInit(reference: DialogOverlayRef, options: Partial<DialogOverlayDialogConfig<string>>): void {
		this.data = options.data;
	}

}
