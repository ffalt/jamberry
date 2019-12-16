import {Component} from '@angular/core';
import {LibraryService} from '@library/services';
import {HeaderTab} from '@shared/components';

@Component({
	selector: 'app-page-artists',
	templateUrl: './artists-page.component.html',
	styleUrls: ['./artists-page.component.scss']
})
export class ArtistsPageComponent {
	tabs: Array<HeaderTab>;

	constructor(private library: LibraryService) {
		this.tabs = library.buildTabs('artists');
	}
}
