import {Overlay, OverlayConfig, type OverlayRef} from '@angular/cdk/overlay';
import {ComponentPortal} from '@angular/cdk/portal';
import {type ComponentRef, Injectable, Injector, type OnDestroy, inject} from '@angular/core';
import {Subject, takeUntil} from 'rxjs';
import {DialogOverlayRef} from './dialog-overlay-ref.class';
import {DialogOverlayComponent} from './dialog-overlay.component';
import {DIALOG_OVERLAY_DIALOG_CONFIG} from './dialog-overlay.tokens';
import {DEFAULT_CONFIG, type DialogOverlayDialogConfig} from './dialog-overlay.types';

export class PortalInjector implements Injector {
	constructor(
		private readonly parentInjector: Injector,
		private readonly customTokens: WeakMap<any, any>
	) {
	}

	get(token: any, notFoundValue?: any): any {
		const value = this.customTokens.get(token);

		if (value !== undefined) {
			return value;
		}

		return this.parentInjector.get<any>(token, notFoundValue);
	}
}

@Injectable()
export class DialogOverlayService implements OnDestroy {
	private readonly injector = inject(Injector);
	private readonly overlay = inject(Overlay);
	private readonly unsubscribe = new Subject<void>();

	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}

	open(config: DialogOverlayDialogConfig<any> = {}): DialogOverlayRef {
		// Override default configuration
		const dialogConfig = {...DEFAULT_CONFIG, ...config};
		// Returns an OverlayRef which is a PortalHost
		const overlayRef = this.createOverlay(dialogConfig);
		// Instantiate remote control
		const dialogRef = new DialogOverlayRef(overlayRef);
		dialogRef.componentInstance = this.attachDialogContainer(overlayRef, dialogConfig, dialogRef);
		overlayRef.backdropClick()
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(() => dialogRef.close());
		return dialogRef;
	}

	private createOverlay(config: DialogOverlayDialogConfig<any>): OverlayRef {
		return this.overlay.create(this.getOverlayConfig(config));
	}

	private attachDialogContainer(overlayRef: OverlayRef, config: DialogOverlayDialogConfig<any>, dialogRef: DialogOverlayRef): DialogOverlayComponent {
		const injector = this.createInjector(config, dialogRef);
		const containerPortal = new ComponentPortal(DialogOverlayComponent, undefined, injector);
		const containerRef: ComponentRef<DialogOverlayComponent> = overlayRef.attach(containerPortal);
		return containerRef.instance;
	}

	private createInjector(config: DialogOverlayDialogConfig<any>, dialogRef: DialogOverlayRef): PortalInjector {
		const injectionTokens = new WeakMap();
		injectionTokens.set(DialogOverlayRef, dialogRef);
		injectionTokens.set(DIALOG_OVERLAY_DIALOG_CONFIG, config);
		return new PortalInjector(this.injector, injectionTokens);
	}

	private getOverlayConfig(config: DialogOverlayDialogConfig<any>): OverlayConfig {
		const positionStrategy = this.overlay.position().global().centerHorizontally().centerVertically();
		return new OverlayConfig({
			hasBackdrop: config.hasBackdrop,
			backdropClass: config.backdropClass,
			panelClass: config.panelClass,
			scrollStrategy: this.overlay.scrollStrategies.block(),
			positionStrategy
		});
	}
}
