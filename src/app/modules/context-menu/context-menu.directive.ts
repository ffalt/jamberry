import {Directive, HostListener, Input} from '@angular/core';
import {ContextMenuComponent} from './context-menu.component';
import {ContextMenuService} from './context-menu.service';

@Directive({
	// tslint:disable-next-line:directive-selector
	selector: '[contextMenu]'
})
export class ContextMenuDirective {
	@Input() contextMenuSubject: any;
	@Input() contextMenuTriggerLeft: boolean = false;
	@Input() contextMenu: ContextMenuComponent;

	constructor(private contextMenuService: ContextMenuService) {
	}

	@HostListener('contextmenu', ['$event'])
	onContextMenu(event: MouseEvent): void {
		if (!this.contextMenu.disabled) {
			this.contextMenuService.show.next({
				contextMenu: this.contextMenu,
				event,
				item: this.contextMenuSubject
			});
			event.preventDefault();
			event.stopPropagation();
		}
	}

	@HostListener('click', ['$event'])
	onContextMenuClick(event: MouseEvent): void {
		if (this.contextMenuTriggerLeft && !this.contextMenu.disabled) {
			this.contextMenuService.show.next({
				contextMenu: this.contextMenu,
				event,
				item: this.contextMenuSubject
			});
			event.preventDefault();
			event.stopPropagation();
		}
	}
}
