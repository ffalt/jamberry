import {Component} from '@angular/core';
import {LibraryService} from '@library/services';

@Component({
	selector: 'app-podcasts-page-latest',
	templateUrl: './podcasts-latest-episodes.component.html',
	styleUrls: ['./podcasts-latest-episodes.component.scss']
})
export class PodcastsLatestEpisodesComponent {
	constructor(public library: LibraryService) {
	}
}
