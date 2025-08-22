import { Component, inject, viewChild } from '@angular/core';
import { JamAuthService } from '@jam';
import type { ContextMenuHostComponentInterface } from '@core/services/contextmenu/menu.service';
import { NavigService } from '@core/services/navig/navig.service';
import { ContextMenuModule } from '@modules/ngx-contextmenu/lib/ngx-contextmenu.module';
import type { ContextMenuComponent } from '@modules/ngx-contextmenu/lib/contextmenu.component';

@Component({
	selector: 'app-context-menu-user',
	templateUrl: './context-menu-user.component.html',
	styleUrls: ['./context-menu-user.component.scss'],
	imports: [ContextMenuModule]
})
export class ContextMenuUserComponent implements ContextMenuHostComponentInterface<any> {
	readonly navig = inject(NavigService);
	readonly auth = inject(JamAuthService);
	readonly contextMenu = viewChild.required<ContextMenuComponent>('userMenu');
}
