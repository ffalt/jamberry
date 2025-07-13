import {Component, type OnDestroy, type OnInit, inject, viewChild} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {UiStateService} from '@core/services';
import type {Jam} from '@jam';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {folderSubSections} from '../../admin.types';
import {FolderTreeComponent} from '../folder-tree/folder-tree.component';

@Component({
	selector: 'app-admin-folder',
	templateUrl: './admin-folder.component.html',
	styleUrls: ['./admin-folder.component.scss'],
	standalone: false,
	host: {
		'[class.right-active]': 'rightActive'
	}
})
export class AdminFolderComponent implements OnInit, OnDestroy {
	rightActive: boolean = false;
	id: string = '';
	private readonly tree = viewChild(FolderTreeComponent);
	private readonly unsubscribe = new Subject<void>();
	private readonly route = inject(ActivatedRoute);
	private readonly router = inject(Router);
	private readonly uiState = inject(UiStateService);
	private mode: string = 'overview';

	refresh(): void {
		const tree = this.tree();
		if (tree) {
			tree.refresh();
		}
	}

	selectionChange(data: Jam.Folder): void {
		this.router.navigate([`/admin/folder/${data.id}/${this.mode}`])
			.catch(e => {
				console.error(e);
			});
	}

	onFolderUpdate(data: Jam.Folder): void {
		const tree = this.tree();
		if (tree) {
			tree.onFolderUpdate(data);
		}
	}

	ngOnInit(): void {
		this.router.events
			.pipe(takeUntil(this.unsubscribe)).subscribe(event => {
			if (event instanceof NavigationEnd && this.route.firstChild?.snapshot.url[0]) {
				const m = this.route.firstChild.snapshot.url[0].path;
				if (folderSubSections.includes(m)) {
					this.mode = m;
				}
			}
		});
		if (this.route) {
			this.route.params
				.pipe(takeUntil(this.unsubscribe)).subscribe(params => {
				const id = params.id;
				this.id = id;
				if (this.tree() && id) {
					setTimeout(() => {
						const tree = this.tree();
						if (tree) {
							tree.selectFolderByID(id);
						}
					});
				}
			});
		}
		const tree = this.tree();
		if (tree) {
			tree.expandIDs = this.uiState.data['app-admin-folders'] || [];
		}
		this.refresh();
	}

	ngOnDestroy(): void {
		const tree = this.tree();
		if (tree) {
			this.uiState.data['app-admin-folders'] = tree.expandIDs;
		}
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}
}
