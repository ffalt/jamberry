import {Component, type OnDestroy, type OnInit, inject} from '@angular/core';
import {DialogOverlayService} from '@app/modules/dialog-overlay';
import {AdminUserService, type AdminUserServiceEditData, NotifyService} from '@core/services';
import type {Jam} from '@jam';
import {Subject, takeUntil} from 'rxjs';
import {DialogUserComponent} from '../dialog-user/dialog-user.component';

@Component({
	selector: 'app-admin-users',
	templateUrl: './admin-users.component.html',
	styleUrls: ['./admin-users.component.scss'],
	standalone: false
})
export class AdminUsersComponent implements OnInit, OnDestroy {
	users?: Array<Jam.User>;
	private readonly unsubscribe = new Subject<void>();
	private readonly notify = inject(NotifyService);
	private readonly userService = inject(AdminUserService);
	private readonly dialogOverlay = inject(DialogOverlayService);

	getSortValue(column: string, user: Jam.User): string | number | undefined {
		switch (column) {
			case 'name': {
				return user.name;
			}
			case 'email': {
				return user.email;
			}
			case 'roleAdmin': {
				return user.roles.admin ? 1 : 0;
			}
			case 'rolePodcast': {
				return user.roles.podcast ? 1 : 0;
			}
			case 'roleUpload': {
				return user.roles.upload ? 1 : 0;
			}
			case 'roleStream': {
				return user.roles.stream ? 1 : 0;
			}
			default: {
				return;
			}
		}
	}

	ngOnInit(): void {
		this.userService.usersChange
			.pipe(takeUntil(this.unsubscribe))
			.subscribe({
				next: users => {
					this.users = (users || []).sort((a, b) => a.name.localeCompare(b.name));
				},
				error: error => this.notify.error(error)
			});
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
				} catch (error) {
					this.notify.error(error);
					return Promise.reject(error);
				}
			},
			onCancelBtn: async () => Promise.resolve()
		});
	}
}
