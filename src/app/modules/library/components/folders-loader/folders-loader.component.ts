import {Component, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {NotifyService} from '@core/services';
import {Jam, JamParameters, JamService} from '@jam';
import {LoadMoreButtonComponent} from '@shared/components';

@Component({
	selector: 'app-folders-loader',
	templateUrl: './folders-loader.component.html',
	styleUrls: ['./folders-loader.component.scss']
})
export class FoldersLoaderComponent implements OnChanges {
	folders: Array<Jam.Folder>;
	@ViewChild(LoadMoreButtonComponent, {static: true}) loadMore: LoadMoreButtonComponent;
	@Input() query: string;
	@Input() listType: JamParameters.ListType;
	private activeRequest: Promise<void>;

	constructor(private jam: JamService, private notify: NotifyService) {
	}

	getFolders(requestFunc: () => Promise<Jam.FolderList>): void {
		this.loadMore.loading = true;
		const request = requestFunc()
			.then(data => {
				if (this.activeRequest === request) {
					this.folders = (this.folders || []).concat(data.items);
					this.loadMore.hasMore = data.total > this.folders.length;
					this.loadMore.total = data.total;
					this.loadMore.loading = false;
				}
			})
			.catch(err => {
				if (this.activeRequest === request) {
					this.loadMore.loading = false;
				}
				this.notify.error(err);
			});
		this.activeRequest = request;
	}

	search(): void {
		this.getFolders(() =>
			this.jam.folder.search({
				query: this.query,
				offset: this.loadMore.offset,
				amount: this.loadMore.amount,
				folderTag: true,
				folderState: true
			}));
	}

	list(): void {
		this.getFolders(() =>
			this.jam.folder.list({
				list: this.listType,
				offset: this.loadMore.offset,
				amount: this.loadMore.amount,
				folderTag: true,
				folderState: true
			}));
	}

	load(): void {
		if (this.query) {
			this.search();
		} else if (this.listType) {
			this.list();
		} else {
			this.folders = [];
		}
	}

	ngOnChanges(changes: SimpleChanges): void {
		this.loadMore.offset = 0;
		this.loadMore.total = 0;
		this.loadMore.hasMore = false;
		this.folders = undefined;
		this.load();
	}
}
