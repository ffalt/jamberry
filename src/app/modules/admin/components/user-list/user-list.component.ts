import {Component, Input, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogOverlayService} from '@app/modules/dialog-overlay';
import {AdminUserService, AdminUserServiceEditData, AppService, NotifyService} from '@core/services';
import {Jam} from '@jam';
import {DialogsService} from '@shared/services';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {DialogAvatarComponent} from '../dialog-avatar/dialog-avatar.component';
import {DialogUserPassComponent, UserPasswordEdit} from '../dialog-user-pass/dialog-user-pass.component';
import {DialogUserComponent} from '../dialog-user/dialog-user.component';

@Component({
	selector: 'app-admin-user-list',
	templateUrl: './user-list.component.html',
	styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnDestroy {
	@Input() users?: Array<Jam.User> = [];
	protected unsubscribe = new Subject<void>();

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private app: AppService,
		private notify: NotifyService,
		private dialogs: DialogsService,
		private userService: AdminUserService,
		private dialogOverlay: DialogOverlayService
	) {
	}

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
				email: user.email || '',
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
				} catch (e: any) {
					this.notify.error(e);
					return Promise.reject(e);
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
				} catch (e: any) {
					this.notify.error(e);
					return Promise.reject(e);
				}
			},
			onCancelBtn: async () => Promise.resolve()
		});
	}

	deleteUser(user: Jam.User): void {
		this.dialogs.confirm('Delete User', 'Do you want to the delete the user?', () => {
			this.userService.removeUser(user)
				.then(() => {
					this.notify.success('User deleted');
				})
				.catch(e => {
					this.notify.error(e);
				});
		});
	}
}
