import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {ContextMenuService} from '@app/modules/context-menu';
import {NavigService, NotifyService, PlayerService} from '@core/services';
import {Jam, JamService, PodcastStatus} from '@jam';
import {ActionsService} from '@shared/services';
import {ContextMenuPodcastComponent} from '../context-menu-podcast/context-menu-podcast.component';

@Component({
	selector: 'app-podcast',
	templateUrl: './podcast.component.html',
	styleUrls: ['./podcast.component.scss']
})
export class PodcastComponent implements OnChanges {
	@Input() podcast: Jam.Podcast;
	@Input() showPodcast: boolean = false;
	episodes: Array<Jam.PodcastEpisode>;
	episodesExpanded: boolean = false;
	PodcastStatus = PodcastStatus;

	constructor(
		public navig: NavigService,
		public player: PlayerService,
		public actions: ActionsService,
		public jam: JamService, protected notify: NotifyService,
		private contextMenuService: ContextMenuService
	) {
	}

	onContextMenu($event: MouseEvent, item: Jam.Podcast): void {
		this.contextMenuService.open(ContextMenuPodcastComponent, item, $event);
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
