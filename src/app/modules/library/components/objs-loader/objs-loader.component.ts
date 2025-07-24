import {Component, type OnChanges, inject, viewChild, input} from '@angular/core';
import {NotifyService} from '@core/services';
import type {AlbumType, Jam, ListType} from '@jam';
import type {JamObjsLoader} from '@library/model/loaders';
import type {JamLibraryObject} from '@library/model/objects';
import {LoadMoreButtonComponent} from '@shared/components';

@Component({
	selector: 'app-obj-loader',
	templateUrl: './objs-loader.component.html',
	styleUrls: ['./objs-loader.component.scss'],
	standalone: false
})
export class ObjsLoaderComponent implements OnChanges {
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
	objs?: Array<JamLibraryObject>;
	private readonly notify = inject(NotifyService);
	private readonly loadMore = viewChild.required(LoadMoreButtonComponent);
	private activeRequest?: Promise<void>;

	getObjs(requestFunc: () => Promise<{ list: Jam.Page; items: Array<JamLibraryObject> }>): void {
		const loadMore = this.loadMore();
		loadMore.loading.set(true);
		const request = requestFunc()
			.then(data => {
				if (this.activeRequest === request) {
					this.objs = [...(this.objs || []), ...(data.items || [])];
					loadMore.hasMore.set((data.list.total || 0) > this.objs.length);
					loadMore.total.set(data.list.total);
					loadMore.loading.set(false);
				}
			})
			.catch(error => {
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
			this.objs = [];
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
		this.objs = [];
	}

	ngOnChanges(): void {
		const loadMore = this.loadMore();
		loadMore.skip.set(0);
		loadMore.total.set(0);
		loadMore.hasMore.set(false);
		this.objs = undefined;
		this.load();
	}
}
