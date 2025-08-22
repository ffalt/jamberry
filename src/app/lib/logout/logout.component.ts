import { Component, inject, type OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JamAuthService } from '@jam';
import { AppService } from '@core/services/app/app.service';

@Component({
	selector: 'app-logout',
	templateUrl: './logout.component.html',
	styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
	readonly app = inject(AppService);
	private readonly router = inject(Router);
	private readonly auth = inject(JamAuthService);

	ngOnInit(): void {
		this.logout().catch((error: unknown) => {
			console.error(error);
		});
	}

	private async logout(): Promise<void> {
		if (this.auth.isLoggedIn()) {
			await this.auth.logout();
		}
		await this.router.navigate(['/login']);
	}
}
