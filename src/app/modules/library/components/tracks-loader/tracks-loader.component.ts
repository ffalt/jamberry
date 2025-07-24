import {Component, type OnChanges, inject, viewChild, input} from '@angular/core';
import {NotifyService} from '@core/services';
import {type Jam, type JamParameters, JamService, type ListType} from '@jam';
import {LoadMoreButtonComponent} from '@shared/components';

@Component({
	selector: 'app-tracks-loader',
	templateUrl: './tracks-loader.component.html',
	styleUrls: ['./tracks-loader.component.scss'],
	standalone: false
})
export class TracksLoaderComponent implements OnChanges {
	showRating: boolean = false;
	showPlayCount: boolean = false;
	showPlayDate: boolean = false;
	tracks?: Array<Jam.Track>;
	readonly listType = input<ListType>();
	readonly query = input<string>();
	readonly queryCmd = input<JamParameters.TrackFilterArgs>();
	readonly loadMore = viewChild.required(LoadMoreButtonComponent);
	private readonly jam = inject(JamService);
	private readonly notify = inject(NotifyService);
	private activeRequest?: Promise<void>;

	getTracks(requestFunc: () => Promise<Jam.TrackPage>): void {
		const loadMore = this.loadMore();
		loadMore.loading.set(true);
		const request = requestFunc()
			.then(data => {
				if (this.activeRequest === request) {
					this.tracks = [...(this.tracks || []), ...data.items];
					loadMore.hasMore.set((data.total || 0) > this.tracks.length);
					loadMore.total.set(data.total);
					loadMore.loading.set(false);
				}
			})
			.catch(error => {
				if (this.activeRequest === request) {
					this.loadMore().loading.set(false);
				}
				this.notify.error(error);
			});
		this.activeRequest = request;
	}

	searchText(): void {
		this.getTracks(async () =>
			this.jam.track.search({
				query: this.query(),
				skip: this.loadMore().skip(),
				take: this.loadMore().take(),
				trackIncTag: true,
				trackIncState: true
			})
		);
	}

	searchCmd(): void {
		this.getTracks(async () =>
			this.jam.track.search({
				...this.queryCmd(),
				skip: this.loadMore().skip(),
				take: this.loadMore().take(),
				trackIncTag: true,
				trackIncState: true
			})
		);
	}

	list(): void {
		this.getTracks(async () =>
			this.jam.track.search({
				list: this.listType(),
				trackIncState: true,
				trackIncTag: true,
				skip: this.loadMore().skip(),
				take: this.loadMore().take()
			}));
	}

	load(): void {
		if (this.query()) {
			this.searchText();
		} else if (this.queryCmd()) {
			this.searchCmd();
		} else if (this.listType()) {
			this.list();
		} else {
			this.tracks = [];
		}
	}

	ngOnChanges(): void {
		const loadMore = this.loadMore();
		loadMore.skip.set(0);
		loadMore.total.set(0);
		loadMore.hasMore.set(false);
		this.showRating = this.listType() === 'highest';
		this.showPlayCount = this.listType() === 'frequent';
		this.showPlayDate = this.listType() === 'recent';
		this.tracks = undefined;
		this.load();
	}
}
