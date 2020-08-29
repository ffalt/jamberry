import {Component} from '@angular/core';
import {DialogOverlay, DialogOverlayDialogConfig, DialogOverlayRef} from '@app/modules/dialog-overlay';

@Component({
	selector: 'app-dialog-confirm-modal',
	template: '',
	styles: [':host { display: block; padding: 5px; } ']
})
export class DialogConfirmComponent implements DialogOverlay<string> {
	parentInfo?: string;

	dialogInit(reference: DialogOverlayRef, options: Partial<DialogOverlayDialogConfig<string>>): void {
		this.parentInfo = options.data;
	}

}
