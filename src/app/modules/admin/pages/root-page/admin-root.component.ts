import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogOverlayService} from '@app/modules/dialog-overlay';
import {AppService, DialogsService, NotifyService} from '@core/services';
import {Jam, RootScanStrategy} from '@jam';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {RootEdit} from '../../admin.interface';
import {DialogRootComponent} from '../../components/dialog-root/dialog-root.component';
import {JamDataSource} from '../../model/data-source';
import {RootService} from '../../services/root.service';

@Component({
	selector: 'app-admin-root',
	templateUrl: 'admin-root.component.html',
	styleUrls: ['admin-root.component.scss']
})
export class AdminRootComponent implements OnInit, OnDestroy {
	roots: Array<Jam.Root>;
	dataSource: JamDataSource<Jam.Root>;
	displayedColumns: Array<string> = ['name', 'path', 'strategy', 'status', 'actions'];
	protected unsubscribe = new Subject();

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private app: AppService,
		private notify: NotifyService,
		private dialogs: DialogsService,
		private rootService: RootService,
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
				this.dataSource = new JamDataSource<Jam.Root>(this.roots, AdminRootComponent.getSortValue);
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
		const edit: RootEdit = {
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
				} catch (e) {
					this.notify.error(e);
					return Promise.reject(e);
				}
			},
			onCancelBtn: async () => Promise.resolve()
		});
	}

	editRoot(root: Jam.Root): void {
		const edit: RootEdit = {
			root,
			name: root.name,
			path: root.path,
			strategy: root.strategy as RootScanStrategy
		};
		this.dialogOverlay.open({
			title: 'Edit Root',
			childComponent: DialogRootComponent,
			data: edit,
			onOkBtn: async () => {
				try {
					await this.rootService.applyDialogRoot(edit);
				} catch (e) {
					this.notify.error(e);
					return Promise.reject(e);
				}
			},
			onCancelBtn: async () => Promise.resolve()
		});
	}

	deleteRoot(root: Jam.Root): void {
		this.dialogs.confirm('Delete Root', 'Do you want to the delete the root folder?', () => {
			this.rootService.removeRoot(root);
		});
	}

	rescan(): void {
		this.rootService.rescanRoots();
	}

	rescanRoot(root: Jam.Root): void {
		this.rootService.rescanRoot(root);
	}

}
