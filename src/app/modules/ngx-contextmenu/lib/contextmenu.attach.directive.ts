import {Directive, HostListener, Input} from '@angular/core';
import {ContextMenuComponent} from './contextmenu.component';
import {ContextMenuService} from './contextmenu.service';

@Directive({
	// eslint-disable-next-line @angular-eslint/directive-selector
	selector: '[contextMenu]'
})
export class ContextMenuAttachDirective {
	@Input() contextMenuSubject: any;
	@Input() contextMenu!: ContextMenuComponent;

	constructor(private contextMenuService: ContextMenuService) {
	}

	@HostListener('contextmenu', ['$event'])
	onContextMenu(event: MouseEvent | KeyboardEvent): void {
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
}
