import { EventEmitter, inject, Injectable, type OnDestroy } from '@angular/core';
import { Notifiers } from '@utils/notifier';
import { Poller } from '@utils/poller';
import { type Jam, JamService, type RootScanStrategy } from '@jam';
import { Subject, takeUntil } from 'rxjs';
import { AdminFolderService } from '../admin-folder/admin-folder.service';
import { NotifyService } from '../notify/notify.service';

export interface AdminRootServiceEditData {
	root?: Jam.Root;
	name: string;
	path: string;
	strategy: RootScanStrategy;
}

@Injectable({
	providedIn: 'root'
})
export class AdminRootService implements OnDestroy {
	readonly rootsChange = new EventEmitter<Array<Jam.Root>>();
	readonly rootChange = new Notifiers<Jam.Root>();
	private readonly unsubscribe = new Subject<void>();
	private readonly jam = inject(JamService);
	private readonly notify = inject(NotifyService);
	private readonly folderService = inject(AdminFolderService);
	private readonly rootPoll = new Poller<Jam.Root>((root, cb) => {
		this.jam.root.status({ id: root.id })
			.then(data => {
				const observed = this.rootsChange.observed || this.rootChange.observed(root.id);
				if (!observed) {
					cb(false);
					return;
				}
				if (data.scanning) {
					cb(true);
				} else {
					root.status = data;
					cb(false);
				}
			})
			.catch((error: unknown) => {
				console.error('error while polling root scan status', error);
			});
	});

	private roots: Array<Jam.Root> = [];

	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}

	async applyDialogRoot(edit: AdminRootServiceEditData): Promise<void> {
		if (edit.root) {
			const id = edit.root.id;
			const item = await this.jam.root.update({ id, name: edit.name, path: edit.path, strategy: edit.strategy });
			this.folderService.waitForQueueResult('Updating Root', item, [])
				.pipe(takeUntil(this.unsubscribe))
				.subscribe(() => {
					this.notify.success('Root updated');
					this.refreshRoot(id);
				});
		} else {
			const item = await this.jam.root.create({ name: edit.name, path: edit.path, strategy: edit.strategy });
			this.folderService.waitForQueueResult('Creating Root', item, [])
				.pipe(takeUntil(this.unsubscribe))
				.subscribe(() => {
					this.notify.success('Root created');
					this.refreshRoots();
				});
		}
	}

	rescanRoot(root: Jam.Root): void {
		this.jam.root.refresh({ id: root.id })
			.then(() => {
				this.refreshRoot(root.id);
			})
			.catch((error: unknown) => {
				this.notify.error(error);
			});
	}

	refreshRootMeta(root: Jam.Root): void {
		this.jam.root.refreshMeta({ id: root.id })
			.then(() => {
				this.refreshRoot(root.id);
			})
			.catch((error: unknown) => {
				this.notify.error(error);
			});
	}

	rescanRoots(): void {
		this.jam.root.refresh({})
			.then(() => {
				this.refreshRoots();
			})
			.catch((error: unknown) => {
				this.notify.error(error);
			});
	}

	removeRoot(root: Jam.Root): void {
		this.jam.root.remove({ id: root.id })
			.then(item => {
				this.folderService.waitForQueueResult('Removing Root', item, [])
					.pipe(takeUntil(this.unsubscribe))
					.subscribe(() => {
						this.roots = this.roots.filter(r => r.id !== root.id);
						this.rootChange.emit(root.id);
						this.notify.success('Root removed');
						this.refreshRoots();
					});
			})
			.catch((error: unknown) => {
				this.notify.error(error);
			});
	}

	refreshRoot(id: string): void {
		this.jam.root.id({ id })
			.then(root => {
				const index = this.roots.findIndex(p => p.id === id);
				if (index === -1) {
					this.roots.push(root);
				} else {
					this.roots[index] = root;
				}
				this.rootChange.emit(id, root);
				this.rootsChange.emit(this.roots);
				if (root.status.scanning) {
					this.rootPoll.poll(root);
				}
			})
			.catch((error: unknown) => {
				this.notify.error(error);
			});
	}

	refreshRoots(): void {
		this.jam.root.search({})
			.then(data => {
				this.roots = data.items;
				for (const root of this.roots) {
					if (root.status.scanning) {
						this.rootPoll.poll(root);
					}
				}
				this.rootsChange.emit(this.roots);
			})
			.catch((error: unknown) => {
				this.notify.error(error);
			});
	}
}
