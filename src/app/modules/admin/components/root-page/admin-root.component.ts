import {Component, OnDestroy, OnInit, inject} from '@angular/core';
import {DialogOverlayService} from '@app/modules/dialog-overlay';
import {AdminRootService, AdminRootServiceEditData, NotifyService} from '@core/services';
import {Jam, RootScanStrategy} from '@jam';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {DialogRootComponent} from '../dialog-root/dialog-root.component';

@Component({
	selector: 'app-admin-root',
	templateUrl: './admin-root.component.html',
	styleUrls: ['./admin-root.component.scss'],
	standalone: false
})
export class AdminRootComponent implements OnInit, OnDestroy {
	roots?: Array<Jam.Root>;
	private readonly unsubscribe = new Subject<void>();
	private readonly notify = inject(NotifyService);
	private readonly rootService = inject(AdminRootService);
	private readonly dialogOverlay = inject(DialogOverlayService);

	static getSortValue(column: string, root: Jam.Root): string | number | undefined {
		switch (column) {
			case 'name':
				return root.name;
			case 'path':
				return root.path;
			default:
				return;
		}
	}

	ngOnInit(): void {
		this.rootService.rootsChange
			.pipe(takeUntil(this.unsubscribe)).subscribe(
			roots => {
				this.roots = (roots || []).sort((a, b) => a.name.localeCompare(b.name));
			},
			e => {
				this.notify.error(e);
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
		this.dialogOverlay.open({
			title: 'New Root',
			childComponent: DialogRootComponent,
			data: edit,
			onOkBtn: async () => {
				try {
					await this.rootService.applyDialogRoot(edit);
				} catch (e: any) {
					this.notify.error(e);
					return Promise.reject(e);
				}
			},
			onCancelBtn: async () => Promise.resolve()
		});
	}

	refreshRoots(): void {
		this.rootService.rescanRoots();
	}

}
