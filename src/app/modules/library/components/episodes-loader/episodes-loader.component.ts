import {Component, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {NotifyService} from '@core/services';
import {Jam, JamParameters, JamService, ListType} from '@jam';
import {LoadMoreButtonComponent} from '@shared/components';

@Component({
	selector: 'app-episodes-loader',
	templateUrl: './episodes-loader.component.html',
	styleUrls: ['./episodes-loader.component.scss']
})
export class EpisodesLoaderComponent implements OnChanges {
	episodes?: Array<Jam.Episode>;
	@Input() listType?: ListType;
	@Input() latest: boolean = false;
	@Input() query?: string;
	@Input() queryCmd?: JamParameters.EpisodeFilterArgs;
	@ViewChild(LoadMoreButtonComponent, {static: true}) loadMore!: LoadMoreButtonComponent;
	private activeRequest?: Promise<void>;

	constructor(private jam: JamService, private notify: NotifyService) {
	}

	getEpisodes(requestFunc: () => Promise<Jam.EpisodePage>): void {
		this.loadMore.loading = true;
		const request = requestFunc()
			.then(data => {
				if (this.activeRequest === request) {
					this.episodes = (this.episodes || []).concat(data.items);
					this.loadMore.hasMore = (data.total || 0) > this.episodes.length;
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
		this.getEpisodes(async () =>
			this.jam.episode.search({
				query: this.query,
				skip: this.loadMore.skip,
				take: this.loadMore.take,
				episodeIncTag: true,
				episodeIncState: true
			})
		);
	}

	searchCmd(): void {
		this.getEpisodes(async () =>
			this.jam.episode.search({
				...this.queryCmd,
				skip: this.loadMore.skip,
				take: this.loadMore.take,
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
				skip: this.loadMore.skip,
				take: this.loadMore.take
			}));
	}

	searchLatest(): void {
		this.getEpisodes(async () =>
			this.jam.episode.search({
				episodeIncState: true,
				episodeIncTag: true,
				skip: this.loadMore.skip,
				take: this.loadMore.take
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

	ngOnChanges(changes: SimpleChanges): void {
		this.loadMore.skip = 0;
		this.loadMore.total = 0;
		this.loadMore.hasMore = false;
		this.episodes = undefined;
		this.load();
	}

}
