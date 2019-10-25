import {Component, Input} from '@angular/core';
import {ContextMenuService} from '@app/modules/context-menu';
import {NavigService, PlayerService} from '@core/services';
import {Jam, JamService, PodcastStatus} from '@jam';
import {ActionsService, PodcastService} from '@shared/services';
import {ContextMenuEpisodeComponent, ContextMenuEpisodeComponentOpts} from '../context-menu-episode/context-menu-episode.component';

@Component({
	selector: 'app-episodes',
	templateUrl: './episodes.component.html',
	styleUrls: ['./episodes.component.scss']
})
export class EpisodesComponent {
	@Input() episodes: Array<Jam.PodcastEpisode>;
	@Input() showPodcast: boolean = false;

	constructor(
		public jam: JamService, public player: PlayerService, public podcastService: PodcastService,
		public actions: ActionsService, public navig: NavigService,
		private contextMenuService: ContextMenuService
	) {
	}

	onContextMenu($event: MouseEvent, item: Jam.PodcastEpisode): void {
		this.contextMenuService.open<ContextMenuEpisodeComponentOpts>(ContextMenuEpisodeComponent, item, $event, {showGoTo: true});
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
