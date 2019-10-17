import {Component, Input, ViewChild} from '@angular/core';
import {ContextMenuService} from '@app/modules/context-menu';
import {NavigService, PlayerService} from '@core/services';
import {Jam, JamService, PodcastStatus} from '@jam';
import {PodcastService} from '@shared/services';
import {ActionsService} from '@shared/services';
import {ContextMenuEpisodeComponent} from '../context-menu-episode/context-menu-episode.component';

@Component({
	selector: 'app-episodes',
	templateUrl: 'episodes.component.html',
	styleUrls: ['episodes.component.scss']
})
export class EpisodesComponent {
	@Input() episodes: Array<Jam.PodcastEpisode>;
	@Input() showPodcast: boolean = false;
	@ViewChild(ContextMenuEpisodeComponent, {static: true}) episodeMenu: ContextMenuEpisodeComponent;

	constructor(
		public jam: JamService, public player: PlayerService, public podcastService: PodcastService,
		public actions: ActionsService, public navig: NavigService,
		private contextMenuService: ContextMenuService
	) {
	}

	onContextMenu($event: MouseEvent, item: Jam.PodcastEpisode): void {
		this.contextMenuService.show.next({contextMenu: this.episodeMenu.contextMenu, event: $event, item});
		$event.preventDefault();
		$event.stopPropagation();
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
