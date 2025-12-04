import { Overlay, OverlayConfig, type OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { type ComponentRef, inject, Injectable, Injector, type OnDestroy, type ProviderToken } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { DialogOverlayRef } from './dialog-overlay-ref.class';
import { DialogOverlayComponent } from './dialog-overlay.component';
import { DIALOG_OVERLAY_DIALOG_CONFIG } from './dialog-overlay.tokens';
import { DEFAULT_CONFIG, type DialogOverlayDialogConfig } from './dialog-overlay.types';

export class PortalInjector<T> implements Injector {
	constructor(
		private readonly parentInjector: Injector,
		private readonly customTokens: WeakMap<ProviderToken<T>, T>
	) {
	}

	get(token: ProviderToken<T>, notFoundValue: undefined): T {
		const value = this.customTokens.get(token);

		if (value !== undefined && value !== null) {
			return value;
		}

		return this.parentInjector.get<T>(token, notFoundValue);
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

	open<T>(config: Partial<DialogOverlayDialogConfig<T>> = {}): DialogOverlayRef {
		// Override default configuration
		const dialogConfig: DialogOverlayDialogConfig<T> = { ...DEFAULT_CONFIG, ...config };
		// Returns an OverlayRef which is a PortalHost
		const overlayRef = this.createOverlay<T>(dialogConfig);
		// Instantiate remote control
		const dialogRef = new DialogOverlayRef(overlayRef);
		dialogRef.componentInstance = this.attachDialogContainer(overlayRef, dialogConfig, dialogRef);
		overlayRef.backdropClick()
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(() => {
				dialogRef.close();
			});
		return dialogRef;
	}

	private createOverlay<T>(config: DialogOverlayDialogConfig<T>): OverlayRef {
		return this.overlay.create(this.getOverlayConfig(config));
	}

	private attachDialogContainer(overlayRef: OverlayRef, config: DialogOverlayDialogConfig<any>, dialogRef: DialogOverlayRef): DialogOverlayComponent {
		const injector = this.createInjector(config, dialogRef);
		const containerPortal = new ComponentPortal(DialogOverlayComponent, undefined, injector);
		const containerRef: ComponentRef<DialogOverlayComponent> = overlayRef.attach(containerPortal);
		return containerRef.instance;
	}

	private createInjector<D>(config: DialogOverlayDialogConfig<D>, dialogRef: DialogOverlayRef): PortalInjector<any> {
		const injectionTokens = new WeakMap<ProviderToken<any>>([[DialogOverlayRef, dialogRef], [DIALOG_OVERLAY_DIALOG_CONFIG, config]]);
		return new PortalInjector<any>(this.injector, injectionTokens);
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
