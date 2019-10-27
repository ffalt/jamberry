import {Component} from '@angular/core';
import {JamLists} from '@app/utils/jam-lists';
import {HeaderTab} from '@shared/components';

@Component({
	selector: 'app-page-tracks',
	templateUrl: './tracks-page.component.html',
	styleUrls: ['./tracks-page.component.scss']
})
export class TracksPageComponent {
	tabs: Array<HeaderTab> =
		JamLists.map(list => ({label: list.text, link: {route: `/library/tracks/${list.link}`, options: {}}}));
}
