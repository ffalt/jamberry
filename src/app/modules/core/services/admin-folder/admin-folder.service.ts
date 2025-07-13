import {EventEmitter, Injectable, inject} from '@angular/core';
import {Poller} from '@app/utils/poller';
import {type Jam, JamService} from '@jam';
import {NotifyService} from '../notify/notify.service';

export enum AdminFolderServiceNotifyMode {
	fsnRefresh,
	fsnRefreshChilds
}

export interface AdminChangeQueueInfoPoll {
	title: string;
	id: string;
	item: Jam.AdminChangeQueueInfo;
	folderIDs?: Array<string>;
	refreshChildsFolderIDs?: Array<string>;
	trackIDs?: Array<string>;
	count: number;
	notifyAfter?: EventEmitter<Jam.AdminChangeQueueInfo>;
}

@Injectable({
	providedIn: 'root'
})
export class AdminFolderService {
	current?: AdminChangeQueueInfoPoll;
	queue: Array<AdminChangeQueueInfoPoll> = [];
	readonly foldersChange = new EventEmitter<{ id: string; mode: AdminFolderServiceNotifyMode }>();
	readonly tracksChange = new EventEmitter<{ id: string }>();
	private readonly jam = inject(JamService);
	private readonly notify = inject(NotifyService);

	notifyTrackChange(id: string): void {
		this.tracksChange.emit({id});
	}

	notifyFolderChange(id: string, mode: AdminFolderServiceNotifyMode): void {
		this.foldersChange.emit({id, mode});
	}

	waitForQueueResult(title: string, item: Jam.AdminChangeQueueInfo, folderIDs?: Array<string>, refreshChildsFolderIDs?: Array<string>, trackIDs?: Array<string>): EventEmitter<Jam.AdminChangeQueueInfo> {
		let old = this.queue.find(q => q.id === item.id);
		if (!old && this.current && this.current.id === item.id) {
			old = this.current;
		}
		if (old?.notifyAfter) {
			this.appendToExistingWaiter(old, folderIDs, refreshChildsFolderIDs, trackIDs);
			return old.notifyAfter;
		}
		const notifyAfter = new EventEmitter<Jam.AdminChangeQueueInfo>();
		this.queue.push({title, id: item.id, item, folderIDs, refreshChildsFolderIDs, trackIDs, count: 1, notifyAfter});
		this.nextPoll();
		return notifyAfter;
	}

	private appendToExistingWaiter(
		waiter: AdminChangeQueueInfoPoll,
		folderIDs?: Array<string>,
		refreshChildsFolderIDs?: Array<string>,
		trackIDs?: Array<string>
	): void {
		this.appendIds(waiter, 'folderIDs', folderIDs);
		this.appendIds(waiter, 'refreshChildsFolderIDs', refreshChildsFolderIDs);
		this.appendIds(waiter, 'trackIDs', trackIDs);
		waiter.count++;
	}

	private appendIds(
		waiter: AdminChangeQueueInfoPoll,
		property: keyof Pick<AdminChangeQueueInfoPoll, 'folderIDs' | 'refreshChildsFolderIDs' | 'trackIDs'>,
		ids?: Array<string>
	): void {
		if (!ids) {
			return;
		}
		waiter[property] = waiter[property] || [];
		for (const id of ids) {
			if (!waiter[property].includes(id)) {
				waiter[property].push(id);
			}
		}
	}

	private nextPoll(): void {
		if (this.current) {
			return;
		}
		this.current = this.queue.shift();
		if (this.current) {
			const queryPoll = new Poller<AdminChangeQueueInfoPoll>((data, cb) => {
				this.jam.admin.queueId({id: data.id})
					.then(result => {
						data.item = result;
						if (result.error || result.done !== undefined) {
							if (result.error) {
								this.notify.error(Error(result.error));
							}
							this.pollEnd(data, result);
							cb(false);
							return;
						}
						cb(true);
					})
					.catch(err => {
						console.error('error while polling admin change queue status', err);
						this.pollEnd(data);
						cb(false);
					});
			});
			queryPoll.poll(this.current, true);
		}
	}

	private pollEnd(data: AdminChangeQueueInfoPoll, result?: Jam.AdminChangeQueueInfo): void {
		for (const id of (data.folderIDs || [])) {
			this.notifyFolderChange(id, AdminFolderServiceNotifyMode.fsnRefresh);
		}
		for (const id of (data.refreshChildsFolderIDs || [])) {
			this.notifyFolderChange(id, AdminFolderServiceNotifyMode.fsnRefreshChilds);
		}
		for (const id of (data.trackIDs || [])) {
			this.notifyTrackChange(id);
		}
		if (data.notifyAfter) {
			data.notifyAfter.emit(result);
			data.notifyAfter.complete();
			data.notifyAfter = undefined;
		}
		this.current = undefined;
		this.nextPoll();
	}
}
