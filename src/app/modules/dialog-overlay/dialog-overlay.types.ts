import type { Type } from '@angular/core';
import type { DialogOverlayRef } from '@modules/dialog-overlay/dialog-overlay-ref.class';

export interface DialogOverlayDialogConfig<T> {
	panelClass?: string;
	hasBackdrop?: boolean;
	backdropClass?: string;
	title?: string;
	data?: T;
	childComponent?: Type<DialogOverlay<T>>;

	onOkBtn?(): Promise<void>;

	onCancelBtn?(): Promise<void>;
}

export const DEFAULT_CONFIG: Partial<DialogOverlayDialogConfig<any>> = {
	hasBackdrop: true,
	backdropClass: 'dark-backdrop'
};

export interface DialogOverlay<T> {
	dialogInit(reference: DialogOverlayRef, options: Partial<DialogOverlayDialogConfig<T>>): void;

	dialogResult?(): boolean;
}
