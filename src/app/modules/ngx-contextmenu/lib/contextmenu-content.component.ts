import {FocusKeyManager} from '@angular/cdk/a11y';
import type {OverlayRef} from '@angular/cdk/overlay';
import {
	type AfterViewInit,
	type ElementRef,
	type OnDestroy,
	type OnInit,
	type QueryList,
	Component,
	inject,
	output,
	model,
	viewChild,
	viewChildren,
	ViewChildren
} from '@angular/core';
import {ContextMenuContentItemComponent} from '@app/modules/ngx-contextmenu/lib/contextmenu-content-item.component';
import {Subscription} from 'rxjs';
import type {ContextMenuItemDirective} from './contextmenu.item.directive';
import type {IContextMenuOptions} from './contextmenu.options';
import type {CloseLeafMenuEvent, IContextMenuClickEvent} from './contextmenu.service';
import {CONTEXT_MENU_OPTIONS} from './contextmenu.tokens';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'context-menu-content',
	styleUrls: ['./contextmenu-content.component.css'],
	templateUrl: './contextmenu-content.component.html',
	standalone: false,
	host: {
		'(window:keydown.ArrowDown)': 'onKeyEvent($event)',
		'(window:keydown.ArrowUp)': 'onKeyEvent($event)',
		'(window:keydown.ArrowRight)': 'keyboardOpenSubMenu($event)',
		'(window:keydown.Space)': 'keyboardMenuItemSelect($event)',
		'(window:keydown.Enter)': 'keyboardMenuItemSelect($event)',
		'(window:keydown.ArrowLeft)': 'onCloseLeafMenu($event)',
		'(window:keydown.Escape)': 'onCloseLeafMenu($event)',
		'(document:contextmenu)': 'closeMenu($event)',
		'(document:click)': 'closeMenu($event)'
	}
})
export class ContextMenuContentComponent implements OnInit, OnDestroy, AfterViewInit {
	autoFocus = false;
	readonly menuItems = model<Array<ContextMenuItemDirective>>([]);
	readonly item = model<any>();
	readonly event = model<Event>();
	readonly parentContextMenu = model<ContextMenuContentComponent>();
	readonly menuClass = model<string>();
	readonly overlay = model<OverlayRef>();
	readonly isLeaf = model<boolean>(false);
	readonly execute = output<{
		event?: Event;
		item: any;
		menuItem: ContextMenuItemDirective;
	}>();
	readonly openSubMenu = output<IContextMenuClickEvent>();
	readonly closeLeafMenu = output<CloseLeafMenuEvent>();
	readonly closeAllMenus = output<{ event: MouseEvent }>();
	readonly menuElement = viewChild.required<ElementRef>('menu');
	readonly menuItemElements = viewChildren<ElementRef>('li');
	@ViewChildren(ContextMenuContentItemComponent) menuItemFocusElements!: QueryList<ContextMenuContentItemComponent>;
	private keyManager!: FocusKeyManager<ContextMenuContentItemComponent>;
	private readonly options = inject<IContextMenuOptions>(CONTEXT_MENU_OPTIONS, {optional: true});
	private readonly subscription: Subscription = new Subscription();

	constructor() {
		if (this.options) {
			this.autoFocus = !!this.options.autoFocus;
		}
	}

	ngOnInit(): void {
		const items = this.menuItems();
		const item = this.item();
		for (const menuItem of items) {
			menuItem.currentItem = item;
			this.subscription.add(
				menuItem.execute.subscribe(event =>
					this.execute.emit({...event, menuItem})
				)
			);
		}
	}

	registerKeys() {
		this.keyManager = new FocusKeyManager<ContextMenuContentItemComponent>(this.menuItemFocusElements).withWrap();
	}

	ngAfterViewInit() {
		if (this.autoFocus) {
			setTimeout(() => this.focus());
		}
		this.registerKeys();
		this.menuItemFocusElements.changes
			.subscribe(() => {
				this.registerKeys();
			});
		this.overlay()?.updatePosition();
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	focus(): void {
		if (this.autoFocus) {
			this.menuElement().nativeElement.focus();
		}
	}

	getKeyManagerMenuItem(): ContextMenuItemDirective | undefined {
		return this.menuItems()[this.keyManager.activeItemIndex ?? -1];
	}

	onKeyEvent(event: KeyboardEvent): void {
		this.keyManager.onKeydown(event);
	}

	keyboardOpenSubMenu(event: KeyboardEvent): void {
		if (!this.isLeaf()) {
			return;
		}
		this.cancelEvent(event);
		const menuItem = this.getKeyManagerMenuItem();
		if (menuItem) {
			this.onOpenSubMenu({menuItem, event});
		}
	}

	keyboardMenuItemSelect(event: KeyboardEvent): void {
		if (!this.isLeaf()) {
			return;
		}
		this.cancelEvent(event);
		const menuItem = this.getKeyManagerMenuItem();
		if (menuItem) {
			this.onMenuItemSelect({menuItem, event});
		}
	}

	onCloseLeafMenu(event: KeyboardEvent): void {
		if (!this.isLeaf()) {
			return;
		}
		this.cancelEvent(event);
		this.closeLeafMenu.emit({exceptRootMenu: event.code === 'ArrowLeft', event});
	}

	closeMenu(event: MouseEvent): void {
		if (event.type === 'click' && event.button === 2) {
			return;
		}
		this.closeAllMenus.emit({event});
	}

	onOpenSubMenu(context: { menuItem: ContextMenuItemDirective; event: Event }): void {
		const anchorElementRef = this.menuItemElements()[this.keyManager.activeItemIndex ?? -1];
		const anchorElement = anchorElementRef?.nativeElement;
		this.openSubMenu.emit({
			anchorElement,
			contextMenu: context.menuItem.subMenu(),
			event: context.event,
			item: this.item(),
			parentContextMenu: this
		});
	}

	onMenuItemSelect(context: { menuItem: ContextMenuItemDirective; event: Event }): void {
		if (context.menuItem.subMenu()) {
			this.onOpenSubMenu(context);
		} else {
			context.menuItem.triggerExecute(this.item(), context.event);
		}
	}

	private cancelEvent(event: Event): void {
		if (!event) {
			return;
		}

		const target = event.target as HTMLElement;
		if (target &&
			(['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName) || target.isContentEditable)
		) {
			return;
		}

		event.preventDefault();
		event.stopPropagation();
	}
}
