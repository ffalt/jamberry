import {EventEmitter, Injectable} from '@angular/core';
import {Notifiers} from '@app/utils/notifier';
import {NotifyService} from '@core/services';
import {Jam, JamParameters, JamService} from '@jam';
import {UserEdit} from '../admin.interface';

@Injectable()
export class UserService {
	usersChange = new EventEmitter<Array<Jam.User>>();
	userChange = new Notifiers<Jam.User>();
	private users: Array<Jam.User>;

	constructor(private jam: JamService, private notify: NotifyService) {
	}

	async applyDialogUser(edit: UserEdit): Promise<void> {
		if (edit.user) {
			await this.jam.user.update(edit.edit);
			this.refreshUser(edit.user.id);
		} else {
			const params = edit.edit as JamParameters.UserNew;
			const user = await this.jam.user.create(params);
			this.users.push(user);
			this.usersChange.emit(this.users);
		}
	}

	async removeUser(user: Jam.User): Promise<void> {
		await this.jam.user.delete({id: user.id});
		this.users = this.users.filter(r => r.id !== user.id);
		this.usersChange.emit(this.users);
		this.userChange.emit(user.id, undefined);
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
		return this.jam.user.password_update({id: userID, password, newPassword});
	}
}
