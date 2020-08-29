import {Component} from '@angular/core';
import {DialogOverlay, DialogOverlayDialogConfig, DialogOverlayRef} from '@app/modules/dialog-overlay';
import {AdminUserServiceEditData} from '@core/services';

@Component({
	selector: 'app-dialog-user',
	templateUrl: './dialog-user.component.html',
	styleUrls: ['./dialog-user.component.scss']
})
export class DialogUserComponent implements DialogOverlay<AdminUserServiceEditData> {
	edit?: AdminUserServiceEditData;

	dialogInit(reference: DialogOverlayRef, options: Partial<DialogOverlayDialogConfig<AdminUserServiceEditData>>): void {
		this.edit = options.data;
	}
}
