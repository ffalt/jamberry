import {FocusKeyManager} from '@angular/cdk/a11y';
import {OverlayRef} from '@angular/cdk/overlay';
import {
	AfterViewInit,
	Component,
	ElementRef,
	HostListener,
	Input,
	OnDestroy,
	OnInit,
	QueryList,
	ViewChild,
	ViewChildren,
	inject,
	output
} from '@angular/core';
import {ContextMenuContentItemComponent} from '@app/modules/ngx-contextmenu/lib/contextmenu-content-item.component';
import {Subscription} from 'rxjs';
import {ContextMenuItemDirective} from './contextmenu.item.directive';
import {IContextMenuOptions} from './contextmenu.options';
import {CloseLeafMenuEvent, IContextMenuClickEvent} from './contextmenu.service';
import {CONTEXT_MENU_OPTIONS} from './contextmenu.tokens';

const ARROW_LEFT_KEYCODE = 37;

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'context-menu-content',
	styleUrls: ['./contextmenu-content.component.css'],
	templateUrl: './contextmenu-content.component.html',
	standalone: false
})
export class ContextMenuContentComponent implements OnInit, OnDestroy, AfterViewInit {
	@Input() menuItems: Array<ContextMenuItemDirective> = [];
	@Input() item: any;
	@Input() event?: Event;
	@Input() parentContextMenu?: ContextMenuContentComponent;
	@Input() menuClass?: string;
	@Input() overlay?: OverlayRef;
	@Input() isLeaf: boolean = false;
	readonly execute = output<{
		event?: Event;
		item: any;
		menuItem: ContextMenuItemDirective;
	}>();
	readonly openSubMenu = output<IContextMenuClickEvent>();
	readonly closeLeafMenu = output<CloseLeafMenuEvent>();
	readonly closeAllMenus = output<{
		event: MouseEvent;
	}>();
	@ViewChild('menu', {static: true}) menuElement!: ElementRef;
	@ViewChildren('li') menuItemElements!: QueryList<ElementRef>;
	@ViewChildren(ContextMenuContentItemComponent) menuItemFocusElements!: QueryList<ContextMenuContentItemComponent>;

	autoFocus = false;
	private keyManager!: FocusKeyManager<ContextMenuContentItemComponent>;
	private options = inject<IContextMenuOptions>(CONTEXT_MENU_OPTIONS, {optional: true});
	private subscription: Subscription = new Subscription();

	constructor() {
		const options = this.options;

		if (options) {
			this.autoFocus = !!options.autoFocus;
		}
	}

	ngOnInit(): void {
		this.menuItems.forEach(menuItem => {
			menuItem.currentItem = this.item;
			this.subscription.add(
				menuItem.execute.subscribe(event =>
					this.execute.emit({...event, menuItem})
				)
			);
		});
	}

	registerKeys() {
		this.keyManager = new FocusKeyManager<ContextMenuContentItemComponent>(this.menuItemFocusElements).withWrap();
	}

	ngAfterViewInit() {
		if (this.autoFocus) {
			setTimeout(() => this.focus());
		}
		this.registerKeys();
		this.menuItemFocusElements.changes.subscribe(() => {
			this.registerKeys();
		});
		this.overlay?.updatePosition();
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	focus(): void {
		if (this.autoFocus) {
			this.menuElement.nativeElement.focus();
		}
	}

	getKeyManagerMenuItem(): ContextMenuItemDirective | undefined {
		return this.menuItems[this.keyManager.activeItemIndex || -1];
	}

	@HostListener('window:keydown.ArrowDown', ['$event'])
	@HostListener('window:keydown.ArrowUp', ['$event'])
	onKeyEvent(event: KeyboardEvent): void {
		this.keyManager.onKeydown(event);
	}

	@HostListener('window:keydown.ArrowRight', ['$event'])
	keyboardOpenSubMenu(event: KeyboardEvent): void {
		if (!this.isLeaf) {
			return;
		}
		this.cancelEvent(event);
		const menuItem = this.getKeyManagerMenuItem();
		if (menuItem) {
			this.onOpenSubMenu({menuItem, event});
		}
	}

	@HostListener('window:keydown.Enter', ['$event'])
	@HostListener('window:keydown.Space', ['$event'])
	keyboardMenuItemSelect(event: KeyboardEvent): void {
		if (!this.isLeaf) {
			return;
		}
		this.cancelEvent(event);
		const menuItem = this.getKeyManagerMenuItem();
		if (menuItem) {
			this.onMenuItemSelect({menuItem, event});
		}
	}

	@HostListener('window:keydown.Escape', ['$event'])
	@HostListener('window:keydown.ArrowLeft', ['$event'])
	onCloseLeafMenu(event: KeyboardEvent): void {
		if (!this.isLeaf) {
			return;
		}
		this.cancelEvent(event);
		this.closeLeafMenu.emit({
			exceptRootMenu: event.keyCode === ARROW_LEFT_KEYCODE,
			event
		});
	}

	@HostListener('document:click', ['$event'])
	@HostListener('document:contextmenu', ['$event'])
	closeMenu(event: MouseEvent): void {
		if (event.type === 'click' && event.button === 2) {
			return;
		}
		this.closeAllMenus.emit({event});
	}

	onOpenSubMenu(context: { menuItem: ContextMenuItemDirective; event: Event }): void {
		const anchorElementRef = this.menuItemElements.toArray()[this.keyManager.activeItemIndex || -1];
		const anchorElement = anchorElementRef && anchorElementRef.nativeElement;
		this.openSubMenu.emit({
			anchorElement,
			contextMenu: context.menuItem.subMenu,
			event: context.event,
			item: this.item,
			parentContextMenu: this
		});
	}

	onMenuItemSelect(context: { menuItem: ContextMenuItemDirective; event: Event }): void {
		if (!context.menuItem.subMenu) {
			context.menuItem.triggerExecute(this.item, context.event);
		} else {
			this.onOpenSubMenu(context);
		}
	}

	private cancelEvent(event: Event): void {
		if (!event) {
			return;
		}

		const target = event.target as HTMLElement;
		if (target && (
			['INPUT', 'TEXTAREA', 'SELECT'].indexOf(target.tagName) > -1 ||
			target.isContentEditable
		)) {
			return;
		}

		event.preventDefault();
		event.stopPropagation();
	}
}
