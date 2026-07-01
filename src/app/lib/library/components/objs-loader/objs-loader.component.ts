import { Component, effect, inject, input, signal, viewChild } from '@angular/core';
import { NotifyService } from '@core/services/notify/notify.service';
import type { AlbumType, Jam, ListType } from '@jam';
import type { JamObjsLoader } from '../../model/loaders';
import type { JamLibraryObject } from '../../model/objects';
import { ObjGroupsViewComponent } from '../obj-groups-view/obj-groups-view.component';
import { LoadMoreButtonComponent } from '@core/components/load-more-button/load-more-button.component';
import { LoadingComponent } from '@core/components/loading/loading.component';

@Component({
	selector: 'app-obj-loader',
	templateUrl: './objs-loader.component.html',
	imports: [ObjGroupsViewComponent, LoadMoreButtonComponent, LoadingComponent]
})
export class ObjsLoaderComponent {
	readonly grouping = input<boolean>(false);
	readonly showParent = input<boolean>(false);
	readonly loader = input<JamObjsLoader>();
	readonly listQuery = input<{
		listType: ListType;
		albumType?: AlbumType;
	}>();

	readonly searchQuery = input<{
		query?: string;
		albumType?: AlbumType;
		genre?: string;
		genreID?: string;
	}>();

	readonly loadAll = input<boolean>(false);
	readonly changeTrigger = input<string>();
	readonly objs = signal<Array<JamLibraryObject> | undefined>(undefined);
	private readonly notify = inject(NotifyService);
	private readonly loadMore = viewChild.required(LoadMoreButtonComponent);
	private activeRequest?: Promise<void>;

	constructor() {
		effect(() => {
			this.changeTrigger();
			const loadMore = this.loadMore();
			loadMore.skip.set(0);
			loadMore.total.set(0);
			loadMore.hasMore.set(false);
			this.objs.set(undefined);
			this.load();
		});
	}

	getObjs(requestFunc: () => Promise<{ list: Jam.Page; items: Array<JamLibraryObject> }>): void {
		const loadMore = this.loadMore();
		loadMore.loading.set(true);
		const request = requestFunc()
			.then(data => {
				if (this.activeRequest !== request) {
					return;
				}
				this.objs.update(current => [...(current ?? []), ...data.items]);
				loadMore.hasMore.set((data.list.total ?? 0) > (this.objs()?.length ?? 0));
				loadMore.total.set(data.list.total);
				loadMore.loading.set(false);
			})
			.catch((error: unknown) => {
				if (this.activeRequest === request) {
					loadMore.loading.set(false);
				}
				this.notify.error(error);
			});
		this.activeRequest = request;
	}

	load(): void {
		const loader = this.loader();
		if (!loader) {
			this.objs.set([]);
			return;
		}
		const search = this.searchQuery();
		if (search) {
			this.getObjs(async () => loader.search(search, this.loadMore().skip(), this.loadMore().take()));
			return;
		}
		const list = this.listQuery();
		if (list) {
			this.getObjs(async () => loader.list(list, this.loadMore().skip(), this.loadMore().take()));
			return;
		}
		if (this.loadAll()) {
			this.getObjs(async () => loader.all(this.loadMore().skip(), this.loadMore().take()));
			return;
		}
		this.objs.set([]);
	}
}
