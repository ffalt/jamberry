import {Component, Input, inject} from '@angular/core';
import {NavigService, PlayerService} from '@core/services';
import {Jam, JamService, PodcastStatus} from '@jam';
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
	@Input() episodes?: Array<Jam.Episode>;
	@Input() showPodcast: boolean = false;
	readonly jam = inject(JamService);
	readonly player = inject(PlayerService);
	readonly podcastService = inject(PodcastService);
	readonly actions = inject(ActionsService);
	readonly navig = inject(NavigService);
	private readonly library = inject(LibraryService);

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
