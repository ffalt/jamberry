import {EventEmitter, Injectable} from '@angular/core';
import {Poller} from '@app/utils/poller';
import {Jam, JamService} from '@jam';
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
	foldersChange = new EventEmitter<{ id: string; mode: AdminFolderServiceNotifyMode }>();
	tracksChange = new EventEmitter<{ id: string }>();
	current: AdminChangeQueueInfoPoll;
	queue: Array<AdminChangeQueueInfoPoll> = [];

	constructor(private jam: JamService, private notify: NotifyService) {
	}

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
		if (old) {
			if (folderIDs) {
				for (const id of folderIDs) {
					if (!old.folderIDs.includes(id)) {
						old.folderIDs.push(id);
					}
				}
			}
			if (refreshChildsFolderIDs) {
				for (const id of refreshChildsFolderIDs) {
					if (!old.refreshChildsFolderIDs.includes(id)) {
						old.refreshChildsFolderIDs.push(id);
					}
				}
			}
			if (trackIDs) {
				for (const id of trackIDs) {
					if (!old.trackIDs.includes(id)) {
						old.trackIDs.push(id);
					}
				}
			}
			old.count++;
			return;
		}
		const notifyAfter = new EventEmitter<Jam.AdminChangeQueueInfo>();
		this.queue.push({title, id: item.id, item, folderIDs, refreshChildsFolderIDs, trackIDs, count: 1, notifyAfter});
		this.nextPoll();
		return notifyAfter;
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
						this.pollEnd(data, undefined);
						cb(false);
					});
			});
			queryPoll.poll(this.current, true);
		}
	}

	private pollEnd(data: AdminChangeQueueInfoPoll, result: Jam.AdminChangeQueueInfo): void {
		(data.folderIDs || []).forEach(id => {
			this.notifyFolderChange(id, AdminFolderServiceNotifyMode.fsnRefresh);
		});
		(data.refreshChildsFolderIDs || []).forEach(id => {
			this.notifyFolderChange(id, AdminFolderServiceNotifyMode.fsnRefreshChilds);
		});
		(data.trackIDs || []).forEach(id => {
			this.notifyTrackChange(id);
		});
		if (data.notifyAfter) {
			data.notifyAfter.emit(result);
			data.notifyAfter.complete();
			data.notifyAfter = undefined;
		}
		this.current = undefined;
		this.nextPoll();
	}

}
