import {Component} from '@angular/core';
import {JamLists} from '@app/utils/jam-lists';
import {HeaderTab} from '@shared/components';

@Component({
	selector: 'app-page-series',
	templateUrl: './series-page.component.html',
	styleUrls: ['./series-page.component.scss']
})
export class SeriesPageComponent {
	tabs: Array<HeaderTab> = [
		{label: 'Index', link: {route: '/library/series', options: {exact: true}}},
		...JamLists.map(list => (
			{label: list.text, link: {route: `/library/series/${list.link}`, options: {}}}
		))
	];
}
