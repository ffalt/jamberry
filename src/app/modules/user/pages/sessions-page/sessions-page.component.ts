import {Component, OnInit} from '@angular/core';
import {NotifyService} from '@core/services';
import {Jam, JamAuthService, JamService} from '@jam';

@Component({
	selector: 'app-sessions-page',
	templateUrl: './sessions-page.component.html',
	styleUrls: ['./sessions-page.component.scss']
})
export class SessionsPageComponent implements OnInit {
	sessions?: Array<Jam.UserSession>;

	constructor(private jam: JamService, private auth: JamAuthService, private notify: NotifyService) {
	}

	trackByFn(index: number, value: Jam.UserSession): string {
		return value.id;
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
					this.sessions = this.sessions.filter(s => s.id !== id);
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
				this.sessions = list;
			})
			.catch(e => {
				this.notify.error(e);
			});
	}

}
