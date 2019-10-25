import {Location} from '@angular/common';
import {Component} from '@angular/core';
import {ContextMenuService} from '@app/modules/context-menu';
import {MainTabsService} from '@app/modules/main-tabs/services';
import {AppService, NavigService} from '@core/services';
import {JamAuthService} from '@jam';
import {ContextMenuUserComponent} from '../context-menu-user/context-menu-user.component';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

	constructor(
		public app: AppService, private location: Location, public auth: JamAuthService,
		public navig: NavigService, public tabService: MainTabsService,
		private contextMenuService: ContextMenuService
	) {
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

	onUserContextMenu(event: MouseEvent): void {
		this.contextMenuService.open(ContextMenuUserComponent, undefined, event);
	}

}
