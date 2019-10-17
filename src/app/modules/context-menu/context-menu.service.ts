import {ComponentType, Overlay, OverlayRef, ScrollStrategyOptions} from '@angular/cdk/overlay';
import {ComponentPortal} from '@angular/cdk/portal';
import {ComponentRef, ElementRef, Injectable} from '@angular/core';
import {Subject, Subscription} from 'rxjs';

import {ContextMenuComponent} from './context-menu.component';
import {ContextMenuContentComponent} from './context-menu.content.component';
import {ContextMenuItemDirective} from './context-menu.item.directive';

export interface ContextMenuHostComponentInterface {
	contextMenu: ContextMenuComponent;
}

export interface ContextMenuClickEvent {
	anchorElementRef?: ElementRef;
	anchorElement?: Element | EventTarget;
	contextMenu?: ContextMenuComponent;
	event?: MouseEvent | KeyboardEvent;
	parentContextMenu?: ContextMenuContentComponent;
	item: any;
	activeMenuItemIndex?: number;
}

export interface ContextMenuContext extends ContextMenuClickEvent {
	menuItems: Array<ContextMenuItemDirective>;
	menuClass: string;
}

export interface CloseLeafMenuEvent {
	exceptRootMenu?: boolean;
	event?: MouseEvent | KeyboardEvent;
}

export interface OverlayRefWithContextMenu extends OverlayRef {
	contextMenu?: ContextMenuContentComponent;
}

export interface CancelContextMenuEvent {
	eventType: 'cancel';
	event?: MouseEvent | KeyboardEvent;
}

export interface ExecuteContextMenuEvent {
	eventType: 'execute';
	event?: MouseEvent | KeyboardEvent;
	item: any;
	menuItem: ContextMenuItemDirective;
}

export type CloseContextMenuEvent = ExecuteContextMenuEvent | CancelContextMenuEvent;

@Injectable()
export class ContextMenuService {
	isDestroyingLeafMenu = false;

	show: Subject<ContextMenuClickEvent> = new Subject<ContextMenuClickEvent>();
	// triggerClose: Subject<ContextMenuContentComponent> = new Subject();
	close: Subject<CloseContextMenuEvent> = new Subject();

	// private contextMenuContent: ComponentRef<ContextMenuContentComponent>;
	private overlays: Array<OverlayRef> = [];
	private templateOverlay: OverlayRef;
	private fakeElement: any = {
		getBoundingClientRect: (): ClientRect => ({
			bottom: 0,
			height: 0,
			left: 0,
			right: 0,
			top: 0,
			width: 0
		})
	};

	constructor(
		private overlay: Overlay,
		private scrollStrategy: ScrollStrategyOptions
	) {
	}

	open(contextMenuHost: ComponentType<ContextMenuHostComponentInterface>, item: any, event: MouseEvent, opts?: any): void {
		this.templateOverlay = this.overlay.create({});
		const contextMenuTemplate: ComponentRef<any> = this.templateOverlay.attach(new ComponentPortal(contextMenuHost));
		setTimeout(() => {
			this.show.next({contextMenu: contextMenuTemplate.instance.contextMenu, event, item});
		});
		event.preventDefault();
		event.stopPropagation();
	}

	openContextMenu(context: ContextMenuContext): void {
		if (!context.parentContextMenu) {
			this.createParentContextMenuOverlay(context);
		} else {
			this.createChildContextMenuOverlay(context);
		}
	}

	attachContextMenu(overlay: OverlayRef, context: ContextMenuContext): void {
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
			.subscribe(executeEvent => {
				this.closeAllContextMenus({eventType: 'execute', ...executeEvent});
			}));
		subscriptions.add(contextMenuContent.instance.closeAllMenus.asObservable()
			.subscribe(closeAllEvent => {
				this.closeAllContextMenus({eventType: 'cancel', ...closeAllEvent});
			}));
		subscriptions.add(contextMenuContent.instance.closeLeafMenu.asObservable()
			.subscribe(closeLeafMenuEvent => {
				this.destroyLeafMenu(closeLeafMenuEvent);
			}));
		subscriptions.add(contextMenuContent.instance.openSubMenu.asObservable()
			.subscribe((subMenuEvent: ContextMenuContext) => {
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
			this.closeTemplates();
		});
		contextMenuContent.changeDetectorRef.detectChanges();
	}

	closeAllContextMenus(closeEvent: CloseContextMenuEvent): void {
		if (this.overlays) {
			this.close.next(closeEvent);
			this.overlays.forEach(overlay => {
				overlay.detach();
				overlay.dispose();
			});
		}
		this.overlays = [];
	}

	closeTemplates(): void {
		if (this.templateOverlay) {
			this.templateOverlay.detach();
			this.templateOverlay.dispose();
			this.templateOverlay = undefined;
		}
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
			if (newLeaf) {
				newLeaf.contextMenu.isLeaf = true;
			}

			this.isDestroyingLeafMenu = false;
		});
	}

	destroySubMenus(contextMenu: ContextMenuContentComponent): void {
		const overlay = contextMenu.overlay;
		const index = this.overlays.indexOf(overlay);
		this.overlays.slice(index + 1).forEach(subMenuOverlay => {
			subMenuOverlay.detach();
			subMenuOverlay.dispose();
		});
	}

	isLeafMenu(contextMenuContent: ContextMenuContentComponent): boolean {
		const overlay = this.getLastAttachedOverlay();
		return contextMenuContent.overlay === overlay;
	}

	private createParentContextMenuOverlay(context: ContextMenuContext): void {
		const {anchorElement, anchorElementRef, event} = context;
		const mouseEvent = event as MouseEvent;
		this.fakeElement.getBoundingClientRect = (): ClientRect => ({
			bottom: mouseEvent.clientY,
			height: 0,
			left: mouseEvent.clientX,
			right: mouseEvent.clientX,
			top: mouseEvent.clientY,
			width: 0
		});
		this.closeAllContextMenus({eventType: 'cancel', event});

		const positionStrategy = this.overlay.position().flexibleConnectedTo(
			anchorElementRef || (new ElementRef(anchorElement || this.fakeElement)))
			.withFlexibleDimensions(false)
			.withPositions([
				{
					originX: 'center',
					originY: 'top',
					overlayX: 'center',
					overlayY: 'bottom'
				}
			]);
		this.overlays = [this.overlay.create({
			positionStrategy,
			panelClass: 'ngx-contextmenu',
			scrollStrategy: this.scrollStrategy.close()
		})];

		this.attachContextMenu(this.overlays[0], context);
	}

	private createChildContextMenuOverlay(context: ContextMenuContext): void {
		const {anchorElement, event, parentContextMenu} = context;
		const positionStrategy = this.overlay.position().flexibleConnectedTo(
			new ElementRef(event ? event.target : anchorElement))
			.withFlexibleDimensions(false)
			.withPositions([
				{
					originX: 'end',
					originY: 'top',
					overlayX: 'start',
					overlayY: 'top'
				}
			]);
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
