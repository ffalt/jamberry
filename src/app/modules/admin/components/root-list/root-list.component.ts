import {Component, Input} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogOverlayService} from '@app/modules/dialog-overlay';
import {AdminRootService, AdminRootServiceEditData, AppService, NotifyService} from '@core/services';
import {Jam} from '@jam';
import {DialogsService} from '@shared/services';
import {DialogRootComponent} from '../dialog-root/dialog-root.component';

@Component({
	selector: 'app-admin-root-list',
	templateUrl: './root-list.component.html',
	styleUrls: ['./root-list.component.scss']
})
export class RootListComponent {
	@Input() roots?: Array<Jam.Root> = [];

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

	refreshRoot(root: Jam.Root): void {
		this.rootService.rescanRoot(root);
	}

	editRoot(root: Jam.Root): void {
		const edit: AdminRootServiceEditData = {
			root,
			name: root.name,
			path: root.path,
			strategy: root.strategy
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

}
