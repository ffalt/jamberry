import {Overlay, OverlayConfig, OverlayRef} from '@angular/cdk/overlay';
import {ComponentPortal, PortalInjector} from '@angular/cdk/portal';
import {ComponentRef, Injectable, Injector, OnDestroy} from '@angular/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {DialogOverlayRef} from './dialog-overlay-ref.class';
import {DialogOverlayComponent} from './dialog-overlay.component';
import {DIALOG_OVERLAY_DIALOG_CONFIG} from './dialog-overlay.tokens';
import {DEFAULT_CONFIG, DialogOverlayDialogConfig} from './dialog-overlay.types';

@Injectable()
export class DialogOverlayService implements OnDestroy {
	protected unsubscribe = new Subject();

	constructor(private injector: Injector, private overlay: Overlay) {
	}

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
			.pipe(takeUntil(this.unsubscribe)).subscribe(() => {
			dialogRef.close();
		});
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
