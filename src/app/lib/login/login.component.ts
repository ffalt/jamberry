import { Component, inject, type OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JamAuthService } from '@jam';
import { serverErrorMsg } from '../../utils/errors';
import { FormsModule } from '@angular/forms';
import { LogoIconComponent } from '@core/components/logo-icon/logo-icon.component';
import { AppService } from '@core/services/app/app.service';
import { NotifyService } from '@core/services/notify/notify.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
	imports: [FormsModule, LogoIconComponent]
})
export class LoginComponent implements OnInit {
	readonly app = inject(AppService);
	credentials = {
		server: '',
		username: '',
		password: ''
	};

	showServer = false;
	error?: string;
	returnUrl?: string;
	private readonly route = inject(ActivatedRoute);
	private readonly router = inject(Router);
	private readonly auth = inject(JamAuthService);
	private readonly notify = inject(NotifyService);

	constructor() {
		this.init();
	}

	init() {
		const fixed = this.getFixed();
		this.credentials.server = fixed.server ?? '';
		this.credentials.username = fixed.user ?? '';
		this.credentials.password = fixed.pass ?? '';
		this.showServer = this.credentials.server === '';
		this.auth.clear().catch((error: unknown) => {
			console.error(error);
		});
	}

	getFixed(): { server?: string; user?: string; pass?: string } {
		return document.jamberry_config?.fixed ?? {};
	}

	ngOnInit(): void {
		this.returnUrl = decodeURIComponent(this.returnUrlFromRoute() ?? '/library');
	}

	returnUrlFromRoute(): string | undefined {
		return this.route.snapshot.queryParams.returnUrl as string | undefined;
	}

	login(event: Event): void {
		event.preventDefault();
		this.auth.login(this.credentials.server, this.credentials.username, this.credentials.password)
			.then(() => {
				this.router.navigateByUrl(this.returnUrl ?? '/library')
					.catch((error: unknown) => {
						console.error(error);
					});
			})
			.catch((error: unknown) => {
				this.notify.error(error);
				this.error = serverErrorMsg(error);
			});
	}
}
