import { Component, signal } from '@angular/core';
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
	readonly data = signal<PasswordEdit | undefined>(undefined);

	dialogInit(reference: DialogOverlayRef, options: Partial<DialogOverlayDialogConfig<PasswordEdit>>): void {
		this.data.set(options.data);
	}
}
