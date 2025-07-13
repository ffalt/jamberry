import {Component, inject, viewChild} from '@angular/core';
import {JamAuthService} from '@app/modules/jam';
import {NavigService} from '@core/services';
import type {ContextMenuHostComponentInterface} from '@shared/services';
import type {ContextMenuComponent} from '@app/modules/ngx-contextmenu';

@Component({
	selector: 'app-context-menu-user',
	templateUrl: './context-menu-user.component.html',
	styleUrls: ['./context-menu-user.component.scss'],
	standalone: false
})
export class ContextMenuUserComponent implements ContextMenuHostComponentInterface<any> {
	readonly navig = inject(NavigService);
	readonly auth = inject(JamAuthService);
	readonly contextMenu = viewChild.required<ContextMenuComponent>('userMenu');
}
