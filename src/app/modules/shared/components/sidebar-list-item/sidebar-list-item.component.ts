import type {FocusableOption} from '@angular/cdk/a11y';
import {Component, type ElementRef, output, viewChild, input} from '@angular/core';

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
	styleUrls: ['./sidebar-list-item.component.scss'],
	standalone: false
})
export class SidebarListItemComponent implements FocusableOption {
	readonly entry = input<SidebarListItem>();
	readonly navigate = output();
	readonly element = viewChild<ElementRef>('item');

	clickEntry(): void {
		this.navigate.emit();
	}

	focus(): void {
		this.element()?.nativeElement.focus();
	}
}
