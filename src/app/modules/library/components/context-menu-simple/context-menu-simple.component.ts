import {Component, viewChild} from '@angular/core';
import type {ContextMenuHostComponentInterface} from '@shared/services';
import type {ContextMenuComponent} from '@app/modules/ngx-contextmenu';

export interface ContextMenuSimpleComponentOptions {
	entries?: Array<{ text: string; icon: string; click(): void }>;
}

@Component({
    selector: 'app-context-menu-simple',
    templateUrl: './context-menu-simple.component.html',
    styleUrls: ['./context-menu-simple.component.scss'],
    standalone: false
})
export class ContextMenuSimpleComponent implements ContextMenuHostComponentInterface<ContextMenuSimpleComponentOptions> {
	readonly contextMenu = viewChild.required<ContextMenuComponent>('entriesMenu');
	entries?: Array<{ text: string; icon: string; click(): void }> = [];

	initOpts(opts: ContextMenuSimpleComponentOptions): void {
		this.entries = opts.entries;
	}
}
