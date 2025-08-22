import { Component } from '@angular/core';
import type { DialogOverlay, DialogOverlayDialogConfig, DialogOverlayRef } from '@modules/dialog-overlay';
import { RateComponent } from '../rate/rate.component';

export interface RateEdit {
	rating?: number;
	id: string;
}

@Component({
	selector: 'app-dialog-rate',
	templateUrl: './dialog-rate.component.html',
	styleUrls: ['./dialog-rate.component.scss'],
	imports: [RateComponent]
})
export class DialogRateComponent implements DialogOverlay<RateEdit> {
	data?: RateEdit;

	dialogInit(reference: DialogOverlayRef, options: Partial<DialogOverlayDialogConfig<RateEdit>>): void {
		this.data = options.data;
	}

	onRated(num: number): void {
		if (this.data) {
			this.data.rating = num;
		}
	}
}
