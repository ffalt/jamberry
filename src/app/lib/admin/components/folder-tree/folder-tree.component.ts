import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
import { Component, DestroyRef, inject, output, signal, viewChild } from '@angular/core';
import { FolderType, type Jam, JamService } from '@jam';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ClickKeyEnterDirective } from '@core/directives/click-enterkey.directive';
import { FocusKeyListItemDirective } from '@core/directives/focus-key-list-item.directive';
import { FocusKeyListDirective } from '@core/directives/focus-key-list.directive';
import { NotifyService } from '@core/services/notify/notify.service';
import { AdminFolderService, AdminFolderServiceNotifyMode } from '@core/services/admin-folder/admin-folder.service';
import { IconFolderComponent } from '@core/components/icons/icon-folder.component';
import { IconFolderOpenComponent } from '@core/components/icons/icon-folder-open.component';
import { IconMinusComponent } from '@core/components/icons/icon-minus.component';
import { IconPlusComponent } from '@core/components/icons/icon-plus.component';
import { IconReloadComponent } from '@core/components/icons/icon-reload.component';
import { IconSpinComponent } from '@core/components/icons/icon-spin.component';

export interface TreeNode {
	level: number;
	color: string;
	folder: Jam.Folder;
	expanded: boolean;
	isLoading: boolean;
	hasChildren: boolean;
	children?: Array<TreeNode>;
}

function walkChildren(node: TreeNode, onItem: (node: TreeNode) => void): void {
	if (!node.children) {
		return;
	}
	for (const n of node.children) {
		onItem(n);
		walkChildren(n, onItem);
	}
}

@Component({
	selector: 'app-admin-folder-tree',
	templateUrl: './folder-tree.component.html',
	styleUrls: ['./folder-tree.component.scss'],
	imports: [ClickKeyEnterDirective, FocusKeyListDirective, FocusKeyListItemDirective, IconFolderComponent, IconFolderOpenComponent, IconMinusComponent, IconPlusComponent, IconReloadComponent, IconSpinComponent, ScrollingModule]
})
export class FolderTreeComponent {
	readonly selectionChange = output<Jam.Folder>();
	readonly selected = signal<TreeNode | undefined>(undefined);
	readonly nodes = signal<Array<TreeNode>>([]);
	expandIDs: Array<string> = [];
	private readonly viewport = viewChild(CdkVirtualScrollViewport);
	private readonly lifeRef = inject(DestroyRef);
	private readonly jam = inject(JamService);
	private readonly notify = inject(NotifyService);
	private readonly folderService = inject(AdminFolderService);

	constructor() {
		this.folderService.foldersChange
			.pipe(takeUntilDestroyed(this.lifeRef))
			.subscribe(change => {
				const node = this.nodes().find(n => n.folder.id === change.id);
				if (node) {
					this.jam.folder.id({ id: change.id, folderIncTrackCount: true, folderIncChildFolderCount: true })
						.then(folder => {
							node.folder = folder;
							if (change.mode === AdminFolderServiceNotifyMode.fsnRefreshChilds && node.expanded) {
								this.collapseNode(node);
								node.hasChildren = (folder.folderCount ?? 0) > 0;
								node.children = undefined;
								node.isLoading = false;
								if (node.hasChildren) {
									node.expanded = true;
									this.checkLoadExpanded(node);
								}
							}
							this.nodes.update(n => [...n]);
						})
						.catch((error: unknown) => {
							console.error(error);
						});
				}
			});
	}

	selectNode(node: TreeNode): void {
		this.selectionChange.emit(node.folder);
		this.selected.set(node);
	}

	toggleNode(node: TreeNode): void {
		if (node.expanded) {
			this.collapseNode(node);
		} else {
			this.expandNode(node);
		}
	}

	refresh(): void {
		if (!this.jam.auth.isLoggedIn()) {
			return;
		}
		this.jam.folder.search({ level: 0, folderIncChildFolderCount: true, folderIncTrackCount: true })
			.then(data => {
				const nodes = data.items.map(folder => ({
					folder,
					hasChildren: (folder.folderCount ?? 0) > 0,
					level: 0,
					color: this.typeToColor(folder),
					expanded: this.expandIDs.includes(folder.id),
					isLoading: false
				}));
				this.nodes.set(nodes);
				for (const node of nodes) {
					this.checkLoadExpanded(node);
				}
			})
			.catch((error: unknown) => {
				this.notify.error(error);
			});
	}

