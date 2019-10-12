import {Component, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {NotifyService} from '@core/services';
import {Jam, JamParameters, JamService} from '@jam';
import {LoadMoreButtonComponent} from '@shared/components/load-more-button/load-more-button.component';

@Component({
	selector: 'app-playlists-loader',
	templateUrl: 'playlists-loader.component.html',
	styleUrls: ['playlists-loader.component.scss']
})
export class PlaylistsLoaderComponent implements OnChanges {
	@Input() listType: JamParameters.ListType;
	@Input() loadAll: boolean = false;
	@Input() query: string;
	playlists: Array<Jam.Playlist>;
	@ViewChild(LoadMoreButtonComponent, {static: true}) loadMore: LoadMoreButtonComponent;
	private activeRequest: Promise<void>;

	constructor(private jam: JamService, private notify: NotifyService) {
	}

	getPlaylists(requestFunc: () => Promise<Jam.PlaylistList>): void {
		this.loadMore.loading = true;
		const request = requestFunc()
			.then(data => {
				if (this.activeRequest === request) {
					this.playlists = (this.playlists || []).concat(data.items);
					this.loadMore.hasMore = data.total > this.playlists.length;
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
		this.getPlaylists(() =>
			this.jam.playlist.search({
				offset: this.loadMore.offset,
				amount: this.loadMore.amount,
				playlistState: true
			}));
	}

	search(): void {
		this.getPlaylists(() =>
			this.jam.playlist.search({
				query: this.query,
				offset: this.loadMore.offset,
				amount: this.loadMore.amount,
				playlistState: true
			}));
	}

	list(): void {
		this.getPlaylists(() =>
			this.jam.playlist.list({
				list: this.listType,
				offset: this.loadMore.offset,
				amount: this.loadMore.amount,
				playlistState: true
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
			this.playlists = [];
		}
	}

	ngOnChanges(changes: SimpleChanges): void {
		this.loadMore.offset = 0;
		this.loadMore.total = 0;
		this.loadMore.hasMore = false;
		this.playlists = undefined;
		this.load();
	}
}
