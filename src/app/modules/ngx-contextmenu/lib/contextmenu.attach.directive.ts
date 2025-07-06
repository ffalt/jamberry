import {Directive, inject, input} from '@angular/core';
import {ContextMenuComponent} from './contextmenu.component';
import {ContextMenuService} from './contextmenu.service';

@Directive({
	// eslint-disable-next-line @angular-eslint/directive-selector
	selector: '[contextMenu]',
	standalone: false,
	host: {
		'(contextmenu)': 'onContextMenu($event)'
	}
})
export class ContextMenuAttachDirective {
	readonly contextMenuSubject = input<any>();
	readonly contextMenu = input.required<ContextMenuComponent>();
	private readonly contextMenuService = inject(ContextMenuService);

	onContextMenu(event: Event): void {
		const contextMenu = this.contextMenu();
		if (!contextMenu.disabled()) {
			this.contextMenuService.show.next({
				contextMenu: contextMenu,
				event,
				item: this.contextMenuSubject()
			});
			event.preventDefault();
			event.stopPropagation();
		}
	}
}
