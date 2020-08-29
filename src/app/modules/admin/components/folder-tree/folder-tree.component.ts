import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {AdminFolderService, AdminFolderServiceNotifyMode, AppService, NotifyService} from '@core/services';
import {FolderType, Jam, JamService} from '@jam';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

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
	styleUrls: ['./folder-tree.component.scss']
})
export class FolderTreeComponent implements OnInit, OnDestroy {
	selected?: TreeNode;
	nodes: Array<TreeNode> = [];
	expandIDs: Array<string> = [];
	@Input() autoSelect: boolean = false;
	@Output() readonly selectionChange = new EventEmitter<Jam.Folder>();
	@ViewChild(CdkVirtualScrollViewport, {static: true}) viewport?: CdkVirtualScrollViewport;
	protected unsubscribe = new Subject();

	constructor(private app: AppService, private jam: JamService, private notify: NotifyService, private folderService: AdminFolderService) {
	}

	ngOnInit(): void {
		this.folderService.foldersChange
			.pipe(takeUntil(this.unsubscribe)).subscribe(
			change => {
				const node = this.nodes.find(n => n.folder.id === change.id);
				if (node) {
					this.jam.folder.id({id: change.id, folderIncTrackCount: true, folderIncChildFolderCount: true})
						.then(folder => {
							node.folder = folder;
							if (change.mode === AdminFolderServiceNotifyMode.fsnRefreshChilds) {
								if (node.expanded) {
									this.collapseNode(node);
									node.hasChildren = (folder.folderCount || 0) > 0;
									node.children = undefined;
									node.isLoading = false;
									if (node.hasChildren) {
										node.expanded = true;
										this.checkLoadExpanded(node);
									}
								}
							}
						})
						.catch(e => {
							console.error(e);
						});
				}
			}
		);
	}

	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}

	selectNode(node: TreeNode): void {
		this.selectionChange.emit(node.folder);
		if (this.autoSelect) {
			this.selected = node;
		}
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
		this.jam.folder.search({level: 0, folderIncChildFolderCount: true, folderIncTrackCount: true})
			.then(data => {
				this.nodes = data.items
					.map(folder =>
						({
							folder,
							hasChildren: (folder.folderCount || 0) > 0,
							level: 0,
							color: this.typeToColor(folder),
							expanded: this.expandIDs.includes(folder.id),
							isLoading: false
						}));
				for (const node of this.nodes) {
					this.checkLoadExpanded(node);
				}
			})
			.catch(e => {
				this.notify.error(e);
			});
	}

	typeToColor(folder: Jam.Folder): string {
		switch (folder.type) {
			case FolderType.unknown:
				return '#ff9fAA';
			case FolderType.artist:
				return '#6f806e';
			case FolderType.collection:
				return '#adbced';
			case FolderType.album:
				// single #edbfd0
				return '#bdbd9c';
			case FolderType.multialbum:
				return '#bdaaae';
			case FolderType.extras:
				return '#bdbdbd';
			default:
				return '';
		}
	}

	onFolderUpdate(data: Jam.Folder): void {
		const node = this.nodes.find(n => n.folder.id === data.id);
		if (node) {
			node.folder = data;
		}
	}

	selectFolderByID(id: string): void {
		const node = this.nodes.find(n => n.folder.id === id);
		if (!node) {
			this.jam.folder.id({id, folderIncParents: true})
				.then(folder => {
					if (folder.parents) {
						for (const p of folder.parents) {
							if (!this.expandIDs.includes(p.id)) {
								this.expandIDs.push(p.id);
							}
						}
						for (const n of this.nodes) {
							n.expanded = this.expandIDs.includes(n.folder.id);
							this.checkLoadExpanded(n, id);
						}
					}
				})
				.catch(e => {
					this.notify.error(e);
				});
		} else {
			this.selected = node;
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
			this.selected = node;
			if (this.viewport) {
				this.viewport.scrollToIndex(this.nodes.indexOf(node));
			}
		}
	}

	private loadChildren(node: TreeNode, cb?: (nodes: Array<TreeNode>) => void): void {
		if (node.isLoading) {
			return;
		}
		node.isLoading = true;
		this.jam.folder.search({parentIDs: [node.folder.id], folderIncChildFolderCount: true, folderIncTrackCount: true})
			.then(data => {
				const result: Array<TreeNode> = data.items
					.sort((a, b) => a.name.localeCompare(b.name))
					.map(folder =>
						({
							folder,
							hasChildren: (folder.folderCount || 0) > 0,
							level: node.level + 1,
							color: this.typeToColor(folder),
							expanded: this.expandIDs.includes(folder.id),
							isLoading: false
						}));
				const index = this.nodes.indexOf(node);
				if (index >= 0) {
					this.nodes = this.nodes.slice(0, index + 1).concat(result).concat(this.nodes.slice(index + 1));
				}
				node.children = result;
				node.isLoading = false;
				if (cb) {
					cb(result);
				}
			})
			.catch(e => {
				this.notify.error(e);
			});
	}

	private collapseNode(node: TreeNode): void {
		if (node.expanded) {
			const ids: Array<string> = [];
			walkChildren(node, child => ids.push(child.folder.id));
			this.nodes = this.nodes.filter(n => !ids.includes(n.folder.id));
			node.expanded = false;
			node.children = undefined;
			this.expandIDs = (this.expandIDs || []).filter(n => n !== node.folder.id);
		}
	}

	private expandNode(node: TreeNode): void {
		if (!node.expanded) {
			if (node.children) {
				const index = this.nodes.indexOf(node);
				this.nodes = this.nodes.slice(0, index + 1).concat(node.children).concat(this.nodes.slice(index + 1));
			} else {
				this.loadChildren(node);
			}
			this.expandIDs.push(node.folder.id);
			node.expanded = true;
		}
	}
}
