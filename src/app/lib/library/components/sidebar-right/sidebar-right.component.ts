import { Component } from '@angular/core';
import { QueueComponent } from '../../../player/components/queue/queue.component';
import { ChatComponent } from '../chat/chat.component';
import { ClickKeyEnterDirective } from '@core/directives/click-enterkey.directive';
import { FocusKeyListItemDirective } from '@core/directives/focus-key-list-item.directive';
import { FocusKeyListDirective } from '@core/directives/focus-key-list.directive';

@Component({
	selector: 'app-sidebar-right',
	templateUrl: './sidebar-right.component.html',
	styleUrls: ['./sidebar-right.component.scss'],
	imports: [ChatComponent, QueueComponent, ClickKeyEnterDirective, FocusKeyListItemDirective, FocusKeyListDirective]
})
export class SidebarRightComponent {
	currentTab: string = 'queue';
}
