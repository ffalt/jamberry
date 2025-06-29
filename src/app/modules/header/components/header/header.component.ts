import {Location} from '@angular/common';
import {Component, inject} from '@angular/core';
import {ContextMenuUserComponent} from '@app/modules/header/components/context-menu-user/context-menu-user.component';
import {MainTabsService} from '@app/modules/main-tabs/services';
import {AppService, NavigService} from '@core/services';
import {JamAuthService} from '@jam';
import {MenuService} from '@shared/services';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
	standalone: false
})
export class HeaderComponent {
	searchActive: boolean = false;
	readonly app = inject(AppService);
	readonly auth = inject(JamAuthService);
	readonly navig = inject(NavigService);
	readonly tabService = inject(MainTabsService);
	private readonly location = inject(Location);
	private readonly menuService = inject(MenuService);

	back(): void {
		this.location.back();
	}

	toggleMobileNavig(): void {
		this.tabService.switchToMain();
		this.app.view.currentSidebar?.toggleMobileNavig();
	}

	onContextMenu($event: Event): void {
		this.menuService.openMenuComponent(ContextMenuUserComponent, undefined, $event);
	}

	searchStateChange(active: boolean) {
		this.searchActive = active;
	}
}
