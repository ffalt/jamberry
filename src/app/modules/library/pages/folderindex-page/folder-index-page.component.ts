import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppService, NavigService, NotifyService} from '@core/services';
import {JamService} from '@jam';
import {scrollToIndexGroup} from '@library/components';
import {Index, IndexService} from '@library/services';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
	selector: 'app-page-folder-index',
	templateUrl: 'folder-index-page.component.html',
	styleUrls: ['folder-index-page.component.scss']
})
export class FolderIndexPageComponent implements OnInit, OnDestroy {
	index: Index;
	protected unsubscribe = new Subject();

	constructor(
		private jam: JamService,
		private notify: NotifyService,
		public app: AppService,
		public navig: NavigService,
		public indexService: IndexService
	) {
	}

	ngOnInit(): void {
		this.indexService.folderIndexNotify
			.pipe(takeUntil(this.unsubscribe)).subscribe(
			folderIndexCache => {
				this.index = folderIndexCache.index;
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
		this.index = this.indexService.requestFolderIndex();
	}

	scrollToGroup(index: number): void {
		scrollToIndexGroup(index);
	}

}
