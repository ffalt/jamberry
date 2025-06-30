import {Component, Input, OnChanges, inject, viewChild} from '@angular/core';
import {NotifyService} from '@core/services';
import {Jam, JamParameters, JamService, ListType} from '@jam';
import {LoadMoreButtonComponent} from '@shared/components';

@Component({
	selector: 'app-episodes-loader',
	templateUrl: './episodes-loader.component.html',
	styleUrls: ['./episodes-loader.component.scss'],
	standalone: false
})
export class EpisodesLoaderComponent implements OnChanges {
	episodes?: Array<Jam.Episode>;
	@Input() listType?: ListType;
	@Input() latest: boolean = false;
	@Input() query?: string;
	@Input() queryCmd?: JamParameters.EpisodeFilterArgs;
	private readonly loadMore = viewChild.required(LoadMoreButtonComponent);
	private readonly jam = inject(JamService);
	private readonly notify = inject(NotifyService);
	private activeRequest?: Promise<void>;

	getEpisodes(requestFunc: () => Promise<Jam.EpisodePage>): void {
		const loadMore = this.loadMore();
		loadMore.loading = true;
		const request = requestFunc()
			.then(data => {
				if (this.activeRequest === request) {
					this.episodes = (this.episodes || []).concat(data.items);
					loadMore.hasMore = (data.total || 0) > this.episodes.length;
					loadMore.total = data.total;
					loadMore.loading = false;
				}
			})
			.catch(e => {
				if (this.activeRequest === request) {
					this.loadMore().loading = false;
				}
				this.notify.error(e);
			});
		this.activeRequest = request;
	}

	searchText(): void {
		this.getEpisodes(async () =>
			this.jam.episode.search({
				query: this.query,
				skip: this.loadMore().skip,
				take: this.loadMore().take,
				episodeIncTag: true,
				episodeIncState: true
			})
		);
	}

	searchCmd(): void {
		this.getEpisodes(async () =>
			this.jam.episode.search({
				...this.queryCmd,
				skip: this.loadMore().skip,
				take: this.loadMore().take,
				episodeIncTag: true,
				episodeIncState: true
			})
		);
	}

	list(): void {
		this.getEpisodes(async () =>
			this.jam.episode.search({
				list: this.listType,
				episodeIncState: true,
				episodeIncTag: true,
				skip: this.loadMore().skip,
				take: this.loadMore().take
			}));
	}

	searchLatest(): void {
		this.getEpisodes(async () =>
			this.jam.episode.search({
				episodeIncState: true,
				episodeIncTag: true,
				skip: this.loadMore().skip,
				take: this.loadMore().take
				// sortField: 'date', TODO: fix sort
				// sortDescending: true TODO: fix sort
			}));
	}

	load(): void {
		if (this.latest) {
			this.searchLatest();
		} else if (this.query) {
			this.searchText();
		} else if (this.queryCmd) {
			this.searchCmd();
		} else if (this.listType) {
			this.list();
		} else {
			this.episodes = [];
		}
	}

	ngOnChanges(): void {
		const loadMore = this.loadMore();
		loadMore.skip = 0;
		loadMore.total = 0;
		loadMore.hasMore = false;
		this.episodes = undefined;
		this.load();
	}

}
