import { EventEmitter, inject, Injectable, signal } from '@angular/core';
import { Poller } from '@utils/poller';
import { type Jam, JamService } from '@jam';
import { NotifyService } from '../notify/notify.service';

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

@Injectable()
export class AdminFolderService {
	readonly foldersChange = new EventEmitter<{ id: string; mode: AdminFolderServiceNotifyMode }>();
	readonly tracksChange = new EventEmitter<{ id: string }>();
	readonly current = signal<AdminChangeQueueInfoPoll | undefined>(undefined);
	readonly queue = signal<Array<AdminChangeQueueInfoPoll>>([]);
	private readonly jam = inject(JamService);
	private readonly notify = inject(NotifyService);

	notifyTrackChange(id: string): void {
		this.tracksChange.emit({ id });
	}

	notifyFolderChange(id: string, mode: AdminFolderServiceNotifyMode): void {
		this.foldersChange.emit({ id, mode });
	}

	waitForQueueResult(title: string, item: Jam.AdminChangeQueueInfo, folderIDs?: Array<string>, refreshChildsFolderIDs?: Array<string>, trackIDs?: Array<string>): EventEmitter<Jam.AdminChangeQueueInfo> {
		let old = this.queue().find(q => q.id === item.id);
		if (!old && this.current()?.id === item.id) {
			old = this.current();
		}
		if (old?.notifyAfter) {
			this.appendToExistingWaiter(old, folderIDs, refreshChildsFolderIDs, trackIDs);
			if (this.current() === old) {
				this.current.set({ ...old });
			}
			return old.notifyAfter;
		}
		const notifyAfter = new EventEmitter<Jam.AdminChangeQueueInfo>();
		this.queue.update(q => [...q, { title, id: item.id, item, folderIDs, refreshChildsFolderIDs, trackIDs, count: 1, notifyAfter }]);
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
		waiter[property] ??= [];
		for (const id of ids) {
			if (!waiter[property].includes(id)) {
				waiter[property].push(id);
			}
		}
	}

	private nextPoll(): void {
		if (this.current()) {
			return;
		}
		const q = this.queue();
		if (q.length === 0) {
			return;
		}
		const [first, ...rest] = q;
		this.current.set(first);
		this.queue.set(rest);
		const queryPoll = new Poller<AdminChangeQueueInfoPoll>((data, cb) => {
			this.jam.admin.queueId({ id: data.id })
				.then(result => {
					data.item = result;
					if (result.error || result.done !== undefined) {
						if (result.error) {
							this.notify.error(new Error(result.error));
						}
						this.pollEnd(data, result);
						cb(false);
						return;
					}
					cb(true);
				})
				.catch((error: unknown) => {
					console.error('error while polling admin change queue status', error);
					this.pollEnd(data);
					cb(false);
				});
		});
		queryPoll.poll(first, true);
	}

	private pollEnd(data: AdminChangeQueueInfoPoll, result?: Jam.AdminChangeQueueInfo): void {
		const folderIDs = data.folderIDs ?? [];
		for (const id of folderIDs) {
			this.notifyFolderChange(id, AdminFolderServiceNotifyMode.fsnRefresh);
		}
		const refreshChildsFolderIDs = data.refreshChildsFolderIDs ?? [];
		for (const id of refreshChildsFolderIDs) {
			this.notifyFolderChange(id, AdminFolderServiceNotifyMode.fsnRefreshChilds);
		}
		const trackIDs = data.trackIDs ?? [];
		for (const id of trackIDs) {
			this.notifyTrackChange(id);
		}
		if (data.notifyAfter) {
			data.notifyAfter.emit(result);
			data.notifyAfter.complete();
			data.notifyAfter = undefined;
		}
		this.current.set(undefined);
		this.nextPoll();
	}
}
