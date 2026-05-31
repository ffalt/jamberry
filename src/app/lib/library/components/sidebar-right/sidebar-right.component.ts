import { Component, output } from '@angular/core';
import { QueueComponent } from '../../../player/components/queue/queue.component';
import { ChatComponent } from '../chat/chat.component';
import { ClickKeyEnterDirective } from '@core/directives/click-enterkey.directive';
import { FocusKeyListItemDirective } from '@core/directives/focus-key-list-item.directive';
import { FocusKeyListDirective } from '@core/directives/focus-key-list.directive';
import { IconRightOpenMiniComponent } from '@core/components/icons/icon-right-open-mini.component';

@Component({
	selector: 'app-sidebar-right',
	templateUrl: './sidebar-right.component.html',
	styleUrls: ['./sidebar-right.component.scss'],
	imports: [ChatComponent, ClickKeyEnterDirective, FocusKeyListDirective, FocusKeyListItemDirective, IconRightOpenMiniComponent, QueueComponent]
})
export class SidebarRightComponent {
	readonly closeEvent = output();
	currentTab: string = 'queue';
}
