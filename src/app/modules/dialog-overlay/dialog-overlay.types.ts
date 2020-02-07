import {DialogOverlayRef} from '@app/modules/dialog-overlay/dialog-overlay-ref.class';

export interface DialogOverlayDialogConfig<T> {
	panelClass?: string;
	hasBackdrop?: boolean;
	backdropClass?: string;
	title?: string;
	data?: T;
	childComponent?: any;

	onOkBtn?(): Promise<void>;

	onCancelBtn?(): Promise<void>;
}

export const DEFAULT_CONFIG: DialogOverlayDialogConfig<any> = {
	hasBackdrop: true,
	backdropClass: 'dark-backdrop'
};

export interface DialogOverlay<T> {
	dialogInit(reference: DialogOverlayRef, options: Partial<DialogOverlayDialogConfig<T>>): void;

	dialogResult?(): any;
}
