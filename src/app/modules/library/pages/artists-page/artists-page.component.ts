import {Component} from '@angular/core';
import {JamLists} from '@app/utils/jam-lists';
import {HeaderTab} from '@shared/components';

@Component({
	selector: 'app-page-artists',
	templateUrl: './artists-page.component.html',
	styleUrls: ['./artists-page.component.scss']
})
export class ArtistsPageComponent {
	tabs: Array<HeaderTab> = [
		{label: 'Index', link: {route: '/library/artists', options: {exact: true}}},
		...JamLists.map(list => (
			{label: list.text, link: {route: `/library/artists/${list.link}`, options: {}}}
		))
	];
}
