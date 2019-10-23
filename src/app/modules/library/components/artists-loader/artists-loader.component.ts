import {Component, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {NotifyService} from '@core/services';
import {AlbumType, Jam, JamParameters, JamService} from '@jam';
import {LoadMoreButtonComponent} from '@shared/components/load-more-button/load-more-button.component';

@Component({
	selector: 'app-artists-loader',
	templateUrl: 'artists-loader.component.html',
	styleUrls: ['artists-loader.component.scss']
})
export class ArtistsLoaderComponent implements OnChanges {
	artists: Array<Jam.Artist>;
	@Input() albumType: AlbumType;
	@Input() listType: JamParameters.ListType;
	@Input() query: string;
	@ViewChild(LoadMoreButtonComponent, {static: true}) loadMore: LoadMoreButtonComponent;
	private activeRequest: Promise<void>;

	constructor(protected jam: JamService, protected notify: NotifyService) {
	}

	getArtists(requestFunc: () => Promise<Jam.ArtistList>): void {
		this.loadMore.loading = true;
		const request = requestFunc()
			.then(data => {
				if (this.activeRequest === request) {
					this.artists = (this.artists || []).concat(data.items);
					this.loadMore.hasMore = data.total > this.artists.length;
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
		this.getArtists(() =>
			this.jam.artist.search({
				query: this.query,
				albumType: this.albumType,
				offset: this.loadMore.offset,
				amount: this.loadMore.amount,
				artistState: true
			}));
	}

	list(): void {
		this.getArtists(() =>
			this.jam.artist.list({
				albumType: this.albumType,
				list: this.listType,
				artistState: true,
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
			this.artists = [];
		}
	}

	ngOnChanges(changes: SimpleChanges): void {
		this.loadMore.offset = 0;
		this.loadMore.total = 0;
		this.loadMore.hasMore = false;
		this.artists = undefined;
		this.load();
	}

}
