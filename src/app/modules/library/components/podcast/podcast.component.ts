import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {NavigService, NotifyService, PlayerService} from '@core/services';
import {Jam, JamService, PodcastStatus} from '@jam';
import {PodcastService} from '@library/services';
import {ActionsService} from '@shared/services';

@Component({
	selector: 'app-podcast',
	templateUrl: 'podcast.component.html',
	styleUrls: ['podcast.component.scss']
})
export class PodcastComponent implements OnChanges {
	@Input() podcast: Jam.Podcast;
	@Input() showPodcast: boolean = false;
	episodes: Array<Jam.PodcastEpisode>;
	episodesExpanded: boolean = false;
	PodcastStatus = PodcastStatus;

	constructor(
		public podcastService: PodcastService,
		public navig: NavigService,
		public player: PlayerService,
		public actions: ActionsService,
		public jam: JamService, protected notify: NotifyService
	) {
	}

	ngOnChanges(changes: SimpleChanges): void {
		this.episodes = undefined;
		this.episodesExpanded = false;
	}

	togglePodcastEpisodes(): void {
		this.episodesExpanded = !this.episodesExpanded;
		if (!this.episodes) {
			const podcastID = this.podcast.id;
			this.jam.episode.search({podcastID, trackTag: true, trackState: true, amount: 10})
				.then(data => {
					if (this.podcast && this.podcast.id === podcastID) {
						this.episodes = data.items;
					}
				})
				.catch(e => {
					this.notify.error(e);
				});
		}
	}
}
