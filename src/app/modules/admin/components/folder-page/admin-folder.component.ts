import {Component, HostBinding, OnDestroy, OnInit, ViewChild, inject} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {UiStateService} from '@core/services';
import {Jam} from '@jam';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {folderSubSections} from '../../admin.types';
import {FolderTreeComponent} from '../folder-tree/folder-tree.component';

@Component({
	selector: 'app-admin-folder',
	templateUrl: './admin-folder.component.html',
	styleUrls: ['./admin-folder.component.scss'],
	standalone: false
})
export class AdminFolderComponent implements OnInit, OnDestroy {
	@ViewChild(FolderTreeComponent, {static: true}) tree?: FolderTreeComponent;
	@HostBinding('class.right-active') rightActive: boolean = false;
	id: string = '';
	protected readonly unsubscribe = new Subject<void>();
	private readonly route = inject(ActivatedRoute);
	private readonly router = inject(Router);
	private readonly uiState = inject(UiStateService);
	private mode: string = 'overview';

	refresh(): void {
		if (this.tree) {
			this.tree.refresh();
		}
	}

	selectionChange(data: Jam.Folder): void {
		this.router.navigate([`/admin/folder/${data.id}/${this.mode}`])
			.catch(e => {
				console.error(e);
			});
	}

	onFolderUpdate(data: Jam.Folder): void {
		if (this.tree) {
			this.tree.onFolderUpdate(data);
		}
	}

	ngOnInit(): void {
		this.router.events
			.pipe(takeUntil(this.unsubscribe)).subscribe(event => {
			if (event instanceof NavigationEnd && this.route.firstChild && this.route.firstChild.snapshot.url[0]) {
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
				if (this.tree && id) {
					setTimeout(() => {
						if (this.tree) {
							this.tree.selectFolderByID(id);
						}
					});
				}
			});
		}
		if (this.tree) {
			this.tree.expandIDs = this.uiState.data['app-admin-folders'] || [];
		}
		this.refresh();
	}

	ngOnDestroy(): void {
		if (this.tree) {
			this.uiState.data['app-admin-folders'] = this.tree.expandIDs;
		}
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}

}
