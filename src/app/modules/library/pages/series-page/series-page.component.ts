import {Component} from '@angular/core';
import {JamLists} from '@app/utils/jam-lists';

@Component({
	selector: 'app-page-series',
	templateUrl: './series-page.component.html',
	styleUrls: ['./series-page.component.scss']
})
export class SeriesPageComponent {
	JamLists = JamLists;
}
