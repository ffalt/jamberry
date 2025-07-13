import {Injectable, inject} from '@angular/core';
import {type ActivatedRouteSnapshot, type CanActivate, Router, type RouterStateSnapshot} from '@angular/router';
import {NotifyService} from '@core/services';
import {JamAuthService} from '@jam';

@Injectable()
export class AuthCanActivateGuard implements CanActivate {
	private readonly router = inject(Router);
	private readonly auth = inject(JamAuthService);
	private readonly notify = inject(NotifyService);

	async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
		if (this.auth.checked) {
			return this.auth.isLoggedIn();
		}
		if (!this.auth.loaded) {
			await this.auth.load();
		}
		try {
			await this.auth.check();
		} catch (e: any) {
			this.notify.error(e);
			return false;
		}
		if (this.auth.auth && this.auth.auth?.version !== JamAuthService.version) {
			this.notify.info(`The Server API version ${this.auth.auth?.version} is different to the Client version ${JamAuthService.version}. Errors may happen. Good luck!`);
		}
		if (!this.auth.isLoggedIn()) {
			this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}})
				.catch(e => {
					console.error(e);
				});
			return false;
		}
		return true;
	}
}
