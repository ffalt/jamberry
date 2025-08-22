import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { collectSidebarListItems, type SidebarList } from '@core/components/sidebar-list/sidebar-list.component';
import { SidebarComponent } from '@core/components/sidebar/sidebar.component';

@Component({
	selector: 'app-user-sidebar',
	templateUrl: './user-sidebar.component.html',
	styleUrls: ['./user-sidebar.component.scss'],
	imports: [CommonModule, SidebarComponent]
})
export class UserSidebarComponent {
	sections: Array<SidebarList> = [];

	constructor() {
		this.sections = [collectSidebarListItems('User', 'user')];
	}
}
