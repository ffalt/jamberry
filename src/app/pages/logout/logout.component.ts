import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {AppService} from '@core/services';
import {JamAuthService} from '@jam';

@Component({
	selector: 'app-logout',
	templateUrl: 'logout.component.html',
	styleUrls: ['logout.component.scss']
})
export class LogoutComponent {

	constructor(private router: Router, private auth: JamAuthService, public app: AppService) {
		this.logout().catch(e => {
			console.error(e);
		});
	}

	private async logout(): Promise<void> {
		if (this.auth.isLoggedIn()) {
			await this.auth.logout();
		}
		await this.router.navigate(['/login']);
	}
}
