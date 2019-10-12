import {Component} from '@angular/core';
import {DialogOverlay, DialogOverlayDialogConfig, DialogOverlayRef} from '@app/modules/dialog-overlay';
import {RootScanStrategy} from '@jam';
import {RootEdit} from '../../admin.interface';

@Component({
	selector: 'app-dialog-root',
	templateUrl: 'dialog-root.component.html',
	styleUrls: ['dialog-root.component.scss']
})
export class DialogRootComponent implements DialogOverlay<RootEdit> {
	edit: RootEdit;
	RootScanStrategy = RootScanStrategy;

	dialogInit(reference: DialogOverlayRef, options: Partial<DialogOverlayDialogConfig<RootEdit>>): void {
		this.edit = options.data;
	}

}
