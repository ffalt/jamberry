import {Component} from '@angular/core';
import {UserEdit} from '@app/modules/admin-core/services';
import {DialogOverlay, DialogOverlayDialogConfig, DialogOverlayRef} from '@app/modules/dialog-overlay';

@Component({
	selector: 'app-dialog-user',
	templateUrl: 'dialog-user.component.html',
	styleUrls: ['dialog-user.component.scss']
})
export class DialogUserComponent implements DialogOverlay<UserEdit> {
	edit: UserEdit;

	dialogInit(reference: DialogOverlayRef, options: Partial<DialogOverlayDialogConfig<UserEdit>>): void {
		this.edit = options.data;
	}
}
