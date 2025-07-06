import {EventEmitter, Injectable, inject} from '@angular/core';
import {Notifiers} from '@app/utils/notifier';
import {Jam, JamParameters, JamService} from '@jam';
import {NotifyService} from '../notify/notify.service';

export interface AdminUserServiceEditData {
	user?: Jam.User;
	edit: JamParameters.UserMutateArgs;
}

@Injectable({
	providedIn: 'root'
})
export class AdminUserService {
	usersChange = new EventEmitter<Array<Jam.User>>();
	userChange = new Notifiers<Jam.User>();
	private users: Array<Jam.User> = [];
	private readonly jam = inject(JamService);
	private readonly notify = inject(NotifyService);

	async applyDialogUser(edit: AdminUserServiceEditData): Promise<void> {
		if (edit.user) {
			await this.jam.user.update({id: edit.user.id, ...edit.edit});
			this.refreshUser(edit.user.id);
		} else {
			const user = await this.jam.user.create(edit.edit);
			this.users.push(user);
			this.usersChange.emit(this.users);
		}
	}

	async removeUser(user: Jam.User): Promise<void> {
		await this.jam.user.remove({id: user.id});
		this.users = this.users.filter(r => r.id !== user.id);
		this.usersChange.emit(this.users);
		this.userChange.emit(user.id);
	}

	refreshUser(id: string): void {
		this.jam.user.id({id})
			.then(user => {
				const index = this.users.findIndex(u => u.id === id);
				if (index < 0) {
					this.users.push(user);
				} else {
					this.users[index] = user;
				}
				this.usersChange.emit(this.users);
				this.userChange.emit(id, user);
			})
			.catch(e => {
				this.notify.error(e);
			});
	}

	refreshUsers(): void {
		this.jam.user.search({})
			.then(data => {
				this.users = data.items;
				this.usersChange.emit(this.users);
			})
			.catch(e => {
				this.notify.error(e);
			});
	}

	async setPassword(userID: string, password: string, newPassword: string): Promise<void> {
		return this.jam.user.changePassword({id: userID, password, newPassword});
	}
}
