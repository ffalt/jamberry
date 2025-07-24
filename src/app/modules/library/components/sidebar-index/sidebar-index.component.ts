import {Component, type OnDestroy, type OnInit, inject, input} from '@angular/core';
import {NotifyService} from '@core/services';
import {AlbumType, JamObjectType} from '@jam';
import {type Index, type IndexGroup, IndexService} from '@shared/services';
import {Subject, takeUntil} from 'rxjs';

@Component({
	selector: 'app-sidebar-index',
	templateUrl: './sidebar-index.component.html',
	styleUrls: ['./sidebar-index.component.scss'],
	standalone: false,
	host: {
		'[class.active]': 'collapsed'
	}
})
export class SidebarIndexComponent implements OnInit, OnDestroy {
	current?: IndexGroup;
	index?: Index;
	collapsed: boolean = false;
	readonly useMeta = input<boolean>(true);
	private readonly notify = inject(NotifyService);
	private readonly indexService = inject(IndexService);
	private readonly unsubscribe = new Subject<void>();

	ngOnInit(): void {
		this.indexService.indexNotify
			.pipe(takeUntil(this.unsubscribe))
			.subscribe({
				next: indexCache => {
					if (this.useMeta()) {
						if (indexCache.matches(JamObjectType.artist, {albumType: AlbumType.album})) {
							this.index = indexCache.index;
						}
					} else if (indexCache.matches(JamObjectType.folder, {level: 1})) {
						this.index = indexCache.index;
					}
				},
				error: error => this.notify.error(error)
			});
		this.refreshIndex();
	}

	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}

	private refreshIndex(): void {
		this.index = this.useMeta() ?
			this.indexService.requestIndex(JamObjectType.artist, {albumType: AlbumType.album}) :
			this.indexService.requestIndex(JamObjectType.folder, {level: 1});
	}
}
