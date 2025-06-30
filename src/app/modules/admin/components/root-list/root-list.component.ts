import {Component, inject, input} from '@angular/core';
import {DialogOverlayService} from '@app/modules/dialog-overlay';
import {AdminRootService, AdminRootServiceEditData, NotifyService} from '@core/services';
import {Jam} from '@jam';
import {DialogsService} from '@shared/services';
import {DialogRootComponent} from '../dialog-root/dialog-root.component';

@Component({
	selector: 'app-admin-root-list',
	templateUrl: './root-list.component.html',
	styleUrls: ['./root-list.component.scss'],
	standalone: false
})
export class RootListComponent {
	readonly roots = input<Array<Jam.Root> | undefined>([]);
	private readonly notify = inject(NotifyService);
	private readonly dialogs = inject(DialogsService);
	private readonly rootService = inject(AdminRootService);
	private readonly dialogOverlay = inject(DialogOverlayService);

	refreshRoot(root: Jam.Root): void {
		this.rootService.rescanRoot(root);
	}

	refreshRootMeta(root: Jam.Root): void {
		this.rootService.refreshRootMeta(root);
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
				} catch (e: any) {
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
