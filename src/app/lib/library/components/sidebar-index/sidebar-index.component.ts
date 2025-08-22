import { Component, inject, input, type OnDestroy, type OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NotifyService } from '@core/services/notify/notify.service';
import { AlbumType, JamObjectType } from '@jam';
import { Subject, takeUntil } from 'rxjs';
import { type Index, type IndexGroup, IndexService } from '@core/services/index/index.service';
import { CoverartImageComponent } from '@core/components/coverart-image/coverart-image.component';

@Component({
	selector: 'app-sidebar-index',
	templateUrl: './sidebar-index.component.html',
	styleUrls: ['./sidebar-index.component.scss'],
	host: {
		'[class.active]': 'collapsed'
	},
	imports: [RouterModule, CoverartImageComponent]
})
export class SidebarIndexComponent implements OnInit, OnDestroy {
	readonly useMeta = input<boolean>(true);
	current?: IndexGroup;
	index?: Index;
	collapsed: boolean = false;
	private readonly notify = inject(NotifyService);
	private readonly indexService = inject(IndexService);
	private readonly unsubscribe = new Subject<void>();

	ngOnInit(): void {
		this.indexService.indexNotify
			.pipe(takeUntil(this.unsubscribe))
			.subscribe({
				next: indexCache => {
					if (this.useMeta()) {
						if (indexCache.matches(JamObjectType.artist, { albumType: AlbumType.album })) {
							this.index = indexCache.index;
						}
					} else if (indexCache.matches(JamObjectType.folder, { level: 1 })) {
						this.index = indexCache.index;
					}
				},
				error: error => {
					this.notify.error(error);
				}
			});
		this.refreshIndex();
	}

	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}

	private refreshIndex(): void {
		this.index = this.useMeta() ?
			this.indexService.requestIndex(JamObjectType.artist, { albumTypes: [AlbumType.album] }) :
			this.indexService.requestIndex(JamObjectType.folder, { level: 1 });
	}
}
