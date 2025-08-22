import { Component, inject, input } from '@angular/core';
import { type Jam, JamService, PodcastStatus } from '@jam';
import { PodcastService } from '@core/services/podcast/podcast.service';
import { PlayerService } from '@core/services/player/player.service';

@Component({
	selector: 'app-episode-state-button',
	templateUrl: './episode-state.button.component.html',
	styleUrls: ['./episode-state.button.component.scss']
})
export class EpisodeStateButtonComponent {
	readonly episode = input<Jam.Episode>();
	readonly showTitle = input<boolean>(false);
	readonly PodcastStatus = PodcastStatus;
	readonly player = inject(PlayerService);
	readonly podcastService = inject(PodcastService);
	readonly jam = inject(JamService);
}
