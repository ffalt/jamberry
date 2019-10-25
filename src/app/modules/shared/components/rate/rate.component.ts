import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
	selector: 'app-rate',
	templateUrl: './rate.component.html',
	styleUrls: ['./rate.component.scss']
})
export class RateComponent implements OnInit, OnChanges {
	@Input() rating: number = 0;
	@Output() readonly hasRated = new EventEmitter<number>();
	maxScore = 5;
	range: Array<string> = [];
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
		if (!this.allowHalf) {
			this.marked = (this.marked === index) ? index - 1 : index;
		} else {
			this.marked = (this.marked === index) ?
				index - 0.5 :
				(this.marked === index - 0.5 ? index - 1 : index);
		}
		this.rating = this.marked + 1;
		this.updateUI();
		this.hasRated.emit(this.rating);
	}

	markerClass(index: number): string {
		if (index <= this.marked) {
			return 'icon-star-full';
		}
		if (index < this.marked + 1) {
			return 'icon-star-half';
		}
		return 'icon-star-empty';
	}

	ngOnChanges(changes: SimpleChanges): void {
		this.marked = this.rating - 1;
		this.updateUI();
	}

}
