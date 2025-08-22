import { Location as AngularLocation } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JamAuthService } from '@jam';
import { MainTabsService } from '../../../main-tabs/services/main-tabs.service';
import { ContextMenuUserComponent } from '../context-menu-user/context-menu-user.component';
import { SearchBoxComponent } from '../search-box/search-box.component';
import { MenuService } from '@core/services/contextmenu/menu.service';
import { LogoIconComponent } from '@core/components/logo-icon/logo-icon.component';
import { CoverartImageComponent } from '@core/components/coverart-image/coverart-image.component';
import { AppService } from '@core/services/app/app.service';
import { NavigService } from '@core/services/navig/navig.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
	imports: [RouterModule, SearchBoxComponent, LogoIconComponent, CoverartImageComponent]
})
export class HeaderComponent {
	readonly app = inject(AppService);
	readonly auth = inject(JamAuthService);
	readonly navig = inject(NavigService);
	readonly tabService = inject(MainTabsService);
	searchActive: boolean = false;
	private readonly location = inject(AngularLocation);
	private readonly menuService = inject(MenuService);

	back(): void {
		this.location.back();
	}

	toggleMobileNavig(): void {
		this.tabService.switchToMain();
		this.app.view.currentSidebar?.toggleMobileNavig();
	}

	onContextMenu($event: Event): void {
		this.menuService.openMenuComponent<undefined>(ContextMenuUserComponent, undefined, $event);
	}

	searchStateChange(active: boolean) {
		this.searchActive = active;
	}
}
