import {Component} from '@angular/core';
import {DialogOverlay, DialogOverlayDialogConfig, DialogOverlayRef} from '@app/modules/dialog-overlay';

export interface RateEdit {
	rating?: number;
	id: string;
}

@Component({
	selector: 'app-dialog-rate',
	templateUrl: 'dialog-rate.component.html',
	styleUrls: ['dialog-rate.component.scss']
})
export class DialogRateComponent implements DialogOverlay<RateEdit> {
	data: RateEdit;

	dialogInit(reference: DialogOverlayRef, options: Partial<DialogOverlayDialogConfig<RateEdit>>): void {
		this.data = options.data;
	}

	onRated(num: number): void {
		this.data.rating = num;
	}

}
