import { CommonModule } from '@angular/common';
import { Component, inject, type OnDestroy, type OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { type Jam, RootScanStrategy } from '@jam';
import { Subject, takeUntil } from 'rxjs';
import { DialogOverlayService } from '@modules/dialog-overlay';
import { DialogRootComponent } from '../dialog-root/dialog-root.component';
import { RootListComponent } from '../root-list/root-list.component';
import { HeaderSlimComponent } from '@core/components/header-slim/header-slim.component';
import { AdminRootService, type AdminRootServiceEditData } from '@core/services/admin-root/admin-root.service';
import { NotifyService } from '@core/services/notify/notify.service';

@Component({
	selector: 'app-admin-root',
	templateUrl: './admin-root.component.html',
	styleUrls: ['./admin-root.component.scss'],
	imports: [CommonModule, RouterModule, RootListComponent, HeaderSlimComponent]
})
export class AdminRootComponent implements OnInit, OnDestroy {
	roots?: Array<Jam.Root>;
	private readonly unsubscribe = new Subject<void>();
	private readonly notify = inject(NotifyService);
	private readonly rootService = inject(AdminRootService);
	private readonly dialogOverlay = inject(DialogOverlayService);

	static getSortValue(column: string, root: Jam.Root): string | number | undefined {
		switch (column) {
			case 'name': {
				return root.name;
			}
			case 'path': {
				return root.path;
			}
			default: {
				return;
			}
		}
	}

	ngOnInit(): void {
		this.rootService.rootsChange
			.pipe(takeUntil(this.unsubscribe))
			.subscribe({
				next: roots => {
					this.roots = roots.sort((a, b) => a.name.localeCompare(b.name));
				},
				error: error => {
					this.notify.error(error);
				}
			});
		this.rootService.refreshRoots();
	}

	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}

	refresh(): void {
		this.rootService.refreshRoots();
	}

	newRoot(): void {
		const edit: AdminRootServiceEditData = {
			name: '',
			path: '',
			strategy: RootScanStrategy.auto
		};
		this.dialogOverlay.open<AdminRootServiceEditData>({
			childComponent: DialogRootComponent,
			title: 'New Root',
			data: edit,
			onOkBtn: async () => {
				try {
					await this.rootService.applyDialogRoot(edit);
				} catch (error) {
					this.notify.error(error);
					return Promise.reject(error);
				}
			},
			onCancelBtn: async () => Promise.resolve()
		});
	}

	refreshRoots(): void {
		this.rootService.rescanRoots();
	}
}
