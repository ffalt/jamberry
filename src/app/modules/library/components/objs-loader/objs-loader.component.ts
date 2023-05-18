import {Component, Input, OnChanges, ViewChild} from '@angular/core';
import {NotifyService} from '@core/services';
import {AlbumType, Jam, JamService, ListType} from '@jam';
import {JamObjsLoader} from '@library/model/loaders';
import {JamLibraryObject} from '@library/model/objects';
import {LibraryService} from '@library/services';
import {LoadMoreButtonComponent} from '@shared/components';

@Component({
	selector: 'app-obj-loader',
	templateUrl: './objs-loader.component.html',
	styleUrls: ['./objs-loader.component.scss']
})
export class ObjsLoaderComponent implements OnChanges {
	@Input() grouping: boolean = false;
	@Input() showParent: boolean = false;
	@Input() loader?: JamObjsLoader;
	@Input() listQuery?: { listType: ListType; albumType?: AlbumType };
	@Input() searchQuery?: { query?: string; albumType?: AlbumType; genre?: string; genreID?: string };
	@Input() loadAll: boolean = false;
	@Input() changeTrigger?: string;

	@ViewChild(LoadMoreButtonComponent, {static: true}) loadMore!: LoadMoreButtonComponent;
	objs?: Array<JamLibraryObject>;
	private activeRequest?: Promise<void>;

	constructor(protected library: LibraryService, protected jam: JamService, protected notify: NotifyService) {
	}

	getObjs(requestFunc: () => Promise<{ list: Jam.Page; items: Array<JamLibraryObject> }>): void {
		this.loadMore.loading = true;
		const request = requestFunc()
			.then(data => {
				if (this.activeRequest === request) {
					this.objs = (this.objs || []).concat(data.items || []);
					this.loadMore.hasMore = (data.list.total || 0) > this.objs.length;
					this.loadMore.total = data.list.total;
					this.loadMore.loading = false;
				}
			})
			.catch(e => {
				if (this.activeRequest === request) {
					this.loadMore.loading = false;
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
			this.getObjs(async () => loader.search(search, this.loadMore.skip, this.loadMore.take));
			return;
		}
		const list = this.listQuery;
		if (list) {
			this.getObjs(async () => loader.list(list, this.loadMore.skip, this.loadMore.take));
			return;
		}
		if (this.loadAll) {
			this.getObjs(async () => loader.all(this.loadMore.skip, this.loadMore.take));
			return;
		}
		this.objs = [];
	}

	ngOnChanges(): void {
		this.loadMore.skip = 0;
		this.loadMore.total = 0;
		this.loadMore.hasMore = false;
		this.objs = undefined;
		this.load();
	}

}
