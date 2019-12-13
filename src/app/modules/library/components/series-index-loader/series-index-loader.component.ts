import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NotifyService} from '@core/services';
import {AlbumType} from '@jam';
import {Index, IndexService} from '@shared/services';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
	selector: 'app-series-index-loader',
	templateUrl: './series-index-loader.component.html',
	styleUrls: ['./series-index-loader.component.scss']
})
export class SeriesIndexLoaderComponent implements OnInit, OnDestroy {
	index: Index;
	protected unsubscribe = new Subject();

	constructor(protected indexService: IndexService, protected notify: NotifyService, protected route: ActivatedRoute) {
	}

	ngOnInit(): void {
		this.indexService.seriesIndexNotify
			.pipe(takeUntil(this.unsubscribe)).subscribe(
			seriesIndexCache => {
				if (seriesIndexCache.query.albumType === AlbumType.audiobook) {
					this.index = seriesIndexCache.index;
				}
			},
			e => {
				this.notify.error(e);
			}
		);
		this.refresh();
	}

	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}

	load(): void {
		this.index = this.indexService.requestSeriesIndex({albumType: AlbumType.audiobook});
	}

	refresh(): void {
		this.index = undefined;
		this.load();
	}

}
