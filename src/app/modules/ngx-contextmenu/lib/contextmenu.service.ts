import {Overlay, OverlayRef, ScrollStrategyOptions} from '@angular/cdk/overlay';
import {ComponentPortal} from '@angular/cdk/portal';
import {ComponentRef, ElementRef, Injectable} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {ContextMenuContentComponent} from './contextmenu-content.component';

import {ContextMenuComponent} from './contextmenu.component';
import {ContextMenuItemDirective} from './contextmenu.item.directive';

export interface IContextMenuClickEvent {
	anchorElement?: Element | EventTarget;
	contextMenu?: ContextMenuComponent;
	event?: Event;
	parentContextMenu?: ContextMenuContentComponent;
	item: any;
	activeMenuItemIndex?: number;
}

export interface IContextMenuContext extends IContextMenuClickEvent {
	menuItems: Array<ContextMenuItemDirective>;
	menuClass: string;
}

export interface CloseLeafMenuEvent {
	exceptRootMenu?: boolean;
	event?: Event;
}

export interface OverlayRefWithContextMenu extends OverlayRef {
	contextMenu?: ContextMenuContentComponent;
}

export interface CancelContextMenuEvent {
	eventType: 'cancel';
	event?: Event;
}

export interface ExecuteContextMenuEvent {
	eventType: 'execute';
	event?: Event;
	item: any;
	menuItem: ContextMenuItemDirective;
}

export type CloseContextMenuEvent = ExecuteContextMenuEvent | CancelContextMenuEvent;

interface Rect {
	bottom: number;
	height: number;
	left: number;
	right: number;
	top: number;
	width: number;
}

@Injectable()
export class ContextMenuService {
	isDestroyingLeafMenu = false;

	show: Subject<IContextMenuClickEvent> = new Subject<IContextMenuClickEvent>();
	triggerClose: Subject<ContextMenuContentComponent> = new Subject();
	close: Subject<CloseContextMenuEvent> = new Subject();

	private overlays: Array<OverlayRef> = [];
	private fakeElement: any = {
		getBoundingClientRect: (): Rect => ({bottom: 0, height: 0, left: 0, right: 0, top: 0, width: 0})
	};

	constructor(private overlay: Overlay, private scrollStrategy: ScrollStrategyOptions) {
	}

