import {Overlay, OverlayConfig, OverlayRef} from '@angular/cdk/overlay';
import {ComponentPortal} from '@angular/cdk/portal';
import {ComponentRef, Inject, Injectable, Injector, NgZone} from '@angular/core';
import {Observable} from 'rxjs';

import {GlobalConfig, IndividualConfig, ToastPackage, ToastToken, TOAST_CONFIG} from './toast-config';
import {ToastInjector} from './toast-injector';
import {ToastRef} from './toast-ref';
import {ToastComponent} from './toast.component';

export interface ActiveToast<C> {
	/** Your Toast ID. Use this to close it individually */
	toastId: number;
	/** the message of your toast. Stored to prevent duplicates */
	message: string;
	/** a reference to the component see portal.ts */
	portal: ComponentRef<C>;
	/** a reference to your toast */
	toastRef: ToastRef<C>;
	/** triggered when toast is active */
	onShown: Observable<any>;
	/** triggered when toast is destroyed */
	onHidden: Observable<any>;
	/** triggered on toast click */
	onTap: Observable<any>;
	/** available for your use in custom toast */
	onAction: Observable<any>;
}

@Injectable({providedIn: 'root'})
export class ToastService {
	toastrConfig: GlobalConfig;
	currentlyActive = 0;
	toasts: Array<ActiveToast<any>> = [];
	previousToastMessage: string | undefined;
	private index = 0;

	constructor(@Inject(TOAST_CONFIG) token: ToastToken, private overlay: Overlay, private injector: Injector, private ngZone?: NgZone) {
		this.toastrConfig = {...token.default, ...token.config};
		if (token.config.iconClasses) {
			this.toastrConfig.iconClasses = {...token.default.iconClasses, ...token.config.iconClasses};
		}
	}

	/** show toast */
	show(message?: string, title?: string, override: Partial<IndividualConfig> = {}, type = ''): ActiveToast<any> | undefined {
		return this.preBuildNotification(type, message, title, this.applyConfig(override));
	}

	/** show successful toast */
	success(message?: string, title?: string, override: Partial<IndividualConfig> = {}): ActiveToast<any> | undefined {
		const type = this.toastrConfig.iconClasses.success || '';
		return this.preBuildNotification(type, message, title, this.applyConfig(override));
	}

	/** show error toast */
	error(message?: string, title?: string, override: Partial<IndividualConfig> = {}): ActiveToast<any> | undefined {
		const type = this.toastrConfig.iconClasses.error || '';
		return this.preBuildNotification(type, message, title, this.applyConfig(override));
	}

	/** show info toast */
	info(message?: string, title?: string, override: Partial<IndividualConfig> = {}): ActiveToast<any> | undefined {
		const type = this.toastrConfig.iconClasses.info || '';
		return this.preBuildNotification(type, message, title, this.applyConfig(override));
	}

	/** show warning toast */
	warning(message?: string, title?: string, override: Partial<IndividualConfig> = {}): ActiveToast<any> | undefined {
		const type = this.toastrConfig.iconClasses.warning || '';
		return this.preBuildNotification(type, message, title, this.applyConfig(override));
	}

	/**
	 * Remove all or a single toast by id
	 */
	clear(toastId?: number): void {
		// Call every toastRef manualClose function
		for (const toast of this.toasts) {
			if (toastId !== undefined) {
				if (toast.toastId === toastId) {
					toast.toastRef.manualClose();
					return;
				}
			} else {
				toast.toastRef.manualClose();
			}
		}
	}

	/**
	 * Remove and destroy a single toast by id
	 */
	remove(toastId: number): boolean {
		const found = this.findToast(toastId);
		if (!found) {
			return false;
		}
		found.activeToast.toastRef.close();
		this.toasts.splice(found.index, 1);
		this.currentlyActive = this.currentlyActive - 1;
		if (!this.toastrConfig.maxOpened || !this.toasts.length) {
			return false;
		}
		if (
			this.currentlyActive < this.toastrConfig.maxOpened &&
			this.toasts[this.currentlyActive]
		) {
			const p = this.toasts[this.currentlyActive].toastRef;
			if (!p.isInactive()) {
				this.currentlyActive = this.currentlyActive + 1;
				p.activate();
			}
		}
		return true;
	}

