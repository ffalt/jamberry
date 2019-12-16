import {Component, ViewChild} from '@angular/core';
import {ContextMenuHostComponentInterface} from '@app/modules/context-menu';
import {ContextMenuComponent} from '@app/modules/context-menu/context-menu.component';

@Component({
	selector: 'app-context-menu-album',
	templateUrl: './context-menu-obj.component.html',
	styleUrls: ['./context-menu-obj.component.scss']
})
export class ContextMenuObjComponent implements ContextMenuHostComponentInterface<any> {
	@ViewChild('objMenu') contextMenu: ContextMenuComponent;
}
