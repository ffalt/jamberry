import {Component, Input, OnChanges, inject, viewChild} from '@angular/core';
import {NotifyService} from '@core/services';
import {AlbumType, Jam, ListType} from '@jam';
import {JamObjsLoader} from '@library/model/loaders';
import {JamLibraryObject} from '@library/model/objects';
import {LoadMoreButtonComponent} from '@shared/components';

@Component({
	selector: 'app-obj-loader',
	templateUrl: './objs-loader.component.html',
	styleUrls: ['./objs-loader.component.scss'],
	standalone: false
})
export class ObjsLoaderComponent implements OnChanges {
	@Input() grouping: boolean = false;
	@Input() showParent: boolean = false;
	@Input() loader?: JamObjsLoader;
	@Input() listQuery?: { listType: ListType; albumType?: AlbumType };
	@Input() searchQuery?: { query?: string; albumType?: AlbumType; genre?: string; genreID?: string };
	@Input() loadAll: boolean = false;
	@Input() changeTrigger?: string;
	objs?: Array<JamLibraryObject>;
	private readonly notify = inject(NotifyService);
	private readonly loadMore = viewChild.required(LoadMoreButtonComponent);
	private activeRequest?: Promise<void>;

	getObjs(requestFunc: () => Promise<{ list: Jam.Page; items: Array<JamLibraryObject> }>): void {
		const loadMore = this.loadMore();
		loadMore.loading = true;
		const request = requestFunc()
			.then(data => {
				if (this.activeRequest === request) {
					this.objs = (this.objs || []).concat(data.items || []);
					loadMore.hasMore = (data.list.total || 0) > this.objs.length;
					loadMore.total = data.list.total;
					loadMore.loading = false;
				}
			})
			.catch(e => {
				if (this.activeRequest === request) {
					loadMore.loading = false;
				}
				this.notify.error(e);
			});
		this.activeRequest = request;
	}

	load(): void {
		const loader = this.loader;
		if (!loader) {
			this.objs = [];
			return;
		}
		const search = this.searchQuery;
		if (search) {
			this.getObjs(async () => loader.search(search, this.loadMore().skip, this.loadMore().take));
			return;
		}
		const list = this.listQuery;
		if (list) {
			this.getObjs(async () => loader.list(list, this.loadMore().skip, this.loadMore().take));
			return;
		}
		if (this.loadAll) {
			this.getObjs(async () => loader.all(this.loadMore().skip, this.loadMore().take));
			return;
		}
		this.objs = [];
	}

	ngOnChanges(): void {
		const loadMore = this.loadMore();
		loadMore.skip = 0;
		loadMore.total = 0;
		loadMore.hasMore = false;
		this.objs = undefined;
		this.load();
	}

}
