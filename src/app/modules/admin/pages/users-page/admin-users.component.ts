import {Component, OnDestroy, OnInit} from '@angular/core';
import {DialogOverlayService} from '@app/modules/dialog-overlay';
import {AdminUserService, AdminUserServiceEditData, AppService, DialogsService, NotifyService} from '@core/services';
import {Jam, JamService} from '@jam';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {DialogAvatarComponent} from '../../components/dialog-avatar/dialog-avatar.component';
import {DialogUserPassComponent, UserPasswordEdit} from '../../components/dialog-user-pass/dialog-user-pass.component';
import {DialogUserComponent} from '../../components/dialog-user/dialog-user.component';
import {JamDataSource} from '../../model/data-source';

@Component({
	selector: 'app-admin-users',
	templateUrl: 'admin-users.component.html',
	styleUrls: ['admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit, OnDestroy {
	users: Array<Jam.User>;
	dataSource: JamDataSource<Jam.User>;
	displayedColumns: Array<string> = ['id', 'name', 'email', 'roleAdmin', 'rolePodcast', 'roleUpload', 'roleStream', 'actions'];
	protected unsubscribe = new Subject();

	constructor(
		private app: AppService,
		private dialogs: DialogsService,
		private jam: JamService,
		private notify: NotifyService,
		private userService: AdminUserService,
		private dialogOverlay: DialogOverlayService
	) {
	}

	getSortValue(column: string, user: Jam.User): string | number | undefined {
		switch (column) {
			case 'name':
				return user.name;
			case 'email':
				return user.email;
			case 'roleAdmin':
				return user.roles.admin ? 1 : 0;
			case 'rolePodcast':
				return user.roles.podcast ? 1 : 0;
			case 'roleUpload':
				return user.roles.upload ? 1 : 0;
			case 'roleStream':
				return user.roles.stream ? 1 : 0;
			default:
				return;
		}
	}

	ngOnInit(): void {
		this.userService.usersChange
			.pipe(takeUntil(this.unsubscribe)).subscribe(users => {
				this.users = (users || []).sort((a, b) => a.name.localeCompare(b.name));
				this.dataSource = new JamDataSource<Jam.User>(this.users, this.getSortValue.bind(this));
			},
			e => {
				this.notify.error(e);
			}
		);
		this.userService.refreshUsers();
	}

	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}

	refresh(): void {
		this.userService.refreshUsers();
	}

	newUser(): void {
		const edit: AdminUserServiceEditData = {
			edit: {
				password: '',
				id: '',
				name: '',
				email: '',
				roleAdmin: false,
				rolePodcast: false,
				roleStream: true,
				roleUpload: false
			}
		};
		this.dialogOverlay.open({
			title: 'New User',
			childComponent: DialogUserComponent,
			data: edit,
			onOkBtn: async () => {
				try {
					await this.userService.applyDialogUser(edit);
					this.notify.success('User created');
				} catch (e) {
					this.notify.error(e);
					return Promise.reject(e);
				}
			},
			onCancelBtn: () => Promise.resolve()
		});
	}

	editUser(user: Jam.User): void {
		const edit: AdminUserServiceEditData = {
			user,
			edit: {
				password: '',
				id: user.id,
				name: user.name,
				email: user.email,
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
				} catch (e) {
					this.notify.error(e);
					return Promise.reject(e);
				}
			},
			onCancelBtn: () => Promise.resolve()
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
				} catch (e) {
					this.notify.error(e);
					return Promise.reject(e);
				}
			},
			onCancelBtn: () => Promise.resolve()
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
