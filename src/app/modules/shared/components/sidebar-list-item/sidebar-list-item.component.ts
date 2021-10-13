import {FocusableOption, FocusOrigin} from '@angular/cdk/a11y';
import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';

export interface SidebarListItem {
	name: string;
	icon: string;
	link: string;
	options?: {
		exact: boolean;
	};
}

@Component({
	selector: 'app-sidebar-list-item',
	templateUrl: './sidebar-list-item.component.html',
	styleUrls: ['./sidebar-list-item.component.scss']
})
export class SidebarListItemComponent implements FocusableOption {
	@Input() entry!: SidebarListItem;
	@Output() readonly navigate: EventEmitter<void> = new EventEmitter();
	@ViewChild('item', {static: true}) element?: ElementRef;

	clickEntry(): void {
		this.navigate.emit();
	}

	focus(origin?: FocusOrigin): void {
		this.element?.nativeElement.focus();
	}
}
