import {Component, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {NotifyService} from '@core/services';
import {Jam, JamParameters, JamService} from '@jam';
import {LoadMoreButtonComponent} from '@shared/components';

@Component({
	selector: 'app-podcasts-loader',
	templateUrl: './podcasts-loader.component.html',
	styleUrls: ['./podcasts-loader.component.scss']
})
export class PodcastsLoaderComponent implements OnChanges {
	@Input() listType: JamParameters.ListType;
	@Input() query: string;
	@Input() loadAll: boolean = false;
	podcasts: Array<Jam.Podcast>;
	@ViewChild(LoadMoreButtonComponent, {static: true}) loadMore: LoadMoreButtonComponent;
	private activeRequest: Promise<void>;

	constructor(private jam: JamService, private notify: NotifyService) {
	}

	getPodcasts(requestFunc: () => Promise<Jam.PodcastList>): void {
		this.loadMore.loading = true;
		const request = requestFunc().then(data => {
			if (this.activeRequest === request) {
				this.podcasts = (this.podcasts || []).concat(data.items);
				this.loadMore.hasMore = data.total > this.podcasts.length;
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

	all(): void {
		this.getPodcasts(() =>
			this.jam.podcast.search({
				offset: this.loadMore.offset,
				amount: this.loadMore.amount,
				podcastState: true
			}));
	}

	list(): void {
		this.getPodcasts(() =>
			this.jam.podcast.list({
				list: this.listType,
				offset: this.loadMore.offset,
				amount: this.loadMore.amount,
				podcastState: true
			}));
	}

	search(): void {
		this.getPodcasts(() =>
			this.jam.podcast.search({
				query: this.query,
				offset: this.loadMore.offset,
				amount: this.loadMore.amount,
				podcastState: true
			}));
	}

	load(): void {
		if (this.query) {
			this.search();
		} else if (this.listType) {
			this.list();
		} else if (this.loadAll) {
			this.all();
		} else {
			this.podcasts = [];
		}
	}

	ngOnChanges(changes: SimpleChanges): void {
		this.loadMore.offset = 0;
		this.loadMore.total = 0;
		this.loadMore.hasMore = false;
		this.podcasts = undefined;
		this.load();
	}
}