	/**
	 * Determines if toast message is already shown
	 */
	findDuplicate(message: string, resetOnDuplicate: boolean, countDuplicates: boolean): ActiveToast<any> | undefined {
		for (const toast of this.toasts) {
			if (toast.message === message) {
				toast.toastRef.onDuplicate(resetOnDuplicate, countDuplicates);
				return toast;
			}
		}
		return;
	}

	/** create a clone of global config and apply individual settings */
	private applyConfig(override: Partial<IndividualConfig> = {}): GlobalConfig {
		return {...this.toastrConfig, ...override};
	}

	/**
	 * Find toast object by id
	 */
	private findToast(toastId: number): { index: number; activeToast: ActiveToast<any> } | undefined {
		for (let i = 0; i < this.toasts.length; i++) {
			if (this.toasts[i].toastId === toastId) {
				return {index: i, activeToast: this.toasts[i]};
			}
		}
		return undefined;
	}

	/**
	 * Determines the need to run inside angular's zone then builds the toast
	 */
	private preBuildNotification(toastType: string, message: string | undefined, title: string | undefined, config: GlobalConfig): ActiveToast<any> | undefined {
		if (config.onActivateTick && this.ngZone) {
			this.ngZone.run(() =>
				this.buildNotification(toastType, message, title, config)
			);
			return;
		}
		return this.buildNotification(toastType, message, title, config);
	}

	private getOverlayConfig(config: GlobalConfig): OverlayConfig {
		// const positionStrategy = this.overlay.position().global().right().top();
		return new OverlayConfig({
			hasBackdrop: false,
			panelClass: ['toast-container', config.positionClass],
			scrollStrategy: this.overlay.scrollStrategies.block()
		});
	}

	private createOverlay(config: GlobalConfig): OverlayRef {
		return this.overlay.create(this.getOverlayConfig(config));
	}

	/**
	 * Creates and attaches toast data to component
	 * returns the active toast, or in case preventDuplicates is enabled the original/non-duplicate active toast.
	 */
	private buildNotification(toastType: string, message: string | undefined, title: string | undefined, config: GlobalConfig): ActiveToast<any> | undefined {
		// max opened and auto dismiss = true
		const duplicate = this.findDuplicate(
			message || '',
			this.toastrConfig.resetTimeoutOnDuplicate,
			this.toastrConfig.countDuplicates
		);
		if (message && this.toastrConfig.preventDuplicates && duplicate !== undefined) {
			return duplicate;
		}

		this.previousToastMessage = message;
		let keepInactive = false;
		if (
			this.toastrConfig.maxOpened &&
			this.currentlyActive >= this.toastrConfig.maxOpened
		) {
			keepInactive = true;
			if (this.toastrConfig.autoDismiss) {
				this.clear(this.toasts[0].toastId);
			}
		}
		this.index = this.index + 1;

		const overlayRef = this.createOverlay(config);
		const toastRef = new ToastRef(overlayRef);
		const toastPackage = new ToastPackage(this.index, config, message, title, toastType, toastRef, () => {
			this.remove(toastPackage.toastId);
		});
		const toastInjector = new ToastInjector(toastPackage, this.injector);
		const containerPortal = new ComponentPortal(ToastComponent, undefined, toastInjector);
		const containerRef: ComponentRef<ToastComponent> = overlayRef.attach(containerPortal);
		toastRef.componentInstance = containerRef.instance;
		const ins: ActiveToast<any> = {
			toastId: this.index,
			message: message || '',
			toastRef,
			onShown: toastRef.afterActivate(),
			onHidden: toastRef.afterClosed(),
			onTap: toastPackage.onTap(),
			onAction: toastPackage.onAction(),
			portal: containerRef
		};

		if (!keepInactive) {
			setTimeout(() => {
				ins.toastRef.activate();
				this.currentlyActive = this.currentlyActive + 1;
			});
		}

		this.toasts.push(ins);
		return ins;
	}
}
