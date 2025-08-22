import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

export type StatsList = Array<{ text: string; link: string; value: number }>;

export function filterStats(data: Array<{ text?: string; link?: string; value?: number }>, allowZero?: boolean): StatsList {
	return data.filter(t => t.value !== undefined && (allowZero ?? t.value > 0) && t.text) as StatsList;
}

@Component({
	selector: 'app-stats',
	templateUrl: './stats.component.html',
	styleUrls: ['./stats.component.scss'],
	imports: [RouterLink]
})
export class StatsComponent {
	readonly stats = input<StatsList>([]);
}
