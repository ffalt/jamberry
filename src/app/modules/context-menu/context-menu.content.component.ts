import {ActiveDescendantKeyManager} from '@angular/cdk/a11y';
import {OverlayRef} from '@angular/cdk/overlay';
import {
	AfterViewInit,
	ChangeDetectorRef,
	Component,
	ComponentFactoryResolver,
	ComponentRef,
	ElementRef,
	EventEmitter,
	HostListener,
	Inject,
	Injector,
	Input,
	OnDestroy,
	OnInit,
	Optional,
	Output,
	QueryList,
	ViewChild,
	ViewChildren,
	ViewContainerRef
} from '@angular/core';
import {isLeftArrowKey} from '@app/utils/keys';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {ContextMenuItemDirective} from './context-menu.item.directive';
import {ContextMenuOptions} from './context-menu.options';
import {CloseLeafMenuEvent, ContextMenuClickEvent} from './context-menu.service';
import {CONTEXT_MENU_OPTIONS} from './context-menu.tokens';

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'context-menu-content',
	styleUrls: ['context-menu.content.component.scss'],
	templateUrl: 'context-menu.content.component.html'
})
export class ContextMenuContentComponent implements OnInit, OnDestroy, AfterViewInit {
	@Input() menuItems: Array<ContextMenuItemDirective> = [];
	@Input() item: any;
	@Input() event: MouseEvent | KeyboardEvent;
	@Input() parentContextMenu: ContextMenuContentComponent;
	@Input() menuClass: string;
	@Input() overlay: OverlayRef;
	@Input() isLeaf = false;
	@Output() readonly execute: EventEmitter<{ event: MouseEvent | KeyboardEvent, item: any, menuItem: ContextMenuItemDirective }> = new EventEmitter();
	@Output() readonly openSubMenu: EventEmitter<ContextMenuClickEvent> = new EventEmitter();
	@Output() readonly closeLeafMenu: EventEmitter<CloseLeafMenuEvent> = new EventEmitter();
	@Output() readonly closeAllMenus: EventEmitter<{ event: MouseEvent }> = new EventEmitter();
	@ViewChild('menu', {static: true}) menuElement: ElementRef;
	@ViewChildren('li') menuItemElements: QueryList<ElementRef>;

	autoFocus = false;
	protected unsubscribe = new Subject();
	private _keyManager: ActiveDescendantKeyManager<ContextMenuItemDirective>;
	private childComponentRef: ComponentRef<any>;

	constructor(
		private changeDetector: ChangeDetectorRef,
		private elementRef: ElementRef,
		@Optional() @Inject(CONTEXT_MENU_OPTIONS) private options: ContextMenuOptions,
		private componentFactoryResolver: ComponentFactoryResolver,
		private injector: Injector
	) {
		this.autoFocus = options ? options.autoFocus : false;
	}

	ngOnInit(): void {
		this.menuItems.forEach(menuItem => {
			menuItem.currentItem = this.item;
			menuItem.execute
				.pipe(takeUntil(this.unsubscribe)).subscribe(value => {
				this.execute.emit({event: value.event, item: value.item, menuItem});
			});
		});
		const queryList = new QueryList<ContextMenuItemDirective>();
		queryList.reset(this.menuItems);
		this._keyManager = new ActiveDescendantKeyManager<ContextMenuItemDirective>(queryList).withWrap();
	}

	ngAfterViewInit(): void {
		if (this.autoFocus) {
			setTimeout(() => {
				this.focus();
			});
		}
		this.overlay.updatePosition();
	}

	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}

	focus(): void {
		if (this.autoFocus) {
			this.menuElement.nativeElement.focus();
		}
	}

	stopEvent($event: MouseEvent): void {
		$event.stopPropagation();
	}

	@HostListener('window:keydown.ArrowDown', ['$event'])
	@HostListener('window:keydown.ArrowUp', ['$event'])
	onKeyEvent(event: KeyboardEvent): void {
		if (!this.isLeaf) {
			return;
		}
		this._keyManager.onKeydown(event);
	}

	@HostListener('window:keydown.ArrowRight', ['$event'])
	keyboardOpenSubMenu(event?: KeyboardEvent): void {
		if (!this.isLeaf) {
			return;
		}
		ContextMenuContentComponent.cancelEvent(event);
		const menuItem = this.menuItems[this._keyManager.activeItemIndex];
		if (menuItem) {
			this.onOpenSubMenu(menuItem);
		}
	}

	@HostListener('window:keydown.Enter', ['$event'])
	@HostListener('window:keydown.Space', ['$event'])
	keyboardMenuItemSelect(event?: KeyboardEvent): void {
		if (!this.isLeaf) {
			return;
		}
		ContextMenuContentComponent.cancelEvent(event);
		const menuItem = this.menuItems[this._keyManager.activeItemIndex];
		if (menuItem) {
			this.onMenuItemSelect(menuItem, event);
		}
	}

	@HostListener('window:keydown.Escape', ['$event'])
	@HostListener('window:keydown.ArrowLeft', ['$event'])
	onCloseLeafMenu(event: KeyboardEvent): void {
		if (!this.isLeaf) {
			return;
		}
		ContextMenuContentComponent.cancelEvent(event);
		this.closeLeafMenu.emit({exceptRootMenu: isLeftArrowKey(event), event});
	}

	@HostListener('document:click', ['$event'])
	@HostListener('document:contextmenu', ['$event'])
	closeMenu(event: MouseEvent): void {
		if (event.type === 'click' && event.button === 2) {
			return;
		}
		this.closeAllMenus.emit({event});
	}

	onOpenSubMenu(menuItem: ContextMenuItemDirective, event?: MouseEvent | KeyboardEvent): void {
		const anchorElementRef = this.menuItemElements.toArray()[this._keyManager.activeItemIndex];
		const anchorElement = anchorElementRef && anchorElementRef.nativeElement;
		this.openSubMenu.emit({
			anchorElementRef,
			anchorElement,
			contextMenu: menuItem.subMenu,
			event,
			item: this.item,
			parentContextMenu: this
		});
	}

	onMenuItemSelect(menuItem: ContextMenuItemDirective, event: MouseEvent | KeyboardEvent): void {
		event.preventDefault();
		event.stopPropagation();
		this.onOpenSubMenu(menuItem, event);
		if (!menuItem.subMenu) {
			menuItem.triggerExecute(this.item, event);
		}
	}

	private static cancelEvent(event): void {
		if (!event) {
			return;
		}
		const target: HTMLElement = event.target;
		if (['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName) || target.isContentEditable) {
			return;
		}
		event.preventDefault();
		event.stopPropagation();
	}

}
