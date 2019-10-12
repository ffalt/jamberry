import {Component, HostBinding, Input, OnDestroy, OnInit} from '@angular/core';
import {NotifyService} from '@core/services';
import {Index, IndexGroup, IndexService} from '@library/services';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
	selector: 'app-sidebar-index',
	templateUrl: 'sidebar-index.component.html',
	styleUrls: ['sidebar-index.component.scss']
})
export class SidebarIndexComponent implements OnInit, OnDestroy {
	index: Index;
	@Input() useMeta: boolean = true;
	@HostBinding('class.active') collapsed: boolean = false;
	current: IndexGroup;
	protected unsubscribe = new Subject();

	constructor(public indexService: IndexService, public notify: NotifyService) {
	}

	ngOnInit(): void {
		this.indexService.folderIndexNotify
			.pipe(takeUntil(this.unsubscribe)).subscribe(folderIndexCache => {
				if (!this.useMeta) {
					this.index = folderIndexCache.index;
				}
			},
			e => {
				this.notify.error(e);
			}
		);
		this.indexService.artistIndexNotify
			.pipe(takeUntil(this.unsubscribe)).subscribe(
			artistIndexCache => {
				if (this.useMeta) {
					this.index = artistIndexCache.index;
				}
			},
			e => {
				this.notify.error(e);
			}
		);
		this.refreshIndex();
	}

	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}

	private refreshIndex(): void {
		this.index = this.useMeta ?
			this.indexService.requestArtistIndex() :
			this.indexService.requestFolderIndex();
	}
}
