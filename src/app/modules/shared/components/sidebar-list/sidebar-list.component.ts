import {Component, EventEmitter, HostBinding, Input, Output, QueryList, ViewChildren} from '@angular/core';
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
	@Input() list?: SidebarList;
	@HostBinding('class.active') collapsed: boolean = false;
	@Output() readonly navigate: EventEmitter<void> = new EventEmitter();
	@ViewChildren(SidebarListItemComponent) items!: QueryList<SidebarListItemComponent>;

	onNavigate(): void {
		this.navigate.emit();
	}

	toggle() {
		this.collapsed = !this.collapsed;
	}
}
