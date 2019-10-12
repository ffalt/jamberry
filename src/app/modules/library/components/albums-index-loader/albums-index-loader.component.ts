import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {NotifyService} from '@core/services';
import {AlbumType, JamParameters, MUSICBRAINZ_VARIOUS_ARTISTS_ID} from '@jam';
import {Index, IndexService} from '@library/services';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
	selector: 'app-albums-index-loader',
	templateUrl: 'albums-index-loader.component.html',
	styleUrls: ['albums-index-loader.component.scss']
})
export class AlbumsIndexLoaderComponent implements OnInit, OnChanges, OnDestroy {
	index: Index;
	@Input() albumType: AlbumType;
	protected unsubscribe = new Subject();

	constructor(
		protected indexService: IndexService,
		protected notify: NotifyService
	) {
	}

	ngOnInit(): void {
		this.indexService.albumIndexNotify
			.pipe(takeUntil(this.unsubscribe)).subscribe(
			albumIndexCache => {
				if (albumIndexCache.query.albumType === this.albumType) {
					this.index = albumIndexCache.index;
				}
			},
			e => {
				this.notify.error(e);
			}
		);
		// this.refresh();
	}

	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}

	refresh(): void {
		this.index = undefined;
		this.load();
	}

	getAlbumQuery(): JamParameters.AlbumIndex {
		const artistID = this.albumType === AlbumType.compilation ? MUSICBRAINZ_VARIOUS_ARTISTS_ID : undefined;
		return {
			albumType: this.albumType,
			mbArtistID: artistID
		};
	}

	load(): void {
		if (this.albumType) {
			this.index = this.indexService.requestAlbumIndex(this.getAlbumQuery());
		}
	}

	ngOnChanges(changes: SimpleChanges): void {
		this.refresh();
	}
}
