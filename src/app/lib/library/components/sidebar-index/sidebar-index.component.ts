import { Component, DestroyRef, inject, input, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterModule } from '@angular/router';
import { NotifyService } from '@core/services/notify/notify.service';
import { AlbumType, JamObjectType } from '@jam';
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
export class SidebarIndexComponent {
	readonly useMeta = input<boolean>(true);
	readonly index = signal<Index | undefined>(undefined);
	current?: IndexGroup;
	collapsed: boolean = false;
	private readonly notify = inject(NotifyService);
	private readonly indexService = inject(IndexService);
	private readonly lifeRef = inject(DestroyRef);

	constructor() {
		this.indexService.indexNotify
			.pipe(takeUntilDestroyed(this.lifeRef))
			.subscribe({
				next: indexCache => {
					if (this.useMeta()) {
						if (indexCache.matches(JamObjectType.artist, { albumType: AlbumType.album })) {
							this.index.set(indexCache.index);
						}
					} else if (indexCache.matches(JamObjectType.folder, { level: 1 })) {
						this.index.set(indexCache.index);
					}
				},
				error: (error: unknown) => {
					this.notify.error(error);
				}
			});
		this.refreshIndex();
	}

	private refreshIndex(): void {
		this.index.set(this.useMeta() ?
			this.indexService.requestIndex(JamObjectType.artist, { albumTypes: [AlbumType.album] }) :
			this.indexService.requestIndex(JamObjectType.folder, { level: 1 }));
	}
}
