import {Component, type OnInit, inject} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {AppService, NotifyService, serverErrorMsg} from '@core/services';
import {JamAuthService} from '@jam';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
	standalone: false
})
export class LoginComponent implements OnInit {
	credentials = {
		server: '',
		username: '',
		password: ''
	};
	showServer = false;
	error?: string;
	returnUrl?: string;
	readonly app = inject(AppService);
	private readonly route = inject(ActivatedRoute);
	private readonly router = inject(Router);
	private readonly auth = inject(JamAuthService);
	private readonly notify = inject(NotifyService);

	constructor() {
		this.init();
	}

	init() {
		const fixed = this.getFixed();
		if (fixed) {
			this.credentials.server = fixed.server ?? '';
			this.credentials.username = fixed.user ?? '';
			this.credentials.password = fixed.pass ?? '';
			this.showServer = this.credentials.server === '';
		}
		this.auth.clear().catch(console.error);
	}

	getFixed(): { server?: string; user?: string; pass?: string } {
		const conf: { fixed: { server: string; user: string; pass: string } } = (document as any).jamberry_config;
		return conf?.fixed ?? {};
	}

	ngOnInit(): void {
		this.returnUrl = decodeURIComponent(this.route.snapshot.queryParams.returnUrl ?? '/library');
	}

	login(event: Event): void {
		event.preventDefault();
		this.auth.login(this.credentials.server, this.credentials.username, this.credentials.password)
			.then(() => {
				this.router.navigateByUrl(this.returnUrl ?? '/library')
					.catch(e => {
						console.error(e);
					});
			})
			.catch(err => {
				this.notify.error(err);
				this.error = serverErrorMsg(err);
			});
	}
}
