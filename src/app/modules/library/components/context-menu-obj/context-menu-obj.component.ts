import {Component, ViewChild} from '@angular/core';
import {ContextMenuHostComponentInterface} from '@shared/services';
import {ContextMenuComponent} from '@app/modules/ngx-contextmenu';

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
    standalone: false
})
export class ContextMenuObjComponent implements ContextMenuHostComponentInterface<ContextMenuObjComponentOptions> {
	@ViewChild('objMenu') contextMenu?: ContextMenuComponent;
	extras?: Array<{ text: string; icon: string; click(): void }> = [];
	showGoto: boolean = true;

	initOpts(opts: ContextMenuObjComponentOptions): void {
		this.showGoto = !opts || !opts.hideGoto;
		this.extras = opts ? opts.extras : [];
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	trackByFn(index: number, value: { text: string; icon: string; click(): void }): string {
		return index.toString();// value.text;
	}

}
