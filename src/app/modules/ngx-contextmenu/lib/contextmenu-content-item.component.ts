import {FocusableOption} from '@angular/cdk/a11y';
import {Component, ElementRef, output, viewChild, input} from '@angular/core';
import {ContextMenuItemDirective} from './contextmenu.item.directive';

interface ContextMenuItemDirectiveEvent {
	event: Event;
	menuItem: ContextMenuItemDirective;
}

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'context-menu-content-item',
	styleUrls: ['./contextmenu-content-item.component.css'],
	templateUrl: './contextmenu-content-item.component.html',
	standalone: false
})
export class ContextMenuContentItemComponent implements FocusableOption {
	readonly menuItem = input.required<ContextMenuItemDirective>();
	readonly item = input.required<any>();
	readonly itemRef = viewChild<ElementRef>('content');
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
		this.itemSelect.emit({event, menuItem: this.menuItem()});
	}

	onOpenSubMenu(event: Event): void {
		this.openSubmenu.emit({event, menuItem: this.menuItem()});
	}
}
