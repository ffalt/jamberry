import {Component} from '@angular/core';
import type {DialogOverlay, DialogOverlayDialogConfig, DialogOverlayRef} from '@app/modules/dialog-overlay';
import type {Jam} from '@jam';

export interface UserPasswordEdit {
	user: Jam.User;
	password: string;
	newPassword: string;
}

@Component({
    selector: 'app-dialog-user-pass',
    templateUrl: './dialog-user-pass.component.html',
    styleUrls: ['./dialog-user-pass.component.scss'],
    standalone: false
})
export class DialogUserPassComponent implements DialogOverlay<UserPasswordEdit> {
	data?: UserPasswordEdit;

	dialogInit(reference: DialogOverlayRef, options: Partial<DialogOverlayDialogConfig<UserPasswordEdit>>): void {
		this.data = options.data;
	}

	dialogResult(): boolean {
		return true;
	}
}
