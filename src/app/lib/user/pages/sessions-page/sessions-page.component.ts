import { CommonModule } from '@angular/common';
import { Component, inject, type OnInit } from '@angular/core';
import { type Jam, JamAuthService, JamService } from '@jam';
import { DialogOverlayService } from '@modules/dialog-overlay';
import { DialogPasswordComponent, type PasswordEdit } from '@core/components/dialog-password/dialog-password.component';
import { HeaderSlimComponent } from '@core/components/header-slim/header-slim.component';
import { NotifyService } from '@core/services/notify/notify.service';

@Component({
	selector: 'app-sessions-page',
	templateUrl: './sessions-page.component.html',
	styleUrls: ['./sessions-page.component.scss'],
	imports: [CommonModule, HeaderSlimComponent]
})
export class SessionsPageComponent implements OnInit {
	sessions?: Array<{ session: Jam.UserSession; isExpired: boolean }>;
	isUnlocked: boolean = false;
	lock: PasswordEdit = { pass: '' };
	subsonicToken?: Jam.SubsonicToken;
	private readonly jam = inject(JamService);
	private readonly auth = inject(JamAuthService);
	private readonly dialogOverlay = inject(DialogOverlayService);
	private readonly notify = inject(NotifyService);

	generateSubsonicToken(): void {
		if (!this.isUnlocked || !this.auth.user) {
			return;
		}
		this.jam.user.generateSubsonicToken({ id: this.auth.user.id, password: this.lock.pass })
			.then(token => {
				this.subsonicToken = token;
				this.isUnlocked = true;
				this.refresh();
				this.notify.success('Token generated');
			})
			.catch((error: unknown) => {
				this.subsonicToken = undefined;
				this.isUnlocked = false;
				this.notify.error(error);
			});
	}

	unlockSubsonicToken(): void {
		this.dialogOverlay.open<PasswordEdit>({
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
		this.jam.session.remove({ id })
			.then(() => {
				if (this.sessions) {
					this.sessions = this.sessions.filter(s => s.session.id !== id);
				}
				this.notify.success('Session Login removed');
			})
			.catch((error: unknown) => {
				this.notify.error(error);
			});
	}

	refresh(): void {
		this.jam.session.list()
			.then(list => {
				this.sessions = list.map(session => ({ session, isExpired: ((session.expires !== undefined) && (session.expires < Date.now())) }));
			})
			.catch((error: unknown) => {
				this.notify.error(error);
			});
	}
}