	typeToColor(folder: Jam.Folder): string {
		switch (folder.type) {
			case FolderType.unknown: {
				return '#ff9fAA';
			}
			case FolderType.artist: {
				return '#6f806e';
			}
			case FolderType.collection: {
				return '#adbced';
			}
			case FolderType.album: {
				// single #edbfd0
				return '#bdbd9c';
			}
			case FolderType.multialbum: {
				return '#bdaaae';
			}
			case FolderType.extras: {
				return '#bdbdbd';
			}
			default: {
				return '';
			}
		}
	}

	onFolderUpdate(data: Jam.Folder): void {
		const node = this.nodes().find(n => n.folder.id === data.id);
		if (node) {
			node.folder = data;
			node.hasChildren = (data.folderCount ?? 0) > 0;
			node.color = this.typeToColor(data);
			this.nodes.update(n => [...n]);
		}
	}

	selectFolderByID(id: string): void {
		const node = this.nodes().find(n => n.folder.id === id);
		if (node) {
			this.selected.set(node);
		} else {
			this.jam.folder.id({ id, folderIncParents: true })
				.then(folder => {
					if (!folder.parents) {
						return;
					}

					for (const p of folder.parents) {
						if (!this.expandIDs.includes(p.id)) {
							this.expandIDs.push(p.id);
						}
					}
					for (const n of this.nodes()) {
						n.expanded = this.expandIDs.includes(n.folder.id);
						this.checkLoadExpanded(n, id);
					}
				})
				.catch((error: unknown) => {
					this.notify.error(error);
				});
		}
	}

	private checkLoadExpanded(node: TreeNode, selectID?: string): void {
		if (node.expanded && !node.isLoading) {
			this.loadChildren(node, children => {
				for (const child of children) {
					this.checkLoadExpanded(child, selectID);
				}
			});
		}
		if (node.folder.id === selectID) {
			this.selected.set(node);
			const viewport = this.viewport();
			if (viewport) {
				viewport.scrollToIndex(this.nodes().indexOf(node));
			}
		}
	}

	private loadChildren(node: TreeNode, cb?: (nodes: Array<TreeNode>) => void): void {
		if (node.isLoading) {
			return;
		}
		node.isLoading = true;
		this.jam.folder.search({ parentIDs: [node.folder.id], folderIncChildFolderCount: true, folderIncTrackCount: true })
			.then(data => {
				const result: Array<TreeNode> = data.items
					.toSorted((a, b) => a.name.localeCompare(b.name))
					.map(folder => ({
						folder,
						hasChildren: (folder.folderCount ?? 0) > 0,
						level: node.level + 1,
						color: this.typeToColor(folder),
						expanded: this.expandIDs.includes(folder.id),
						isLoading: false
					}));
				const current = this.nodes();
				const index = current.indexOf(node);
				if (index !== -1) {
					this.nodes.set([...current.slice(0, index + 1), ...result, ...current.slice(index + 1)]);
				}
				node.children = result;
				node.isLoading = false;
				if (cb) {
					cb(result);
				}
			})
			.catch((error: unknown) => {
				this.notify.error(error);
			});
	}

	private collapseNode(node: TreeNode): void {
		if (!node.expanded) {
			return;
		}
		const viewport = this.viewport();
		const scrollOffset = viewport?.measureScrollOffset() ?? 0;
		const itemSize = 22;

		const ids = new Set<string>();
		walkChildren(node, child => ids.add(child.folder.id));

		// Count removed items that are above the current scroll position
		let removedAbove = 0;
		for (const [i, n] of this.nodes().entries()) {
			if (ids.has(n.folder.id) && i * itemSize < scrollOffset) {
				removedAbove++;
			}
		}

		this.nodes.set(this.nodes().filter(n => !ids.has(n.folder.id)));
		node.expanded = false;
		node.children = undefined;
		this.expandIDs = this.expandIDs.filter(n => n !== node.folder.id);

		if (viewport && removedAbove > 0) {
			requestAnimationFrame(() => {
				viewport.scrollToOffset(scrollOffset - removedAbove * itemSize);
			});
		}
	}

	private expandNode(node: TreeNode): void {
		if (node.expanded) {
			return;
		}
		if (node.children) {
			const current = this.nodes();
			const index = current.indexOf(node);
			this.nodes.set([...current.slice(0, index + 1), ...node.children, ...current.slice(index + 1)]);
		} else {
			this.loadChildren(node);
		}
		this.expandIDs.push(node.folder.id);
		node.expanded = true;
	}
}
