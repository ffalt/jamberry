import {
	Component,
	ContentChildren,
	ElementRef,
	EventEmitter,
	Input,
	OnDestroy,
	Output,
	QueryList,
	ViewChild,
	ViewEncapsulation,
	inject
} from '@angular/core';
import {Subscription} from 'rxjs';
import {first} from 'rxjs/operators';

import {ContextMenuItemDirective} from './contextmenu.item.directive';
import {IContextMenuOptions} from './contextmenu.options';
import {CloseContextMenuEvent, ContextMenuService, IContextMenuClickEvent} from './contextmenu.service';
import {CONTEXT_MENU_OPTIONS} from './contextmenu.tokens';

@Component({
	// eslint-disable-next-line @angular-eslint/use-component-view-encapsulation
	encapsulation: ViewEncapsulation.None,
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'context-menu',
	styleUrls: ['./contextmenu.component.css'],
	template: ' ',
	standalone: false
})
export class ContextMenuComponent implements OnDestroy {
	@Input() menuClass = '';
	@Input() autoFocus?: boolean = false;
	@Input() disabled?: boolean = false;
	@Output() readonly closeEvent: EventEmitter<CloseContextMenuEvent> = new EventEmitter();
	@Output() readonly openEvent: EventEmitter<IContextMenuClickEvent> = new EventEmitter();
	@ContentChildren(ContextMenuItemDirective) menuItems!: QueryList<ContextMenuItemDirective>;
	@ViewChild('menu', {static: false}) menuElement?: ElementRef;
	visibleMenuItems: Array<ContextMenuItemDirective> = [];
	item: any;
	event?: Event;
	private readonly subscription: Subscription = new Subscription();
	private readonly contextMenuService = inject(ContextMenuService);
	private readonly options = inject<IContextMenuOptions>(CONTEXT_MENU_OPTIONS, {optional: true});

	constructor() {
		if (this.options) {
			this.autoFocus = this.options.autoFocus;
		}
		this.subscription.add(this.contextMenuService.show.subscribe(menuEvent => {
			this.onMenuEvent(menuEvent);
		}));
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	onMenuEvent(menuEvent: IContextMenuClickEvent): void {
		if (this.disabled) {
			return;
		}
		const {contextMenu, event, item} = menuEvent;
		if (contextMenu && contextMenu !== this) {
			return;
		}
		this.event = event;
		this.item = item;
		this.setVisibleMenuItems();
		this.contextMenuService.openContextMenu({...menuEvent, menuItems: this.visibleMenuItems, menuClass: this.menuClass});
		this.contextMenuService.close.asObservable().pipe(first()).subscribe(closeEvent => this.closeEvent.emit(closeEvent));
		this.openEvent.next(menuEvent);
	}

	setVisibleMenuItems(): void {
		this.visibleMenuItems = this.menuItems.filter(menuItem => menuItem.isVisible);
	}

}
