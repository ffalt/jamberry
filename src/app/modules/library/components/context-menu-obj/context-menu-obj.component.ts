import {Component, ViewChild} from '@angular/core';
import {ContextMenuHostComponentInterface} from '@app/modules/context-menu';
import {ContextMenuComponent} from '@app/modules/context-menu/context-menu.component';

export interface ContextMenuObjComponentOptions {
	hideGoto?: boolean;
	extras?: Array<{ text: string, icon: string; click: () => void; }>;
}

@Component({
	selector: 'app-context-menu-album',
	templateUrl: './context-menu-obj.component.html',
	styleUrls: ['./context-menu-obj.component.scss']
})
export class ContextMenuObjComponent implements ContextMenuHostComponentInterface<ContextMenuObjComponentOptions> {
	@ViewChild('objMenu') contextMenu: ContextMenuComponent;
	extras?: Array<{ text: string, icon: string, click: () => void }> = [];
	showGoto: boolean = true;

	initOpts(opts: ContextMenuObjComponentOptions): void {
		this.showGoto = !opts.hideGoto;
		this.extras = opts.extras;
	}

}
