import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { type Jam, JamService, PodcastStatus } from '@jam';
import { JamEpisodeObject } from '../../model/objects';
import { EpisodeStateButtonComponent } from '../episode-state-button/episode-state.button.component';
import { DurationPipe } from '@core/pipes/duration.pipe';
import { ActionsService } from '@core/services/actions/actions.service';
import { PodcastService } from '@core/services/podcast/podcast.service';
import { LibraryService } from '../../services/library/library.service';
import { BackgroundTextListComponent } from '@core/components/background-text-list/background-text-list.component';
import { FavIconComponent } from '@core/components/fav-icon/fav-icon.component';
import { NavigService } from '@core/services/navig/navig.service';
import { PlayerService } from '@core/services/player/player.service';

@Component({
	selector: 'app-episode-list',
	templateUrl: './episode-list.component.html',
	styleUrls: ['./episode-list.component.scss'],
	imports: [CommonModule, EpisodeStateButtonComponent, DurationPipe, BackgroundTextListComponent, FavIconComponent]
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
		} else if (episode.status !== PodcastStatus.downloading && this.jam.auth.user?.roles.podcast) {
			this.podcastService.retrieveEpisode(episode);
		}
	}
}
