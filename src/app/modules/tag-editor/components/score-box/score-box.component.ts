import {Component, OnChanges, input} from '@angular/core';

@Component({
	selector: 'app-score-box',
	templateUrl: './score-box.component.html',
	styleUrls: ['./score-box.component.scss'],
	standalone: false
})
export class ScoreBoxComponent implements OnChanges {
	readonly score = input<number>();
	color?: string;

	getMatchColor(score: number): string {
		if (score > 0.7) {
			return 'green';
		}
		if (score > 0.3) {
			return 'yellow';
		}
		return 'red';
	}

	ngOnChanges(): void {
		const score = this.score();
		this.color = (score === undefined) ? undefined : this.getMatchColor(score);
	}

}
