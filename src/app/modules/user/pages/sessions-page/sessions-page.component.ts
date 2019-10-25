import {Component, OnInit} from '@angular/core';

import {DialogOverlayService} from '@app/modules/dialog-overlay';
import {NotifyService} from '@core/services';
import {Jam, JamAuthService, JamService} from '@jam';
import {DialogPasswordComponent, PasswordEdit} from '@shared/components';

@Component({
	selector: 'app-sessions-page',
	templateUrl: './sessions-page.component.html',
	styleUrls: ['./sessions-page.component.scss']
})
export class SessionsPageComponent implements OnInit {
	sessions: Array<Jam.UserSession>;
	isUnlocked: boolean = false;
	lock: PasswordEdit = {pass: ''};
	subsonicToken: Jam.SubsonicToken;

	constructor(private jam: JamService, private auth: JamAuthService, private notify: NotifyService, private dialogOverlay: DialogOverlayService) {
	}

	ngOnInit(): void {
		if (this.auth.isLoggedIn()) {
			this.refresh();
		}
	}

	remove(session: Jam.UserSession): void {
		const id = session.id;
		this.jam.user.sessions_delete({id})
			.then(() => {
				this.sessions = this.sessions.filter(s => s.id !== id);
				this.notify.success('Session Login removed');
			})
			.catch(e => {
				this.notify.error(e);
			});
	}

	refresh(): void {
		this.jam.user.sessions_list()
			.then(list => {
				this.sessions = list;
			})
			.catch(e => {
				this.notify.error(e);
			});
	}

	generateSubsonicToken(): void {
		if (!this.isUnlocked) {
			return;
		}
		this.jam.user.sessions_subsonic_generate({id: this.auth.user.id, password: this.lock.pass})
			.then(token => {
				this.subsonicToken = token;
				this.isUnlocked = true;
				this.refresh();
				this.notify.success('Token generated');
			})
			.catch(e => {
				this.subsonicToken = undefined;
				this.isUnlocked = false;
				this.notify.error(e);
			});
	}

	unlockSubsonicToken(): void {
		this.dialogOverlay.open({
			childComponent: DialogPasswordComponent,
			data: this.lock,
			onOkBtn: async () => {
				try {
					this.subsonicToken = await this.jam.user.sessions_subsonic_view({id: this.auth.user.id, password: this.lock.pass});
					this.isUnlocked = true;
				} catch (e) {
					this.subsonicToken = undefined;
					this.isUnlocked = false;
					this.notify.error(e);
					return Promise.reject(e);
				}
			},
			onCancelBtn: async () => Promise.resolve()
		});
	}
}
