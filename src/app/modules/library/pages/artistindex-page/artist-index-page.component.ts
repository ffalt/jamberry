import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppService, NavigService, NotifyService} from '@core/services';
import {AlbumType, JamService} from '@jam';
import {scrollToIndexGroup} from '@library/components/index/index.component';
import {Index, IndexService} from '@shared/services';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
	selector: 'app-page-artist-index',
	templateUrl: './artist-index-page.component.html',
	styleUrls: ['./artist-index-page.component.scss']
})
export class ArtistIndexPageComponent implements OnInit, OnDestroy {
	index: Index;
	protected unsubscribe = new Subject();

	constructor(
		private jam: JamService,
		private notify: NotifyService,
		private indexService: IndexService,
		public app: AppService,
		public navig: NavigService
	) {
	}

	ngOnInit(): void {
		this.indexService.artistIndexNotify
			.pipe(takeUntil(this.unsubscribe)).subscribe(artistIndexCache => {
				if (artistIndexCache.query.albumType === AlbumType.album) {
					this.index = artistIndexCache.index;
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

	refresh(): void {
		this.index = this.indexService.requestArtistIndex({albumType: AlbumType.album});
	}

	scrollToGroup(index: number): void {
		scrollToIndexGroup(index);
	}

}
