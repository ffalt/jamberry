import {Component} from '@angular/core';
import {DialogOverlay, DialogOverlayDialogConfig, DialogOverlayRef} from '@app/modules/dialog-overlay';
import {UserEdit} from '../../admin.interface';

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
