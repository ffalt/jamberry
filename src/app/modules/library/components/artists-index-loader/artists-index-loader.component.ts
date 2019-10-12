import {Component, OnDestroy, OnInit} from '@angular/core';
import {NotifyService} from '@core/services';
import {Index, IndexService} from '@library/services';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
	selector: 'app-artists-index-loader',
	templateUrl: 'artists-index-loader.component.html',
	styleUrls: ['artists-index-loader.component.scss']
})
export class ArtistsIndexLoaderComponent implements OnInit, OnDestroy {
	index: Index;
	protected unsubscribe = new Subject();

	constructor(protected indexService: IndexService, protected notify: NotifyService) {
	}

	ngOnInit(): void {
		this.indexService.artistIndexNotify
			.pipe(takeUntil(this.unsubscribe)).subscribe(
			artistIndexCache => {
				this.index = artistIndexCache.index;
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
		this.index = this.indexService.requestArtistIndex();
	}

	refresh(): void {
		this.index = undefined;
		this.load();
	}

}
