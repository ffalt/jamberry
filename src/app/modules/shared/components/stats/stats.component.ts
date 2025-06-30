import {Component, input} from '@angular/core';

export type StatsList = Array<{ text: string; link: string; value: number }>;

export function filterStats(data: Array<{ text?: string; link?: string; value?: number }>, allowZero?: boolean): StatsList {
	return data.filter(t => t.value !== undefined && (allowZero || t.value > 0) && t.text) as StatsList;
}

@Component({
	selector: 'app-stats',
	templateUrl: './stats.component.html',
	styleUrls: ['./stats.component.scss'],
	standalone: false
})
export class StatsComponent {
	readonly stats = input<StatsList>([]);
}
