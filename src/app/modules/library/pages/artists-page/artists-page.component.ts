import {Component} from '@angular/core';
import {JamLists} from '@app/utils/jam-lists';

@Component({
	selector: 'app-page-artists',
	templateUrl: 'artists-page.component.html',
	styleUrls: ['artists-page.component.scss']
})
export class ArtistsPageComponent {
	JamLists = JamLists;
}
