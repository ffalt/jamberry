import {Component} from '@angular/core';
import {JamLists} from '@app/utils/jam-lists';
import {NavigService} from '@core/services';
import {JamService} from '@jam';
import {PodcastService} from '@shared/services';

@Component({
	selector: 'app-page-podcasts',
	templateUrl: 'podcasts-page.component.html',
	styleUrls: ['podcasts-page.component.scss']
})
export class PodcastsPageComponent {
	lists = JamLists.filter(l => l.id !== 'random');

	constructor(public jam: JamService, public podcastService: PodcastService, public navig: NavigService) {
	}

	refreshPodcastFeeds(): void {
		this.podcastService.checkPodcasts();
	}

}
