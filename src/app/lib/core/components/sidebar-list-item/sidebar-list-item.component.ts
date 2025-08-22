import type { FocusableOption } from '@angular/cdk/a11y';
import { Component, type ElementRef, input, output, viewChild } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

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
	imports: [RouterLinkActive, RouterLink]
})
export class SidebarListItemComponent implements FocusableOption {
	readonly entry = input<SidebarListItem>();
	readonly navigate = output();
	readonly element = viewChild<ElementRef<HTMLElement>>('item');

	clickEntry(): void {
		this.navigate.emit();
	}

	focus(): void {
		this.element()?.nativeElement.focus();
	}
}
