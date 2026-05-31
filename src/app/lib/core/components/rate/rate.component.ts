import { NgComponentOutlet } from '@angular/common';
import { Component, model, type OnChanges, type OnInit, output, type Type } from '@angular/core';
import { IconStarEmptyComponent } from '@core/components/icons/icon-star-empty.component';
import { IconStarFullComponent } from '@core/components/icons/icon-star-full.component';
import { IconStarHalfComponent } from '@core/components/icons/icon-star-half.component';

@Component({
	selector: 'app-rate',
	templateUrl: './rate.component.html',
	styleUrls: ['./rate.component.scss'],
	imports: [NgComponentOutlet]
})
export class RateComponent implements OnInit, OnChanges {
	readonly rating = model<number | undefined>(0);
	readonly hasRated = output<number>();
	maxScore = 5;
	range: Array<Type<unknown>> = [];
	marked = -1;
	allowHalf: boolean = false;

	ngOnInit(): void {
		this.updateUI();
	}

	updateUI(): void {
		this.range = [];
		for (let i = 0; i < this.maxScore; i++) {
			this.range.push(this.markerClass(i));
		}
	}

	mark(index: number): void {
		let newMarked = index;
		if (this.marked === index) {
			newMarked = index - (this.allowHalf ? 0.5 : 1);
		} else if (this.allowHalf && this.marked === index - 0.5) {
			newMarked = index - 1;
		}
		this.marked = newMarked;
		this.rating.set(this.marked + 1);
		this.updateUI();
		this.hasRated.emit(this.rating() ?? 0);
	}

	markerClass(index: number): Type<unknown> {
		if (index <= this.marked) {
			return IconStarFullComponent;
		}
		if (index < this.marked + 1) {
			return IconStarHalfComponent;
		}
		return IconStarEmptyComponent;
	}

	ngOnChanges(): void {
		this.marked = (this.rating() ?? 0) - 1;
		this.updateUI();
	}
}
