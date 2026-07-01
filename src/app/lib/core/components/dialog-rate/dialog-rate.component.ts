import { Component, signal } from '@angular/core';
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
	readonly data = signal<RateEdit | undefined>(undefined);

	dialogInit(reference: DialogOverlayRef, options: Partial<DialogOverlayDialogConfig<RateEdit>>): void {
		this.data.set(options.data);
	}

	onRated(num: number): void {
		const d = this.data();
		if (d) {
			this.data.set({ ...d, rating: num });
		}
	}
}
