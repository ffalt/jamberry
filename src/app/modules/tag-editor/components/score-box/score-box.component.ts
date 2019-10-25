import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';

@Component({
	selector: 'app-score-box',
	templateUrl: './score-box.component.html',
	styleUrls: ['./score-box.component.scss']
})
export class ScoreBoxComponent implements OnChanges {
	@Input() score: number;
	color: string;

	getMatchColor(score: number): string {
		if (score > 0.7) {
			return 'green';
		}
		if (score > 0.3) {
			return 'yellow';
		}
		return 'red';
	}

	ngOnChanges(changes: SimpleChanges): void {
		this.color = this.getMatchColor(this.score);
	}

}
