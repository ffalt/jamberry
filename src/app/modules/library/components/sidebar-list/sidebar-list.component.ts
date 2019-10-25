import {Component, EventEmitter, HostBinding, Input, Output} from '@angular/core';

export interface SidebarListItem {
	name: string;
	icon: string;
	link: string;
}

@Component({
	selector: 'app-sidebar-list',
	templateUrl: './sidebar-list.component.html',
	styleUrls: ['./sidebar-list.component.scss']
})
export class SidebarListComponent {
	@Input() entries: Array<SidebarListItem> = [];
	@Input() listName: string = '';
	@HostBinding('class.active') collapsed: boolean = false;
	@Output() readonly navigate: EventEmitter<void> = new EventEmitter();

	clickEntry(entry: SidebarListItem): void {
		this.navigate.emit();
	}

	trackByFn(index: number, node: SidebarListItem): string {
		return node.link;
	}
}
