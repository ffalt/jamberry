import {Component, type OnDestroy, inject, input} from '@angular/core';
import {DialogOverlayService} from '@app/modules/dialog-overlay';
import {AdminUserService, type AdminUserServiceEditData, NotifyService} from '@core/services';
import type {Jam} from '@jam';
import {DialogsService} from '@shared/services';
import {Subject, takeUntil} from 'rxjs';
import {DialogAvatarComponent} from '../dialog-avatar/dialog-avatar.component';
import {DialogUserPassComponent, type UserPasswordEdit} from '../dialog-user-pass/dialog-user-pass.component';
import {DialogUserComponent} from '../dialog-user/dialog-user.component';

@Component({
	selector: 'app-admin-user-list',
	templateUrl: './user-list.component.html',
	styleUrls: ['./user-list.component.scss'],
	standalone: false
})
export class UserListComponent implements OnDestroy {
	readonly users = input<Array<Jam.User> | undefined>([]);
	private readonly unsubscribe = new Subject<void>();
	private readonly notify = inject(NotifyService);
	private readonly dialogs = inject(DialogsService);
	private readonly userService = inject(AdminUserService);
	private readonly dialogOverlay = inject(DialogOverlayService);

	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}

	editUser(user: Jam.User): void {
		const edit: AdminUserServiceEditData = {
			user,
			edit: {
				password: '',
				name: user.name,
				email: user.email ?? '',
				roleAdmin: user.roles.admin,
				rolePodcast: user.roles.podcast,
				roleStream: user.roles.stream,
				roleUpload: user.roles.upload
			}
		};
		this.dialogOverlay.open({
			childComponent: DialogUserComponent,
			title: 'Edit User',
			data: edit,
			onOkBtn: async () => {
				try {
					await this.userService.applyDialogUser(edit);
					this.notify.success('User edited');
				} catch (error) {
					this.notify.error(error);
					return Promise.reject(error);
				}
			},
			onCancelBtn: async () => Promise.resolve()
		});

	}

	editUserAvatar(user: Jam.User): void {
		this.dialogOverlay.open({
			childComponent: DialogAvatarComponent,
			title: 'Edit User Avatar',
			data: user
		}).afterClosed()
			.pipe(takeUntil(this.unsubscribe)).subscribe(() => {
			this.userService.refreshUser(user.id);
		});
	}

	setUserPassword(user: Jam.User): void {
		const edit: UserPasswordEdit = {user, password: '', newPassword: ''};
		this.dialogOverlay.open({
			childComponent: DialogUserPassComponent,
			title: 'Set User Password',
			data: edit,
			onOkBtn: async () => {
				try {
					await this.userService.setPassword(user.id, edit.password, edit.newPassword);
					this.notify.success('Password changed');
				} catch (error) {
					this.notify.error(error);
					return Promise.reject(error);
				}
			},
			onCancelBtn: async () => Promise.resolve()
		});
	}

	deleteUser(user: Jam.User): void {
		this.dialogs.confirm('Delete User', 'Do you want to the delete the user?', () => {
			this.userService.removeUser(user)
				.then(() => this.notify.success('User deleted'))
				.catch(error => this.notify.error(error));
		});
	}
}
