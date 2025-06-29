import {Component, Input, inject} from '@angular/core';
import {NavigService, PlayerService} from '@core/services';
import {Jam, JamService, PodcastStatus} from '@jam';
import {ActionsService, PodcastService} from '@shared/services';

@Component({
	selector: 'app-episode-state-button',
	templateUrl: './episode-state.button.component.html',
	styleUrls: ['./episode-state.button.component.scss'],
	standalone: false
})
export class EpisodeStateButtonComponent {
	@Input() episode?: Jam.Episode;
	@Input() showTitle: boolean = false;
	readonly jam = inject(JamService);
	readonly player = inject(PlayerService);
	readonly podcastService = inject(PodcastService);
	readonly actions = inject(ActionsService);
	readonly navig = inject(NavigService);
	readonly PodcastStatus = PodcastStatus;
}
