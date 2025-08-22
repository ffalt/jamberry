import { Component, viewChild } from '@angular/core';
import type { JamLibraryObject } from '../../model/objects';
import type { ContextMenuHostComponentInterface } from '@core/services/contextmenu/menu.service';
import { ContextEntryRateComponent } from '@core/components/context-entry-rate/context-entry-rate.component';
import { ContextEntryFavComponent } from '@core/components/context-entry-fav/context-entry-fav.component';
import { ContextMenuModule } from '@modules/ngx-contextmenu/lib/ngx-contextmenu.module';
import type { ContextMenuComponent } from '@modules/ngx-contextmenu/lib/contextmenu.component';

export interface ContextMenuObjComponentOptionsExtra {
	text: string;
	icon: string;

	click(): void;
}

export interface ContextMenuObjComponentOptions {
	hideGoto?: boolean;
	extras?: Array<ContextMenuObjComponentOptionsExtra>;
}

@Component({
	selector: 'app-context-menu-obj',
	templateUrl: './context-menu-obj.component.html',
	styleUrls: ['./context-menu-obj.component.scss'],
	imports: [ContextMenuModule, ContextEntryRateComponent, ContextEntryFavComponent]
})
export class ContextMenuObjComponent implements ContextMenuHostComponentInterface<ContextMenuObjComponentOptions> {
	readonly contextMenu = viewChild.required<ContextMenuComponent>('objMenu');
	extras?: Array<{ text: string; icon: string; click(): void }> = [];
	showGoto: boolean = true;

	initOpts(opts?: ContextMenuObjComponentOptions): void {
		this.showGoto = !opts?.hideGoto;
		this.extras = opts ? opts.extras : [];
	}

	toLibraryObject(item: unknown): JamLibraryObject {
		return item as JamLibraryObject;
	}
}
