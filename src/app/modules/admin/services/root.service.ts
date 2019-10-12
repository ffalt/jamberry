import {FolderService} from '@admin/services/folder.service';
import {EventEmitter, Injectable, OnDestroy} from '@angular/core';
import {Notifiers} from '@app/utils/notifier';
import {Poller} from '@app/utils/poller';
import {NotifyService} from '@core/services';
import {Jam, JamService} from '@jam';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {RootEdit} from '../admin.interface';

@Injectable()
export class RootService implements OnDestroy {
	rootsChange = new EventEmitter<Array<Jam.Root>>();
	rootChange = new Notifiers<Jam.Root>();
	protected unsubscribe = new Subject();
	private roots: Array<Jam.Root>;
	private rootPoll = new Poller<Jam.Root>((root, cb) => {
		this.jam.root.status({id: root.id})
			.then(data => {
				const listeners = this.rootsChange.observers.length + this.rootChange.listeners(root.id);
				if (listeners <= 0) {
					cb(false);
					return;
				}
				if (!data.scanning) {
					root.status = data;
					cb(false);
				} else {
					cb(true);
				}
			})
			.catch(err => {
				console.error('error while polling root scan status', err);
			});
	});

	constructor(private jam: JamService, private notify: NotifyService, private folderService: FolderService) {
	}

	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}

	async applyDialogRoot(edit: RootEdit): Promise<void> {
		if (edit.root) {
			const item = await this.jam.root.update({id: edit.root.id, name: edit.name, path: edit.path, strategy: edit.strategy});
			this.folderService.waitForQueueResult('Updating Root', item, [])
				.pipe(takeUntil(this.unsubscribe)).subscribe(() => {
				this.notify.success('Root updated');
				this.refreshRoot(edit.root.id);
			});
		} else {
			const item = await this.jam.root.create({name: edit.name, path: edit.path, strategy: edit.strategy});
			this.folderService.waitForQueueResult('Creating Root', item, [])
				.pipe(takeUntil(this.unsubscribe)).subscribe(() => {
				this.notify.success('Root created');
				this.refreshRoots();
			});
		}
	}

	rescanRoot(root: Jam.Root): void {
		this.jam.root.scan({id: root.id})
			.then(() => {
				this.refreshRoot(root.id);
			})
			.catch(e => {
				this.notify.error(e);
			});
	}

	rescanRoots(): void {
		this.jam.root.scanAll()
			.then(() => {
				this.refreshRoots();
			})
			.catch(e => {
				this.notify.error(e);
			});
	}

	removeRoot(root: Jam.Root): void {
		this.jam.root.delete({id: root.id})
			.then(item => {
				this.folderService.waitForQueueResult('Removing Root', item, [])
					.pipe(takeUntil(this.unsubscribe)).subscribe(() => {
					this.roots = this.roots.filter(r => r.id !== root.id);
					this.rootChange.emit(root.id, undefined);
					this.notify.success('Root removed');
					this.refreshRoots();
				});
			})
			.catch(e => {
				this.notify.error(e);
			});
	}

	refreshRoot(id: string): void {
		this.jam.root.id({id})
			.then(root => {
				const index = this.roots.findIndex(p => p.id === id);
				if (index < 0) {
					this.roots.push(root);
				} else {
					this.roots[index] = root;
				}
				this.rootChange.emit(id, root);
				this.rootsChange.emit(this.roots);
				if (root.status && root.status.scanning) {
					this.rootPoll.poll(root);
				}
			})
			.catch(e => {
				this.notify.error(e);
			});
	}

	refreshRoots(): void {
		this.jam.root.search({})
			.then(data => {
				this.roots = data.items;
				this.roots.forEach(root => {
					if (root.status && root.status.scanning) {
						this.rootPoll.poll(root);
					}
				});
				this.rootsChange.emit(this.roots);
			})
			.catch(e => {
				this.notify.error(e);
			});
	}
}
