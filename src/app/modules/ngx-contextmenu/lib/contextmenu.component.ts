import {
	ChangeDetectorRef,
	Component,
	ContentChildren,
	ElementRef,
	EventEmitter,
	Inject,
	Input,
	OnDestroy,
	Optional,
	Output,
	QueryList,
	ViewChild,
	ViewEncapsulation
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
	template: ' '
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
	private subscription: Subscription = new Subscription();

	constructor(
		private contextMenuService: ContextMenuService,
		private changeDetector: ChangeDetectorRef,
		private elementRef: ElementRef,
		@Optional()
		@Inject(CONTEXT_MENU_OPTIONS) private options: IContextMenuOptions
	) {
		if (options) {
			this.autoFocus = options.autoFocus;
		}
		this.subscription.add(contextMenuService.show.subscribe(menuEvent => {
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
