import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import type { DialogOverlay, DialogOverlayDialogConfig, DialogOverlayRef } from '@modules/dialog-overlay';
import type { AdminUserServiceEditData } from '@core/services/admin-user/admin-user.service';

@Component({
	selector: 'app-dialog-user',
	templateUrl: './dialog-user.component.html',
	styleUrls: ['./dialog-user.component.scss'],
	imports: [FormsModule]
})
export class DialogUserComponent implements DialogOverlay<AdminUserServiceEditData> {
	edit?: AdminUserServiceEditData;

	dialogInit(reference: DialogOverlayRef, options: Partial<DialogOverlayDialogConfig<AdminUserServiceEditData>>): void {
		this.edit = options.data;
	}
}
