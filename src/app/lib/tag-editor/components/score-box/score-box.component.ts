import { Component, input, type OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-score-box',
	templateUrl: './score-box.component.html',
	styleUrls: ['./score-box.component.scss'],
	imports: [CommonModule]
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
