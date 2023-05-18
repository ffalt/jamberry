import {FocusableOption} from '@angular/cdk/a11y';
import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {ContextMenuItemDirective} from './contextmenu.item.directive';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'context-menu-content-item',
	styleUrls: ['./contextmenu-content-item.component.css'],
	templateUrl: './contextmenu-content-item.component.html'
})
export class ContextMenuContentItemComponent implements FocusableOption {
	@Input() menuItem!: ContextMenuItemDirective;
	@Input() item!: any;
	@ViewChild('content', {static: false}) itemRef?: ElementRef;
	@Output() readonly itemSelect = new EventEmitter<{ event: Event; menuItem: ContextMenuItemDirective }>();
	@Output() readonly openSubmenu = new EventEmitter<{ event: Event; menuItem: ContextMenuItemDirective }>();

	stopEvent($event: MouseEvent) {
		$event.stopPropagation();
	}

	focus(): void {
		this.itemRef?.nativeElement.focus();
	}

	onMenuItemSelect(event: Event): void {
		event.preventDefault();
		event.stopPropagation();
		this.itemSelect.emit({event, menuItem: this.menuItem});
	}

	onOpenSubMenu(event: Event): void {
		this.openSubmenu.emit({event, menuItem: this.menuItem});
	}
}
