import {Component, Input} from '@angular/core';
import {NavigService, PlayerService} from '@core/services';
import {Jam, JamService, PodcastStatus} from '@jam';
import {PodcastService} from '@library/services';
import {ActionsService} from '@shared/services';

@Component({
	selector: 'app-episodes',
	templateUrl: 'episodes.component.html',
	styleUrls: ['episodes.component.scss']
})
export class EpisodesComponent {
	@Input() episodes: Array<Jam.PodcastEpisode>;
	@Input() showPodcast: boolean = false;

	constructor(
		public jam: JamService, public player: PlayerService, public podcastService: PodcastService,
		public actions: ActionsService, public navig: NavigService
	) {
	}

	tapEpisode(event, episode: Jam.PodcastEpisode): void {
		if (event.tapCount === 2) {
			this.play(episode);
		}
	}

	play(episode: Jam.PodcastEpisode): void {
		if (episode.status === PodcastStatus.completed) {
			this.player.startEpisode(episode);
		} else if (episode.status !== PodcastStatus.downloading && this.jam.auth.userRolePodcast()) {
			this.podcastService.retrieveEpisode(episode);
		}
	}

}
