import {Component, HostBinding, output, viewChildren, input} from '@angular/core';
import {SidebarListItem, SidebarListItemComponent} from '../sidebar-list-item/sidebar-list-item.component';

export interface SidebarList {
	name: string;
	entries: Array<SidebarListItem>;
}

@Component({
	selector: 'app-sidebar-list',
	templateUrl: './sidebar-list.component.html',
	styleUrls: ['./sidebar-list.component.scss'],
	standalone: false
})
export class SidebarListComponent {
	readonly list = input.required<SidebarList>();
	@HostBinding('class.active') collapsed: boolean = false;
	readonly items = viewChildren(SidebarListItemComponent);
	readonly navigate = output();

	onNavigate(): void {
		this.navigate.emit();
	}

	toggle() {
		this.collapsed = !this.collapsed;
	}
}
