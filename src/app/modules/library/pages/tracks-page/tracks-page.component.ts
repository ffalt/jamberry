import {Component} from '@angular/core';
import {LibraryService} from '@library/services';
import {HeaderTab} from '@shared/components';

@Component({
	selector: 'app-page-tracks',
	templateUrl: './tracks-page.component.html',
	styleUrls: ['./tracks-page.component.scss']
})
export class TracksPageComponent {
	tabs: Array<HeaderTab>;

	constructor(private library: LibraryService) {
		this.tabs = this.library.buildTabs('tracks');
	}
}
