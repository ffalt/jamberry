import { Component, inject, input, type OnChanges, viewChild } from '@angular/core';
import { NotifyService } from '@core/services/notify/notify.service';
import { type Jam, type JamParameters, JamService, type ListType } from '@jam';
import { EpisodeListComponent } from '../episode-list/episode-list.component';
import { LoadMoreButtonComponent } from '@core/components/load-more-button/load-more-button.component';
import { LoadingComponent } from '@core/components/loading/loading.component';

@Component({
	selector: 'app-episodes-loader',
	templateUrl: './episodes-loader.component.html',
	styleUrls: ['./episodes-loader.component.scss'],
	imports: [EpisodeListComponent, LoadMoreButtonComponent, LoadingComponent]
})
export class EpisodesLoaderComponent implements OnChanges {
	readonly listType = input<ListType>();
	readonly latest = input<boolean>(false);
	readonly query = input<string>();
	readonly queryCmd = input<JamParameters.EpisodeFilterParameters>();
	episodes?: Array<Jam.Episode>;
	private readonly loadMore = viewChild.required(LoadMoreButtonComponent);
	private readonly jam = inject(JamService);
	private readonly notify = inject(NotifyService);
	private activeRequest?: Promise<void>;

	getEpisodes(requestFunc: () => Promise<Jam.EpisodePage>): void {
		const loadMore = this.loadMore();
		loadMore.loading.set(true);
		const request = requestFunc()
			.then(data => {
				if (this.activeRequest === request) {
					this.episodes = [...(this.episodes ?? []), ...data.items];
					loadMore.hasMore.set((data.total ?? 0) > this.episodes.length);
					loadMore.total.set(data.total);
					loadMore.loading.set(false);
				}
			})
			.catch((error: unknown) => {
				if (this.activeRequest === request) {
					this.loadMore().loading.set(false);
				}
				this.notify.error(error);
			});
		this.activeRequest = request;
	}

	searchText(): void {
		this.getEpisodes(async () =>
			this.jam.episode.search({
				query: this.query(),
				skip: this.loadMore().skip(),
				take: this.loadMore().take(),
				episodeIncTag: true,
				episodeIncState: true
			})
		);
	}

	searchCmd(): void {
		this.getEpisodes(async () =>
			this.jam.episode.search({
				...this.queryCmd(),
				skip: this.loadMore().skip(),
				take: this.loadMore().take(),
				episodeIncTag: true,
				episodeIncState: true
			})
		);
	}

	list(): void {
		this.getEpisodes(async () =>
			this.jam.episode.search({
				list: this.listType(),
				episodeIncState: true,
				episodeIncTag: true,
				skip: this.loadMore().skip(),
				take: this.loadMore().take()
			}));
	}

	searchLatest(): void {
		this.getEpisodes(async () =>
			this.jam.episode.search({
				episodeIncState: true,
				episodeIncTag: true,
				skip: this.loadMore().skip(),
				take: this.loadMore().take()
				// sortField: 'date', TODO: fix sort
				// sortDescending: true TODO: fix sort
			}));
	}

	load(): void {
		if (this.latest()) {
			this.searchLatest();
		} else if (this.query()) {
			this.searchText();
		} else if (this.queryCmd()) {
			this.searchCmd();
		} else if (this.listType()) {
			this.list();
		} else {
			this.episodes = [];
		}
	}

	ngOnChanges(): void {
		const loadMore = this.loadMore();
		loadMore.skip.set(0);
		loadMore.total.set(0);
		loadMore.hasMore.set(false);
		this.episodes = undefined;
		this.load();
	}
}
