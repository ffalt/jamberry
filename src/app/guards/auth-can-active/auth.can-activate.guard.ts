import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {NotifyService} from '@core/services';
import {JamAuthService} from '@jam';

@Injectable()
export class AuthCanActivateGuard implements CanActivate {

	constructor(private readonly router: Router, private readonly auth: JamAuthService, private notify: NotifyService) {
	}

	async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
		if (this.auth.checked) {
			return this.auth.isLoggedIn();
		}
		if (!this.auth.loaded) {
			await this.auth.load();
		}
		try {
			await this.auth.check();
		} catch (e) {
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
