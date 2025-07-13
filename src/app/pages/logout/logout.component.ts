import {Component, inject, type OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {AppService} from '@core/services';
import {JamAuthService} from '@jam';

@Component({
	selector: 'app-logout',
	templateUrl: './logout.component.html',
	styleUrls: ['./logout.component.scss'],
	standalone: false
})
export class LogoutComponent implements OnInit {
	readonly app = inject(AppService);
	private readonly router = inject(Router);
	private readonly auth = inject(JamAuthService);

	ngOnInit(): void {
		this.logout().catch(console.error);
	}

	private async logout(): Promise<void> {
		if (this.auth.isLoggedIn()) {
			await this.auth.logout();
		}
		await this.router.navigate(['/login']);
	}
}
