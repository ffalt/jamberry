import {Component, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {NotifyService} from '@core/services';
import {AlbumType, Jam, JamParameters, JamService} from '@jam';
import {LoadMoreButtonComponent} from '@shared/components/load-more-button/load-more-button.component';

@Component({
	selector: 'app-series-loader',
	templateUrl: './series-loader.component.html',
	styleUrls: ['./series-loader.component.scss']
})
export class SeriesLoaderComponent implements OnChanges {
	series: Array<Jam.Series>;
	@Input() listType: JamParameters.ListType;
	@Input() query: string;
	@ViewChild(LoadMoreButtonComponent, {static: true}) loadMore: LoadMoreButtonComponent;
	private activeRequest: Promise<void>;

	constructor(protected jam: JamService, protected notify: NotifyService) {
	}

	getSeries(requestFunc: () => Promise<Jam.SeriesList>): void {
		this.loadMore.loading = true;
		const request = requestFunc()
			.then(data => {
				if (this.activeRequest === request) {
					this.series = (this.series || []).concat(data.items);
					this.loadMore.hasMore = data.total > this.series.length;
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

	search(): void {
		this.getSeries(() =>
			this.jam.series.search({
				query: this.query,
				albumTypes: [AlbumType.audiobook, AlbumType.series],
				offset: this.loadMore.offset,
				amount: this.loadMore.amount,
				seriesState: true
			}));
	}

	list(): void {
		this.getSeries(() =>
			this.jam.series.list({
				albumTypes: [AlbumType.audiobook, AlbumType.series],
				list: this.listType,
				seriesState: true,
				offset: this.loadMore.offset,
				amount: this.loadMore.amount
			}));
	}

	load(): void {
		if (this.query) {
			this.search();
		} else if (this.listType) {
			this.list();
		} else {
			this.series = [];
		}
	}

	ngOnChanges(changes: SimpleChanges): void {
		this.loadMore.offset = 0;
		this.loadMore.total = 0;
		this.loadMore.hasMore = false;
		this.series = undefined;
		this.load();
	}

}
