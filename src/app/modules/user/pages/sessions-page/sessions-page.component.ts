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

}
