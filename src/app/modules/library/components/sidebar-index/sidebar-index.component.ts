import {Component, HostBinding, Input, OnDestroy, OnInit, inject} from '@angular/core';
import {NotifyService} from '@core/services';
import {AlbumType, JamObjectType} from '@jam';
import {Index, IndexGroup, IndexService} from '@shared/services';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
	selector: 'app-sidebar-index',
	templateUrl: './sidebar-index.component.html',
	styleUrls: ['./sidebar-index.component.scss'],
	standalone: false
})
export class SidebarIndexComponent implements OnInit, OnDestroy {
	current?: IndexGroup;
	index?: Index;
	@Input() useMeta: boolean = true;
	@HostBinding('class.active') collapsed: boolean = false;
	private readonly notify = inject(NotifyService);
	private readonly indexService = inject(IndexService);
	private readonly unsubscribe = new Subject<void>();

	ngOnInit(): void {
		this.indexService.indexNotify
			.pipe(takeUntil(this.unsubscribe)).subscribe(
			indexCache => {
				if (this.useMeta) {
					if (indexCache.matches(JamObjectType.artist, {albumType: AlbumType.album})) {
						this.index = indexCache.index;
					}
				} else {
					if (indexCache.matches(JamObjectType.folder, {level: 1})) {
						this.index = indexCache.index;
					}
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
			this.indexService.requestIndex(JamObjectType.artist, {albumType: AlbumType.album}) :
			this.indexService.requestIndex(JamObjectType.folder, {level: 1});
	}
}
