import {Component, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {JamAlbumTypes} from '@app/utils/jam-lists';
import {NotifyService} from '@core/services';
import {AlbumType, Jam, JamParameters, JamService, MUSICBRAINZ_VARIOUS_ARTISTS_ID} from '@jam';
import {LoadMoreButtonComponent} from '@shared/components';

@Component({
	selector: 'app-albums-loader',
	templateUrl: './albums-loader.component.html',
	styleUrls: ['./albums-loader.component.scss']
})
export class AlbumsLoaderComponent implements OnChanges {
	albums: Array<Jam.Album>;
	typeName: string;
	@Input() albumType: AlbumType;
	@Input() listType: JamParameters.ListType;
	@Input() grouping: boolean = true;
	@Input() query: string;
	@ViewChild(LoadMoreButtonComponent, {static: true}) loadMore: LoadMoreButtonComponent;
	private activeRequest: Promise<void>;

	constructor(protected jam: JamService, protected notify: NotifyService) {
	}

	getAlbums(requestFunc: () => Promise<Jam.AlbumList>): void {
		this.loadMore.loading = true;
		const request = requestFunc()
			.then(data => {
				if (this.activeRequest === request) {
					this.albums = (this.albums || []).concat(data.items);
					this.loadMore.hasMore = data.total > this.albums.length;
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
		this.getAlbums(() =>
			this.jam.album.search({
				query: this.query,
				offset: this.loadMore.offset,
				amount: this.loadMore.amount,
				albumState: true
			}));
	}

	list(): void {
		const artistID = this.albumType === AlbumType.compilation ? MUSICBRAINZ_VARIOUS_ARTISTS_ID : undefined;
		this.getAlbums(() =>
			this.jam.album.list({
				list: this.listType,
				albumState: true,
				offset: this.loadMore.offset,
				amount: this.loadMore.amount,
				albumType: this.albumType,
				mbArtistID: artistID
			}));
	}

	load(): void {
		if (this.query) {
			this.search();
		} else if (this.albumType && this.listType) {
			this.list();
		} else {
			this.albums = [];
		}
	}

	ngOnChanges(changes: SimpleChanges): void {
		this.loadMore.offset = 0;
		this.loadMore.total = 0;
		this.loadMore.hasMore = false;
		this.albums = undefined;
		const type = JamAlbumTypes.find(t => t.id === this.albumType);
		if (type) {
			this.typeName = type.text;
		}
		this.load();
	}

}
