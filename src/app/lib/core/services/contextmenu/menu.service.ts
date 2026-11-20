import { Overlay, OverlayConfig, type OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, type ComponentType } from '@angular/cdk/portal';
import { inject, Service, type Signal } from '@angular/core';
import type { Subscription } from 'rxjs';
import type { ContextMenuComponent } from '@modules/ngx-contextmenu/lib/contextmenu.component';
import { ContextMenuService } from '@modules/ngx-contextmenu/lib/contextmenu.service';

export interface ContextMenuHostComponentInterface<T> {
	contextMenu?: Signal<ContextMenuComponent | undefined>;

	initOpts?(opts: T): void;
}

@Service()
export class MenuService {
	private readonly overlay = inject(Overlay);
	private readonly contextMenuService = inject(ContextMenuService);
	private templateOverlays: Array<OverlayRef> = [];
	private closeSubscription?: Subscription;
	private openTimer?: ReturnType<typeof setTimeout>;

	openMenuComponent<T>(contextMenuHost: ComponentType<ContextMenuHostComponentInterface<T>>, item: unknown, event: Event, options?: T) {
		this.cleanUp();
		const templateOverlay = this.overlay.create(new OverlayConfig());
		this.templateOverlays.push(templateOverlay);
		const contextMenuTemplate = templateOverlay.attach(new ComponentPortal(contextMenuHost));
		const instance = contextMenuTemplate.instance;
		if (options && instance.initOpts) {
			instance.initOpts(options);
		}
		this.openTimer = setTimeout(() => {
			this.openTimer = undefined;
			const contextMenu = instance.contextMenu?.();
			if (!contextMenu) {
				this.cleanUp();
				return;
			}
			this.contextMenuService.show.next({ contextMenu, event, item, anchorElement: event.target as HTMLElement });
			this.closeSubscription = this.contextMenuService.close.subscribe(() => {
				this.cleanUp();
			});
		}, 0);
		event.preventDefault();
		event.stopPropagation();
	}

	private cleanUp() {
		if (this.openTimer !== undefined) {
			clearTimeout(this.openTimer);
			this.openTimer = undefined;
		}
		this.closeSubscription?.unsubscribe();
		this.closeSubscription = undefined;
		for (const overlay of this.templateOverlays) {
			overlay.detach();
			overlay.dispose();
		}
		this.templateOverlays = [];
	}
}
