import {Component, inject, input} from '@angular/core';
import {NavigService, PlayerService} from '@core/services';
import {type Jam, JamService, PodcastStatus} from '@jam';
import {JamEpisodeObject} from '@library/model/objects';
import {LibraryService} from '@library/services';
import {ActionsService, PodcastService} from '@shared/services';

@Component({
	selector: 'app-episode-list',
	templateUrl: './episode-list.component.html',
	styleUrls: ['./episode-list.component.scss'],
	standalone: false
})
export class EpisodeListComponent {
	readonly episodes = input<Array<Jam.Episode>>();
	readonly showPodcast = input<boolean>(false);
	readonly navig = inject(NavigService);
	readonly actions = inject(ActionsService);
	private readonly jam = inject(JamService);
	private readonly player = inject(PlayerService);
	private readonly podcastService = inject(PodcastService);
	private readonly library = inject(LibraryService);

	onContextMenu($event: Event, item: Jam.Episode): void {
		this.library.openJamObjectMenu(new JamEpisodeObject(item, this.library), $event);
	}

	play(episode: Jam.Episode): void {
		if (episode.status === PodcastStatus.completed) {
			this.player.startEpisode(episode);
		} else if (episode.status !== PodcastStatus.downloading && this.jam.auth.user?.roles?.podcast) {
			this.podcastService.retrieveEpisode(episode);
		}
	}
}
