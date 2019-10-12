import {Component, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {NotifyService} from '@core/services';
import {Jam, JamService} from '@jam';
import {LoadMoreButtonComponent} from '@shared/components';

@Component({
	selector: 'app-episodes-loader',
	templateUrl: 'episodes-loader.component.html',
	styleUrls: ['episodes-loader.component.scss']
})
export class EpisodesLoaderComponent implements OnChanges {
	episodes: Array<Jam.PodcastEpisode>;
	@ViewChild(LoadMoreButtonComponent, {static: true}) loadMore: LoadMoreButtonComponent;
	@Input() query: string;
	@Input() loadLatest: boolean = false;
	private activeRequest: Promise<void>;

	constructor(private jam: JamService, private notify: NotifyService) {
	}

	getPodcastEpisodes(requestFunc: () => Promise<Jam.PodcastEpisodeList>): void {
		this.loadMore.loading = true;
		const request = requestFunc()
			.then(data => {
				if (this.activeRequest === request) {
					this.episodes = (this.episodes || []).concat(data.items);
					this.loadMore.hasMore = data.total > this.episodes.length;
					this.loadMore.total = data.total;
					this.loadMore.loading = false;
				}
			})
			.catch(err => {
				if (this.activeRequest === request) {
					this.loadMore.loading = false;
				}
				this.notify.error(err);
			});
		this.activeRequest = request;
	}

	latest(): void {
		this.getPodcastEpisodes(() =>
			this.jam.episode.search({
				offset: this.loadMore.offset,
				amount: this.loadMore.amount,
				sortField: 'date', sortDescending: true, trackState: true, trackTag: true
			}));
	}

	search(): void {
		this.getPodcastEpisodes(() =>
			this.jam.episode.search({
				query: this.query,
				offset: this.loadMore.offset,
				amount: this.loadMore.amount,
				sortField: 'date', sortDescending: true, trackState: true, trackTag: true
			}));
	}

	load(): void {
		if (this.query) {
			this.search();
		} else if (this.loadLatest) {
			this.latest();
		} else {
			this.episodes = [];
		}
	}

	ngOnChanges(changes: SimpleChanges): void {
		this.loadMore.offset = 0;
		this.loadMore.total = 0;
		this.loadMore.hasMore = false;
		this.episodes = undefined;
		this.load();
	}
}
