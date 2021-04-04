import {Component, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {NotifyService} from '@core/services';
import {Jam, JamParameters, JamService, ListType} from '@jam';
import {LoadMoreButtonComponent} from '@shared/components';

@Component({
	selector: 'app-tracks-loader',
	templateUrl: './tracks-loader.component.html',
	styleUrls: ['./tracks-loader.component.scss']
})
export class TracksLoaderComponent implements OnChanges {
	showRating: boolean = false;
	showPlayCount: boolean = false;
	showPlayDate: boolean = false;
	tracks?: Array<Jam.Track>;
	@Input() listType?: ListType;
	@Input() query?: string;
	@Input() queryCmd?: JamParameters.TrackFilterArgs;
	@ViewChild(LoadMoreButtonComponent, {static: true}) loadMore!: LoadMoreButtonComponent;
	private activeRequest?: Promise<void>;

	constructor(private jam: JamService, private notify: NotifyService) {
	}

	getTracks(requestFunc: () => Promise<Jam.TrackPage>): void {
		this.loadMore.loading = true;
		const request = requestFunc()
			.then(data => {
				if (this.activeRequest === request) {
					this.tracks = (this.tracks || []).concat(data.items);
					this.loadMore.hasMore = (data.total || 0) > this.tracks.length;
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
		this.getTracks(async () =>
			this.jam.track.search({
				query: this.query,
				skip: this.loadMore.skip,
				take: this.loadMore.take,
				trackIncTag: true,
				trackIncState: true
			})
		);
	}

	searchCmd(): void {
		this.getTracks(async () =>
			this.jam.track.search({
				...this.queryCmd,
				skip: this.loadMore.skip,
				take: this.loadMore.take,
				trackIncTag: true,
				trackIncState: true
			})
		);
	}

	list(): void {
		this.getTracks(async () =>
			this.jam.track.search({
				list: this.listType,
				trackIncState: true,
				trackIncTag: true,
				skip: this.loadMore.skip,
				take: this.loadMore.take
			}));
	}

	load(): void {
		if (this.query) {
			this.searchText();
		} else if (this.queryCmd) {
			this.searchCmd();
		} else if (this.listType) {
			this.list();
		} else {
			this.tracks = [];
		}
	}

	ngOnChanges(changes: SimpleChanges): void {
		this.loadMore.skip = 0;
		this.loadMore.total = 0;
		this.loadMore.hasMore = false;
		this.showRating = this.listType === 'highest';
		this.showPlayCount = this.listType === 'frequent';
		this.showPlayDate = this.listType === 'recent';
		this.tracks = undefined;
		this.load();
	}

}
