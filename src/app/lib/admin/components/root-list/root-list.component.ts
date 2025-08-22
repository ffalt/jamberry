import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import type { Jam } from '@jam';
import { DialogOverlayService } from '@modules/dialog-overlay';
import { DialogRootComponent } from '../dialog-root/dialog-root.component';
import { ClickStopDirective } from '@core/directives/click-stop.directive';
import { FocusKeyListItemDirective } from '@core/directives/focus-key-list-item.directive';
import { FocusKeyListDirective } from '@core/directives/focus-key-list.directive';
import { DialogsService } from '@core/services/dialogs/dialogs.service';
import { BackgroundTextListComponent } from '@core/components/background-text-list/background-text-list.component';
import { NotifyService } from '@core/services/notify/notify.service';
import { AdminRootService, type AdminRootServiceEditData } from '@core/services/admin-root/admin-root.service';

@Component({
	selector: 'app-admin-root-list',
	templateUrl: './root-list.component.html',
	styleUrls: ['./root-list.component.scss'],
	imports: [CommonModule, ClickStopDirective, FocusKeyListItemDirective, FocusKeyListDirective, BackgroundTextListComponent]
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
		this.dialogOverlay.open<AdminRootServiceEditData>({
			childComponent: DialogRootComponent,
			title: 'Edit Root',
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

	deleteRoot(root: Jam.Root): void {
		this.dialogs.confirm('Delete Root', 'Do you want to the delete the root folder?', () => {
			this.rootService.removeRoot(root);
		});
	}
}
