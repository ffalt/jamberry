import type { FocusableOption } from '@angular/cdk/a11y';
import { Component, type ElementRef, input, output, viewChild } from '@angular/core';
import type { ContextMenuItemDirective } from './contextmenu.item.directive';
import { NgTemplateOutlet } from '@angular/common';

interface ContextMenuItemDirectiveEvent {
	event: Event;
	menuItem: ContextMenuItemDirective;
}

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'context-menu-content-item',
	styleUrls: ['./contextmenu-content-item.component.css'],
	templateUrl: './contextmenu-content-item.component.html',
	imports: [NgTemplateOutlet]
})
export class ContextMenuContentItemComponent implements FocusableOption {
	readonly menuItem = input.required<ContextMenuItemDirective>();
	readonly item = input.required<any>();
	readonly itemRef = viewChild<ElementRef<HTMLElement>>('content');
	readonly itemSelect = output<ContextMenuItemDirectiveEvent>();
	readonly openSubmenu = output<ContextMenuItemDirectiveEvent>();

	stopEvent($event: MouseEvent) {
		$event.stopPropagation();
	}

	focus(): void {
		this.itemRef()?.nativeElement.focus();
	}

	onMenuItemSelect(event: Event): void {
		event.preventDefault();
		event.stopPropagation();
		this.itemSelect.emit({ event, menuItem: this.menuItem() });
	}

	onOpenSubMenu(event: Event): void {
		this.openSubmenu.emit({ event, menuItem: this.menuItem() });
	}
}
