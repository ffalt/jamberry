import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NotifyService} from '@core/services';
import {Index, IndexService} from '@shared/services';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
	selector: 'app-folders-index-loader',
	templateUrl: './folders-index-loader.component.html',
	styleUrls: ['./folders-index-loader.component.scss']
})
export class FoldersIndexLoaderComponent implements OnInit, OnDestroy {
	index: Index;
	protected unsubscribe = new Subject();

	constructor(protected indexService: IndexService, protected notify: NotifyService, protected route: ActivatedRoute) {
	}

	ngOnInit(): void {
		this.indexService.folderIndexNotify
			.pipe(takeUntil(this.unsubscribe)).subscribe(
			indexCache => {
				this.index = indexCache.index;
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
		this.index = this.indexService.requestFolderIndex();
	}

	refresh(): void {
		this.index = undefined;
		this.load();
	}

}
