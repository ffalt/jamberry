import { Component, inject, type OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JamAuthService } from '@jam';
import { serverErrorMsg } from '@utils/errors';
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

		const validationError = this.validateCredentials();
		if (validationError) {
			this.error = validationError;
			this.notify.error(validationError);
			return;
		}

		this.error = undefined;

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

	private validateCredentials(): string | undefined {
		// Validate server URL (if shown and required)
		if (this.showServer) {
			const serverUrl = this.credentials.server.trim();
			if (!serverUrl) {
				return 'Server URL is required';
			}
			if (serverUrl.length > 2048) {
				return 'Server URL is too long';
			}
			if (!this.isValidServerUrl(serverUrl)) {
				return 'Invalid server URL. Must start with http:// or https://';
			}
		}

		const username = this.credentials.username.trim();
		if (!username) {
			return 'Username is required';
		}
		if (username.length < 1) {
			return 'Username must be at least 1 character';
		}
		if (username.length > 255) {
			return 'Username is too long (max 255 characters)';
		}

		const password = this.credentials.password;
		if (!password) {
			return 'Password is required';
		}
		if (password.length < 1) {
			return 'Password must be at least 1 character';
		}
		if (password.length > 1000) {
			return 'Password is too long (max 1000 characters)';
		}
		return;
	}

	/**
	 * Validates that a server URL has a proper format.
	 * Only allows http:// or https:// protocols for security.
	 */
	private isValidServerUrl(url: string): boolean {
		try {
			const urlObj = new URL(url);
			// Only allow http and https protocols
			if (urlObj.protocol !== 'http:' && urlObj.protocol !== 'https:') {
				return false;
			}
			return !!urlObj.hostname;
		} catch {
			return false;
		}
	}
}
