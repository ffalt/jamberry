import {Component, ViewChild} from '@angular/core';
import {JamAuthService} from '@app/modules/jam';
import {NavigService} from '@core/services';
import {ContextMenuHostComponentInterface} from '@shared/services';
import {ContextMenuComponent} from '@app/modules/ngx-contextmenu';

@Component({
    selector: 'app-context-menu-user',
    templateUrl: './context-menu-user.component.html',
    styleUrls: ['./context-menu-user.component.scss'],
    standalone: false
})
export class ContextMenuUserComponent implements ContextMenuHostComponentInterface<any> {
	@ViewChild('userMenu') contextMenu?: ContextMenuComponent;

	constructor(public navig: NavigService, public auth: JamAuthService) {
	}

}
