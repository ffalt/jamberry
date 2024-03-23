import {Component, Input} from '@angular/core';
import {NavigService, PlayerService} from '@core/services';
import {Jam, JamService, PodcastStatus} from '@jam';
import {JamEpisodeObject} from '@library/model/objects';
import {LibraryService} from '@library/services';
import {ActionsService, PodcastService} from '@shared/services';

@Component({
	selector: 'app-episode-list',
	templateUrl: './episode-list.component.html',
	styleUrls: ['./episode-list.component.scss']
})
export class EpisodeListComponent {
	@Input() episodes?: Array<Jam.Episode>;
	@Input() showPodcast: boolean = false;

	constructor(
		public jam: JamService, public player: PlayerService, public podcastService: PodcastService,
		public actions: ActionsService, public navig: NavigService,
		private library: LibraryService
	) {
	}

	onContextMenu($event: Event, item: Jam.Episode): void {
		this.library.openJamObjectMenu(new JamEpisodeObject(item, this.library), $event);
	}

	tapEpisode(event: Event & { tapCount?: number }, episode: Jam.Episode): void {
		if (event.tapCount === 2) {
			this.play(episode);
		}
	}

	play(episode: Jam.Episode): void {
		if (episode.status === PodcastStatus.completed) {
			this.player.startEpisode(episode);
		} else if (episode.status !== PodcastStatus.downloading && this.jam.auth.user?.roles?.podcast) {
			this.podcastService.retrieveEpisode(episode);
		}
	}

}
