import {Component} from '@angular/core';
import {LibraryService} from '@library/services';
import {HeaderTab} from '@shared/components';

@Component({
	selector: 'app-page-series',
	templateUrl: './series-page.component.html',
	styleUrls: ['./series-page.component.scss']
})
export class SeriesPageComponent {
	tabs: Array<HeaderTab>;

	constructor(private library: LibraryService) {
		this.tabs = this.library.buildTabs('series');
	}

}
