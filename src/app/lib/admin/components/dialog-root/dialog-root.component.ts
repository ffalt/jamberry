import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RootScanStrategy } from '@jam';
import type { DialogOverlay, DialogOverlayDialogConfig, DialogOverlayRef } from '@modules/dialog-overlay';
import type { AdminRootServiceEditData } from '@core/services/admin-root/admin-root.service';

@Component({
	selector: 'app-dialog-root',
	templateUrl: './dialog-root.component.html',
	styleUrls: ['./dialog-root.component.scss'],
	imports: [FormsModule]
})
export class DialogRootComponent implements DialogOverlay<AdminRootServiceEditData> {
	edit?: AdminRootServiceEditData;
	RootScanStrategy = RootScanStrategy;

	dialogInit(reference: DialogOverlayRef, options: Partial<DialogOverlayDialogConfig<AdminRootServiceEditData>>): void {
		this.edit = options.data;
	}
}
