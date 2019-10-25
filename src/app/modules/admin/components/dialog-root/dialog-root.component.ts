import {Component} from '@angular/core';
import {DialogOverlay, DialogOverlayDialogConfig, DialogOverlayRef} from '@app/modules/dialog-overlay';
import {AdminRootServiceEditData} from '@core/services';
import {RootScanStrategy} from '@jam';

@Component({
	selector: 'app-dialog-root',
	templateUrl: './dialog-root.component.html',
	styleUrls: ['./dialog-root.component.scss']
})
export class DialogRootComponent implements DialogOverlay<AdminRootServiceEditData> {
	edit: AdminRootServiceEditData;
	RootScanStrategy = RootScanStrategy;

	dialogInit(reference: DialogOverlayRef, options: Partial<DialogOverlayDialogConfig<AdminRootServiceEditData>>): void {
		this.edit = options.data;
	}

}
