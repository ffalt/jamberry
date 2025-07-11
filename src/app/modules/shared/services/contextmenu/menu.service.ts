import {Overlay, OverlayRef} from '@angular/cdk/overlay';
import {ComponentPortal, ComponentType} from '@angular/cdk/portal';
import {ComponentRef, Injectable, inject, Signal} from '@angular/core';
import {ContextMenuComponent, ContextMenuService} from '@app/modules/ngx-contextmenu';

export interface ContextMenuHostComponentInterface<T> {
	contextMenu?: Signal<ContextMenuComponent>;

	initOpts?(opts: T): void;
}

@Injectable()
export class MenuService {
	private readonly overlay = inject(Overlay);
	private readonly contextMenuService = inject(ContextMenuService);
	private templateOverlays: Array<OverlayRef> = [];

	openMenuComponent<T>(contextMenuHost: ComponentType<ContextMenuHostComponentInterface<T>>, item: any, event: Event, options?: T) {
		const templateOverlay = this.overlay.create({});
		this.templateOverlays.push(templateOverlay);
		const contextMenuTemplate: ComponentRef<any> = templateOverlay.attach(new ComponentPortal(contextMenuHost));
		const instance = contextMenuTemplate.instance as ContextMenuHostComponentInterface<T>;
		if (instance.initOpts && options) {
			instance.initOpts(options);
		}
		setTimeout(() => {
			if (!instance.contextMenu) {
				return;
			}
			const contextMenu = instance.contextMenu()
			if (!contextMenu) {
				return;
			}
			this.contextMenuService.show.next({contextMenu, event, item, anchorElement: event.target as HTMLElement});
			const subscription = this.contextMenuService.close.subscribe(() => {
				this.cleanUp();
				subscription.unsubscribe();
			});
		});
		event.preventDefault();
		event.stopPropagation();
	}

	private cleanUp() {
		this.templateOverlays.forEach(overlay => {
			overlay.detach();
			overlay.dispose();
		});
		this.templateOverlays = [];
	}
}
