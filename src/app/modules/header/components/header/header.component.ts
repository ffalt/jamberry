import {Location} from '@angular/common';
import {Component} from '@angular/core';
import {MainTabsService} from '@app/modules/main-tabs/services';
import {AppService, NavigService} from '@core/services';
import {JamAuthService} from '@jam';

@Component({
	selector: 'app-header',
	templateUrl: 'header.component.html',
	styleUrls: ['header.component.scss']
})
export class HeaderComponent {

	constructor(public app: AppService, public auth: JamAuthService, private location: Location, public navig: NavigService, public tabService: MainTabsService) {
	}

	back(): void {
		this.location.back();
	}

	toggleMobileNavig(): void {
		this.tabService.switchToMain();
		if (this.app.view.currentSidebar) {
			this.app.view.currentSidebar.toggleMobileNavig();
		}
	}

}
