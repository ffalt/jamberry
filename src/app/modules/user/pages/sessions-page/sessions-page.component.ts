import {Component, OnInit} from '@angular/core';
import {DialogOverlayService} from '@app/modules/dialog-overlay';
import {NotifyService} from '@core/services';
import {Jam, JamAuthService, JamService} from '@jam';
import {DialogPasswordComponent, PasswordEdit} from '@shared/components';

@Component({
    selector: 'app-sessions-page',
    templateUrl: './sessions-page.component.html',
    styleUrls: ['./sessions-page.component.scss'],
    standalone: false
})
export class SessionsPageComponent implements OnInit {
	sessions?: Array<{ session: Jam.UserSession; isExpired: boolean; }>;
	isUnlocked: boolean = false;
	lock: PasswordEdit = {pass: ''};
	subsonicToken?: Jam.SubsonicToken;

	constructor(private jam: JamService, private auth: JamAuthService, private notify: NotifyService, private dialogOverlay: DialogOverlayService) {
	}

	generateSubsonicToken(): void {
		if (!this.isUnlocked || !this.auth.user) {
			return;
		}
		this.jam.user.generateSubsonicToken({id: this.auth.user.id, password: this.lock.pass})
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
				this.isUnlocked = true;
			},
			onCancelBtn: async () => Promise.resolve()
		});
	}

	ngOnInit(): void {
		if (this.auth.isLoggedIn()) {
			this.refresh();
		}
	}

	remove(session: Jam.UserSession): void {
		const id = session.id;
		this.jam.session.remove({id})
			.then(() => {
				if (this.sessions) {
					this.sessions = this.sessions.filter(s => s.session.id !== id);
				}
				this.notify.success('Session Login removed');
			})
			.catch(e => {
				this.notify.error(e);
			});
	}

	refresh(): void {
		this.jam.session.list()
			.then(list => {
				this.sessions = list.map(session => ({session, isExpired: ((session.expires !== undefined) && (session.expires < Date.now()))}));
			})
			.catch(e => {
				this.notify.error(e);
			});
	}
}
