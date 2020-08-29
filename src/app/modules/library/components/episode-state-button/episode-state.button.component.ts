import {Component, Input} from '@angular/core';
import {NavigService, PlayerService} from '@core/services';
import {Jam, JamService, PodcastStatus} from '@jam';
import {ActionsService, PodcastService} from '@shared/services';

@Component({
	selector: 'app-episode-state-button',
	templateUrl: './episode-state.button.component.html',
	styleUrls: ['./episode-state.button.component.scss']
})
export class EpisodeStateButtonComponent {
	@Input() episode?: Jam.Episode;
	@Input() showTitle: boolean = false;
	PodcastStatus = PodcastStatus;

	constructor(
		public jam: JamService, public player: PlayerService, public podcastService: PodcastService,
		public actions: ActionsService, public navig: NavigService
	) {
	}

}
