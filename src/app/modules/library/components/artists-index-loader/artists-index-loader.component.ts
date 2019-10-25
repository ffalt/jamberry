import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NotifyService} from '@core/services';
import {AlbumType} from '@jam';
import {Index, IndexService} from '@shared/services';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
	selector: 'app-artists-index-loader',
	templateUrl: './artists-index-loader.component.html',
	styleUrls: ['./artists-index-loader.component.scss']
})
export class ArtistsIndexLoaderComponent implements OnInit, OnDestroy {
	index: Index;
	albumType: AlbumType = AlbumType.album;
	protected unsubscribe = new Subject();

	constructor(protected indexService: IndexService, protected notify: NotifyService, protected route: ActivatedRoute) {
	}

	ngOnInit(): void {
		this.route.parent.url
			.pipe(takeUntil(this.unsubscribe)).subscribe(val => {
			const type = val.length > 0 ? val[0].path : undefined;
			this.albumType = type === 'artists' ? AlbumType.album : AlbumType.series;
			this.refresh();
		});
		this.indexService.artistIndexNotify
			.pipe(takeUntil(this.unsubscribe)).subscribe(
			artistIndexCache => {
				if (artistIndexCache.query.albumType === this.albumType) {
					this.index = artistIndexCache.index;
				}
			},
			e => {
				this.notify.error(e);
			}
		);
	}

	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}

	load(): void {
		this.index = this.indexService.requestArtistIndex({albumType: this.albumType});
	}

	refresh(): void {
		this.index = undefined;
		this.load();
	}

}
