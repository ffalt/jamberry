import { Overlay, type OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, type ComponentType } from '@angular/cdk/portal';
import { inject, Injectable, type Signal } from '@angular/core';
import type { ContextMenuComponent } from '@modules/ngx-contextmenu/lib/contextmenu.component';
import { ContextMenuService } from '@modules/ngx-contextmenu/lib/contextmenu.service';

export interface ContextMenuHostComponentInterface<T> {
	contextMenu?: Signal<ContextMenuComponent | undefined>;

	initOpts?(opts: T): void;
}

@Injectable({
	providedIn: 'root'
})
export class MenuService {
	private readonly overlay = inject(Overlay);
	private readonly contextMenuService = inject(ContextMenuService);
	private templateOverlays: Array<OverlayRef> = [];

	openMenuComponent<T>(contextMenuHost: ComponentType<ContextMenuHostComponentInterface<T>>, item: unknown, event: Event, options?: T) {
		const templateOverlay = this.overlay.create({});
		this.templateOverlays.push(templateOverlay);
		const contextMenuTemplate = templateOverlay.attach(new ComponentPortal(contextMenuHost));
		const instance = contextMenuTemplate.instance;
		if (instance.initOpts && options) {
			instance.initOpts(options);
		}
		setTimeout(() => {
			if (!instance.contextMenu) {
				return;
			}
			const contextMenu = instance.contextMenu();
			if (!contextMenu) {
				return;
			}
			this.contextMenuService.show.next({ contextMenu, event, item, anchorElement: event.target as HTMLElement });
			const subscription = this.contextMenuService.close.subscribe(() => {
				this.cleanUp();
				subscription.unsubscribe();
			});
		});
		event.preventDefault();
		event.stopPropagation();
	}

	private cleanUp() {
		for (const overlay of this.templateOverlays) {
			overlay.detach();
			overlay.dispose();
		}
		this.templateOverlays = [];
	}
}
