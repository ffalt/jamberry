import { CommonModule } from '@angular/common';
import { Component, inject, type OnInit, signal } from '@angular/core';
import { type Jam, JamAuthService, JamService } from '@jam';
import { DialogOverlayService } from '@modules/dialog-overlay';
import { DialogPasswordComponent, type PasswordEdit } from '@core/components/dialog-password/dialog-password.component';
import { HeaderSlimComponent } from '@core/components/header-slim/header-slim.component';
import { NotifyService } from '@core/services/notify/notify.service';
import { IconRemoveComponent } from '@core/components/icons/icon-remove.component';

@Component({
	selector: 'app-sessions-page',
	templateUrl: './sessions-page.component.html',
	styleUrls: ['./sessions-page.component.scss'],
	imports: [CommonModule, HeaderSlimComponent, IconRemoveComponent]
})
export class SessionsPageComponent implements OnInit {
	readonly sessions = signal<Array<{ session: Jam.UserSession; isExpired: boolean }> | undefined>(undefined);
	readonly isUnlocked = signal(false);
	readonly subsonicToken = signal<Jam.SubsonicToken | undefined>(undefined);
	lock: PasswordEdit = { pass: '' };
	private readonly jam = inject(JamService);
	private readonly auth = inject(JamAuthService);
	private readonly dialogOverlay = inject(DialogOverlayService);
	private readonly notify = inject(NotifyService);

	generateSubsonicToken(): void {
		if (!this.isUnlocked() || !this.auth.user) {
			return;
		}
		this.jam.user.generateSubsonicToken({ id: this.auth.user.id, password: this.lock.pass })
			.then(token => {
				this.subsonicToken.set(token);
				this.isUnlocked.set(true);
				this.refresh();
				this.notify.success('Token generated');
			})
			.catch((error: unknown) => {
				this.subsonicToken.set(undefined);
				this.isUnlocked.set(false);
				this.notify.error(error);
			});
	}

	unlockSubsonicToken(): void {
		this.dialogOverlay.open<PasswordEdit>({
			childComponent: DialogPasswordComponent,
			data: this.lock,
			onOkBtn: async () => {
				this.isUnlocked.set(true);
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
				this.sessions.update(list => list?.filter(s => s.session.id !== id));
				this.notify.success('Session Login removed');
			})
			.catch((error: unknown) => {
				this.notify.error(error);
			});
	}

	refresh(): void {
		this.jam.session.list()
			.then(list => {
				this.sessions.set(list.map(session => ({ session, isExpired: ((session.expires !== undefined) && (session.expires < Date.now())) })));
			})
			.catch((error: unknown) => {
				this.notify.error(error);
			});
	}
}
