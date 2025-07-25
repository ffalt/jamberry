import {Component} from '@angular/core';
import type {DialogOverlay, DialogOverlayDialogConfig, DialogOverlayRef} from '@app/modules/dialog-overlay';

export interface PasswordEdit {
	pass: string;
}

@Component({
    selector: 'app-dialog-password',
    templateUrl: './dialog-password.component.html',
    styleUrls: ['./dialog-password.component.scss'],
    standalone: false
})
export class DialogPasswordComponent implements DialogOverlay<PasswordEdit> {
	data?: PasswordEdit;

	dialogInit(reference: DialogOverlayRef, options: Partial<DialogOverlayDialogConfig<PasswordEdit>>): void {
		this.data = options.data;
	}
}
