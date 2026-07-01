import { Component, DestroyRef, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import type { Jam } from '@jam';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DialogOverlayService } from '@modules/dialog-overlay';

import { DialogUserComponent } from '../dialog-user/dialog-user.component';
import { UserListComponent } from '../user-list/user-list.component';
import { HeaderSlimComponent } from '@core/components/header-slim/header-slim.component';
import { AdminUserService, type AdminUserServiceEditData } from '@core/services/admin-user/admin-user.service';
import { NotifyService } from '@core/services/notify/notify.service';
import { IconPlusComponent } from '@core/components/icons/icon-plus.component';
import { IconReloadComponent } from '@core/components/icons/icon-reload.component';

@Component({
	selector: 'app-admin-users',
	templateUrl: './admin-users.component.html',
	styleUrls: ['./admin-users.component.scss'],
	imports: [HeaderSlimComponent, IconPlusComponent, IconReloadComponent, RouterModule, UserListComponent]
})
export class AdminUsersComponent {
	readonly users = signal<Array<Jam.User> | undefined>(undefined);
	private readonly lifeRef = inject(DestroyRef);
	private readonly notify = inject(NotifyService);
	private readonly userService = inject(AdminUserService);
	private readonly dialogOverlay = inject(DialogOverlayService);

	constructor() {
		this.userService.usersChange
			.pipe(takeUntilDestroyed(this.lifeRef))
			.subscribe({
				next: users => {
					this.users.set(users.toSorted((a, b) => a.name.localeCompare(b.name)));
				},
				error: (error: unknown) => {
					this.notify.error(error);
				}
			});
		this.userService.refreshUsers();
	}

	refresh(): void {
		this.userService.refreshUsers();
	}

	newUser(): void {
		const edit: AdminUserServiceEditData = {
			edit: {
				password: '',
				name: '',
				email: '',
				roleAdmin: false,
				rolePodcast: false,
				roleStream: true,
				roleUpload: false
			}
		};
		this.dialogOverlay.open<AdminUserServiceEditData>({
			childComponent: DialogUserComponent,
			title: 'New User',
			data: edit,
			onOkBtn: async () => {
				try {
					await this.userService.applyDialogUser(edit);
					this.notify.success('User created');
				} catch (error) {
					this.notify.error(error);
					return Promise.reject(error);
				}
			},
			onCancelBtn: async () => Promise.resolve()
		});
	}
}
