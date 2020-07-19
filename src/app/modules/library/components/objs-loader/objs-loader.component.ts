import {Component, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
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
	@Input() loader: JamObjsLoader;
	@Input() listQuery: { listType: ListType; albumType?: AlbumType };
	@Input() searchQuery: { query?: string; albumType?: AlbumType; genre?: string };
	@Input() loadAll: boolean = false;
	@Input() changeTrigger: string;

	@ViewChild(LoadMoreButtonComponent, {static: true}) loadMore: LoadMoreButtonComponent;
	objs: Array<JamLibraryObject>;
	private activeRequest: Promise<void>;

	constructor(protected library: LibraryService, protected jam: JamService, protected notify: NotifyService) {
	}

	getObjs(requestFunc: () => Promise<{ list: Jam.Page; items: Array<JamLibraryObject> }>): void {
		this.loadMore.loading = true;
		const request = requestFunc()
			.then(data => {
				if (this.activeRequest === request) {
					this.objs = (this.objs || []).concat(data.items || []);
					this.loadMore.hasMore = data.list.total > this.objs.length;
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
		if (this.searchQuery) {
			this.getObjs(() => this.loader.search(this.searchQuery, this.loadMore.skip, this.loadMore.take));
		} else if (this.listQuery) {
			this.getObjs(() => this.loader.list(this.listQuery, this.loadMore.skip, this.loadMore.take));
		} else if (this.loadAll) {
			this.getObjs(() => this.loader.all(this.loadMore.skip, this.loadMore.take));
		} else {
			this.objs = [];
		}
	}

	ngOnChanges(changes: SimpleChanges): void {
		this.loadMore.skip = 0;
		this.loadMore.total = 0;
		this.loadMore.hasMore = false;
		this.objs = undefined;
		this.load();
	}

}
