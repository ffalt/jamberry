import {Overlay, OverlayRef} from '@angular/cdk/overlay';
import {ComponentPortal, ComponentType} from '@angular/cdk/portal';
import {ComponentRef, Injectable} from '@angular/core';
import {ContextMenuComponent, ContextMenuService} from '@app/modules/ngx-contextmenu';

export interface ContextMenuHostComponentInterface<T> {
	contextMenu?: ContextMenuComponent;

	initOpts?(opts: T): void;
}

@Injectable()
export class MenuService {
	private templateOverlays: Array<OverlayRef> = [];

	constructor(private overlay: Overlay,
							private contextMenuService: ContextMenuService) {
	}

	openMenuComponent<T>(contextMenuHost: ComponentType<ContextMenuHostComponentInterface<T>>, item: any, event: MouseEvent | KeyboardEvent, options?: T) {
		const templateOverlay = this.overlay.create({});
		this.templateOverlays.push(templateOverlay);
		const contextMenuTemplate: ComponentRef<any> = templateOverlay.attach(new ComponentPortal(contextMenuHost));
		const instance = contextMenuTemplate.instance as ContextMenuHostComponentInterface<T>;
		if (instance.initOpts && options) {
			instance.initOpts(options);
		}
		setTimeout(() => {
			const config = {contextMenu: instance.contextMenu, event, item, anchorElement: event.target as HTMLElement};
			this.contextMenuService.show.next(config);
			const subscription = this.contextMenuService.close.subscribe(() => {
				this.cleanUp();
				subscription.unsubscribe();
			});
		});
		event.preventDefault();
		event.stopPropagation();
	}

	private cleanUp() {
		this.templateOverlays.forEach((overlay, index) => {
			overlay.detach();
			overlay.dispose();
		});
		this.templateOverlays = [];
	}
}
