import { Component, viewChild } from '@angular/core';
import type { ContextMenuHostComponentInterface } from '@core/services/contextmenu/menu.service';
import { ContextMenuModule } from '@modules/ngx-contextmenu/lib/ngx-contextmenu.module';
import type { ContextMenuComponent } from '@modules/ngx-contextmenu/lib/contextmenu.component';

export interface ContextMenuSimpleComponentOptions {
	entries?: Array<{ text: string; icon: string; click(): void }>;
}

@Component({
	selector: 'app-context-menu-simple',
	templateUrl: './context-menu-simple.component.html',
	styleUrls: ['./context-menu-simple.component.scss'],
	imports: [ContextMenuModule]
})
export class ContextMenuSimpleComponent implements ContextMenuHostComponentInterface<ContextMenuSimpleComponentOptions> {
	readonly contextMenu = viewChild.required<ContextMenuComponent>('entriesMenu');
	entries?: Array<{ text: string; icon: string; click(): void }> = [];

	initOpts(opts: ContextMenuSimpleComponentOptions): void {
		this.entries = opts.entries;
	}
}
