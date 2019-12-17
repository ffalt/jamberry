import {Component, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {NotifyService} from '@core/services';
import {Jam, JamParameters, JamService} from '@jam';
import {LoadMoreButtonComponent} from '@shared/components';

@Component({
	selector: 'app-episodes-loader',
	templateUrl: './episodes-loader.component.html',
	styleUrls: ['./episodes-loader.component.scss']
})
export class EpisodesLoaderComponent implements OnChanges {
	episodes: Array<Jam.PodcastEpisode>;
	@Input() listType: JamParameters.ListType;
	@Input() latest: boolean;
	@Input() query: string;
	@Input() queryCmd: JamParameters.EpisodeSearch;
	@ViewChild(LoadMoreButtonComponent, {static: true}) loadMore: LoadMoreButtonComponent;
	private activeRequest: Promise<void>;

	constructor(private jam: JamService, private notify: NotifyService) {
	}

	getEpisodes(requestFunc: () => Promise<Jam.PodcastEpisodeList>): void {
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
			.catch(e => {
				if (this.activeRequest === request) {
					this.loadMore.loading = false;
				}
				this.notify.error(e);
			});
		this.activeRequest = request;
	}

	searchText(): void {
		this.getEpisodes(() =>
			this.jam.episode.search({
				query: this.query,
				offset: this.loadMore.offset,
				amount: this.loadMore.amount,
				trackTag: true,
				trackState: true
			})
		);
	}

	searchCmd(): void {
		this.getEpisodes(() =>
			this.jam.episode.search({
				...this.queryCmd,
				offset: this.loadMore.offset,
				amount: this.loadMore.amount,
				trackTag: true,
				trackState: true
			})
		);
	}

	list(): void {
		this.getEpisodes(() =>
			this.jam.episode.list({
				list: this.listType,
				trackState: true,
				trackTag: true,
				offset: this.loadMore.offset,
				amount: this.loadMore.amount
			}));
	}

	searchLatest(): void {
		this.getEpisodes(() =>
			this.jam.episode.search({
				trackState: true,
				trackTag: true,
				offset: this.loadMore.offset,
				amount: this.loadMore.amount,
				sortField: 'date',
				sortDescending: true
			}));
	}

	load(): void {
		if (this.latest) {
			this.searchLatest();
		} else	if (this.query) {
			this.searchText();
		} else if (this.queryCmd) {
			this.searchCmd();
		} else if (this.listType) {
			this.list();
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