	openContextMenu(context: IContextMenuContext) {
		const {anchorElement, event, parentContextMenu} = context;

		if (!parentContextMenu) {
			const mouseEvent = event as MouseEvent;
			this.fakeElement.getBoundingClientRect = (): Rect => ({
				left: mouseEvent.clientX,
				top: mouseEvent.clientY,
				right: mouseEvent.clientX,
				bottom: mouseEvent.clientY,
				height: 0,
				width: 0
			});
			this.closeAllContextMenus({eventType: 'cancel', event});
			const positionStrategy = this.overlay
				.position()
				.flexibleConnectedTo(new ElementRef(anchorElement || this.fakeElement))
				.withPositions([
					{originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top'},
					{originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom'},
					{originX: 'end', originY: 'top', overlayX: 'start', overlayY: 'top'},
					{originX: 'start', originY: 'top', overlayX: 'end', overlayY: 'top'},
					{originX: 'end', originY: 'center', overlayX: 'start', overlayY: 'center'},
					{originX: 'start', originY: 'center', overlayX: 'end', overlayY: 'center'}
				])
				.withFlexibleDimensions(false);
			this.overlays = [this.overlay.create({
				positionStrategy,
				panelClass: 'ngx-contextmenu',
				scrollStrategy: this.scrollStrategy.close()
			})];
			this.attachContextMenu(this.overlays[0], context);
		} else {
			const positionStrategy = this.overlay
				.position()
				.flexibleConnectedTo(new ElementRef(event ? event.target : anchorElement))
				.withPositions([
					{originX: 'end', originY: 'top', overlayX: 'start', overlayY: 'top'},
					{originX: 'start', originY: 'top', overlayX: 'end', overlayY: 'top'},
					{originX: 'end', originY: 'bottom', overlayX: 'start', overlayY: 'bottom'},
					{originX: 'start', originY: 'bottom', overlayX: 'end', overlayY: 'bottom'}
				])
				.withFlexibleDimensions(false)
			;
			const newOverlay = this.overlay.create({
				positionStrategy,
				panelClass: 'ngx-contextmenu',
				scrollStrategy: this.scrollStrategy.close()
			});
			this.destroySubMenus(parentContextMenu);
			this.overlays = this.overlays.concat(newOverlay);
			this.attachContextMenu(newOverlay, context);
		}
	}

	attachContextMenu(overlay: OverlayRef, context: IContextMenuContext): void {
		const {event, item, menuItems, menuClass} = context;

		const contextMenuContent: ComponentRef<ContextMenuContentComponent> = overlay.attach(new ComponentPortal(ContextMenuContentComponent));
		contextMenuContent.instance.event = event;
		contextMenuContent.instance.item = item;
		contextMenuContent.instance.menuItems = menuItems;
		contextMenuContent.instance.overlay = overlay;
		contextMenuContent.instance.isLeaf = true;
		contextMenuContent.instance.menuClass = menuClass;
		(overlay as OverlayRefWithContextMenu).contextMenu = contextMenuContent.instance;

		const subscriptions: Subscription = new Subscription();
		subscriptions.add(contextMenuContent.instance.execute.asObservable()
			.subscribe(executeEvent => this.closeAllContextMenus({eventType: 'execute', ...executeEvent})));
		subscriptions.add(contextMenuContent.instance.closeAllMenus.asObservable()
			.subscribe(closeAllEvent => this.closeAllContextMenus({eventType: 'cancel', ...closeAllEvent})));
		subscriptions.add(contextMenuContent.instance.closeLeafMenu.asObservable()
			.subscribe(closeLeafMenuEvent => this.destroyLeafMenu(closeLeafMenuEvent)));
		subscriptions.add(contextMenuContent.instance.openSubMenu.asObservable()
			.subscribe(subMenuEvent => {
				this.destroySubMenus(contextMenuContent.instance);
				if (!subMenuEvent.contextMenu) {
					contextMenuContent.instance.isLeaf = true;
					return;
				}
				contextMenuContent.instance.isLeaf = false;
				this.show.next(subMenuEvent);
			}));
		contextMenuContent.onDestroy(() => {
			menuItems.forEach(menuItem => menuItem.isActive = false);
			subscriptions.unsubscribe();
		});
		contextMenuContent.changeDetectorRef.detectChanges();
	}

	closeAllContextMenus(closeEvent: CloseContextMenuEvent): void {
		if (this.overlays) {
			this.close.next(closeEvent);
			this.overlays.forEach((overlay, index) => {
				overlay.detach();
				overlay.dispose();
			});
		}
		this.overlays = [];
	}

	getLastAttachedOverlay(): OverlayRefWithContextMenu {
		let overlay: OverlayRef = this.overlays[this.overlays.length - 1];
		while (this.overlays.length > 1 && overlay && !overlay.hasAttached()) {
			overlay.detach();
			overlay.dispose();
			this.overlays = this.overlays.slice(0, -1);
			overlay = this.overlays[this.overlays.length - 1];
		}
		return overlay;
	}

	destroyLeafMenu({exceptRootMenu, event}: CloseLeafMenuEvent = {}): void {
		if (this.isDestroyingLeafMenu) {
			return;
		}
		this.isDestroyingLeafMenu = true;

		setTimeout(() => {
			const overlay = this.getLastAttachedOverlay();
			if (this.overlays.length > 1 && overlay) {
				overlay.detach();
				overlay.dispose();
			}
			if (!exceptRootMenu && this.overlays.length > 0 && overlay) {
				this.close.next({eventType: 'cancel', event});
				overlay.detach();
				overlay.dispose();
			}

			const newLeaf = this.getLastAttachedOverlay();
			if (newLeaf && newLeaf.contextMenu) {
				newLeaf.contextMenu.isLeaf = true;
			}

			this.isDestroyingLeafMenu = false;
		});
	}

	destroySubMenus(contextMenu: ContextMenuContentComponent): void {
		const overlay = contextMenu.overlay;
		if (overlay) {
			const index = this.overlays.indexOf(overlay);
			this.overlays.slice(index + 1).forEach(subMenuOverlay => {
				subMenuOverlay.detach();
				subMenuOverlay.dispose();
			});
		}
	}

	isLeafMenu(contextMenuContent: ContextMenuContentComponent): boolean {
		const overlay = this.getLastAttachedOverlay();
		return contextMenuContent.overlay === overlay;
	}
}
