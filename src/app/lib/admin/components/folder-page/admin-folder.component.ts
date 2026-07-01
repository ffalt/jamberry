import { Component, DestroyRef, inject, signal, viewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import type { Jam } from '@jam';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { folderSubSections } from '../../admin.types';
import { FolderTreeComponent } from '../folder-tree/folder-tree.component';
import { SplitterComponent } from '@core/components/splitter/splitter.component';
import { UiStateService } from '@core/services/ui-state/ui-state.service';
import { IconLeftComponent } from '@core/components/icons/icon-left.component';
import { IconRightComponent } from '@core/components/icons/icon-right.component';

@Component({
	selector: 'app-admin-folder',
	templateUrl: './admin-folder.component.html',
	styleUrls: ['./admin-folder.component.scss'],
	imports: [FolderTreeComponent, IconLeftComponent, IconRightComponent, RouterModule, SplitterComponent],
	host: {
		'[class.right-active]': 'rightActive'
	}
})
export class AdminFolderComponent {
	rightActive: boolean = false;
	readonly id = signal<string | undefined>(undefined);
	private readonly tree = viewChild(FolderTreeComponent);
	private readonly lifeRef = inject(DestroyRef);
	private readonly route = inject(ActivatedRoute);
	private readonly router = inject(Router);
	private readonly uiState = inject(UiStateService);
	private mode: string = 'overview';

	constructor() {
		this.router.events
			.pipe(takeUntilDestroyed(this.lifeRef))
			.subscribe(event => {
				if (!(event instanceof NavigationEnd && this.route.firstChild?.snapshot.url[0])) {
					return;
				}

				const m = this.route.firstChild.snapshot.url[0].path;
				if (folderSubSections.includes(m)) {
					this.mode = m;
				}
			});
		this.route.paramMap
			.pipe(takeUntilDestroyed(this.lifeRef))
			.subscribe(paramMap => {
				const id = paramMap.get('id') ?? undefined;
				this.id.set(id);
				if (id) {
					setTimeout(() => {
						const tree = this.tree();
						if (tree) {
							tree.selectFolderByID(id);
						}
					}, 0);
				}
			});
		this.lifeRef.onDestroy(() => {
			const tree = this.tree();
			if (tree) {
				this.uiState.put('app-admin-folders', tree.expandIDs);
			}
		});
	}

	refresh(): void {
		const tree = this.tree();
		if (tree) {
			tree.refresh();
		}
	}

	selectionChange(data: Jam.Folder): void {
		this.router.navigate([`/admin/folder/${data.id}/${this.mode}`]).catch((error: unknown) => {
			console.error(error);
		});
	}

	onFolderUpdate(data: Jam.Folder): void {
		const tree = this.tree();
		if (tree) {
			tree.onFolderUpdate(data);
		}
	}
}
