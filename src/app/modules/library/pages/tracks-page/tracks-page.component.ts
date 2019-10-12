import {Component} from '@angular/core';
import {JamLists} from '@app/utils/jam-lists';

@Component({
	selector: 'app-page-tracks',
	templateUrl: 'tracks-page.component.html',
	styleUrls: ['tracks-page.component.scss']
})
export class TracksPageComponent {
	JamLists = JamLists;
}
