import {Component, inject, input} from '@angular/core';
import {PlayerService} from '@core/services';
import {Jam, JamService, PodcastStatus} from '@jam';
import {PodcastService} from '@shared/services';

@Component({
	selector: 'app-episode-state-button',
	templateUrl: './episode-state.button.component.html',
	styleUrls: ['./episode-state.button.component.scss'],
	standalone: false
})
export class EpisodeStateButtonComponent {
	readonly episode = input<Jam.Episode>();
	readonly showTitle = input<boolean>(false);
	readonly PodcastStatus = PodcastStatus;
	readonly player = inject(PlayerService);
	readonly podcastService = inject(PodcastService);
	readonly jam = inject(JamService);
}
