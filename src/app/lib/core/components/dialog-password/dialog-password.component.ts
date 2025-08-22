import { Component } from '@angular/core';
import type { DialogOverlay, DialogOverlayDialogConfig, DialogOverlayRef } from '@modules/dialog-overlay';
import { FormsModule } from '@angular/forms';

export interface PasswordEdit {
	pass: string;
}

@Component({
	selector: 'app-dialog-password',
	templateUrl: './dialog-password.component.html',
	styleUrls: ['./dialog-password.component.scss'],
	imports: [FormsModule]
})
export class DialogPasswordComponent implements DialogOverlay<PasswordEdit> {
	data?: PasswordEdit;

	dialogInit(reference: DialogOverlayRef, options: Partial<DialogOverlayDialogConfig<PasswordEdit>>): void {
		this.data = options.data;
	}
}
