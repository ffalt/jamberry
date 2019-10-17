import {Component, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {NotifyService} from '@core/services';
import {Jam, JamParameters, JamService} from '@jam';
import {LoadMoreButtonComponent} from '@shared/components';

@Component({
	selector: 'app-tracks-loader',
	templateUrl: 'tracks-loader.component.html',
	styleUrls: ['tracks-loader.component.scss']
})
export class TracksLoaderComponent implements OnChanges {
	showRating: boolean = false;
	showPlayCount: boolean = false;
	showPlayDate: boolean = false;
	tracks: Array<Jam.Track>;
	@Input() listType: JamParameters.ListType;
	@Input() query: string;
	@Input() queryCmd: JamParameters.TrackSearch;
	@ViewChild(LoadMoreButtonComponent, {static: true}) loadMore: LoadMoreButtonComponent;
	private activeRequest: Promise<void>;

	constructor(private jam: JamService, private notify: NotifyService) {
	}

	getTracks(requestFunc: () => Promise<Jam.TrackList>): void {
		this.loadMore.loading = true;
		const request = requestFunc()
			.then(data => {
				if (this.activeRequest === request) {
					this.tracks = (this.tracks || []).concat(data.items);
					this.loadMore.hasMore = data.total > this.tracks.length;
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
		this.getTracks(() =>
			this.jam.track.search({
				query: this.query,
				offset: this.loadMore.offset,
				amount: this.loadMore.amount,
				trackTag: true,
				trackState: true
			})
		);
	}

	searchCmd(): void {
		this.getTracks(() =>
			this.jam.track.search({
				...this.queryCmd,
				offset: this.loadMore.offset,
				amount: this.loadMore.amount,
				trackTag: true,
				trackState: true
			})
		);
	}

	list(): void {
		this.getTracks(() =>
			this.jam.track.list({
				list: this.listType,
				trackState: true,
				trackTag: true,
				offset: this.loadMore.offset,
				amount: this.loadMore.amount
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
		this.loadMore.offset = 0;
		this.loadMore.total = 0;
		this.loadMore.hasMore = false;
		this.showRating = this.listType === 'highest';
		this.showPlayCount = this.listType === 'frequent';
		this.showPlayDate = this.listType === 'recent';
		this.tracks = undefined;
		this.load();
	}

}
