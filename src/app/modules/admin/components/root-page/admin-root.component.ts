import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogOverlayService} from '@app/modules/dialog-overlay';
import {AdminRootService, AdminRootServiceEditData, AppService, NotifyService} from '@core/services';
import {Jam, RootScanStrategy} from '@jam';
import {DialogsService} from '@shared/services';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {DialogRootComponent} from '../dialog-root/dialog-root.component';

@Component({
	selector: 'app-admin-root',
	templateUrl: './admin-root.component.html',
	styleUrls: ['./admin-root.component.scss']
})
export class AdminRootComponent implements OnInit, OnDestroy {
	roots?: Array<Jam.Root>;
	protected unsubscribe = new Subject<void>();

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private app: AppService,
		private notify: NotifyService,
		private dialogs: DialogsService,
		private rootService: AdminRootService,
		private dialogOverlay: DialogOverlayService
	) {
	}

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
