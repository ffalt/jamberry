import {Component, ViewChild} from '@angular/core';
import {ContextMenuHostComponentInterface} from '@app/modules/context-menu';
import {ContextMenuComponent} from '@app/modules/context-menu/context-menu.component';

export interface ContextMenuSimpleComponentOptions {
	entries?: Array<{ text: string; icon: string; click(): void }>;
}

@Component({
	selector: 'app-context-menu-simple',
	templateUrl: './context-menu-simple.component.html',
	styleUrls: ['./context-menu-simple.component.scss']
})
export class ContextMenuSimpleComponent implements ContextMenuHostComponentInterface<ContextMenuSimpleComponentOptions> {
	@ViewChild('entriesMenu') contextMenu: ContextMenuComponent;
	entries?: Array<{ text: string; icon: string; click(): void }> = [];

	initOpts(opts: ContextMenuSimpleComponentOptions): void {
		this.entries = opts.entries;
	}

}
