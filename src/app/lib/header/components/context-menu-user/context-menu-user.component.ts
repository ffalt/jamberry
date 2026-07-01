import { Component, inject, viewChild, ChangeDetectionStrategy } from '@angular/core';
import { JamAuthService } from '@jam';
import type { ContextMenuHostComponentInterface } from '@core/services/contextmenu/menu.service';
import { NavigService } from '@core/services/navig/navig.service';
import { ContextMenuModule } from '@modules/ngx-contextmenu/lib/ngx-contextmenu.module';
import type { ContextMenuComponent } from '@modules/ngx-contextmenu/lib/contextmenu.component';
import { IconAdminComponent } from '@core/components/icons/icon-admin.component';
import { IconBrowseComponent } from '@core/components/icons/icon-browse.component';
import { IconHelpComponent } from '@core/components/icons/icon-help.component';
import { IconLogoutComponent } from '@core/components/icons/icon-logout.component';
import { IconSettingsComponent } from '@core/components/icons/icon-settings.component';
import { IconUserComponent } from '@core/components/icons/icon-user.component';

@Component({
	selector: 'app-context-menu-user',
	templateUrl: './context-menu-user.component.html',
	changeDetection: ChangeDetectionStrategy.Eager,
	imports: [ContextMenuModule, IconAdminComponent, IconBrowseComponent, IconHelpComponent, IconLogoutComponent, IconSettingsComponent, IconUserComponent]
})
export class ContextMenuUserComponent implements ContextMenuHostComponentInterface<any> {
	readonly navig = inject(NavigService);
	readonly auth = inject(JamAuthService);
	readonly contextMenu = viewChild.required<ContextMenuComponent>('userMenu');
}
