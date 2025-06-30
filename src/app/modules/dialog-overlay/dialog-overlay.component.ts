import {
	Component,
	ComponentRef,
	OnInit,
	ViewContainerRef,
	ViewEncapsulation,
	inject,
	viewChild
} from '@angular/core';
import {isEscapeKey} from '@app/utils/keys';
import {DialogOverlayRef} from './dialog-overlay-ref.class';
import {DIALOG_OVERLAY_DIALOG_CONFIG} from './dialog-overlay.tokens';
import {DialogOverlay, DialogOverlayDialogConfig} from './dialog-overlay.types';

@Component({
	selector: 'app-dialog-overlay',
	templateUrl: './dialog-overlay.component.html',
	styleUrls: ['./dialog-overlay.component.scss'],
	// eslint-disable-next-line @angular-eslint/use-component-view-encapsulation
	encapsulation: ViewEncapsulation.None,
	standalone: false,
	host: {
		'(document:keydown)': 'handleKeydown($event)'
	}
})
export class DialogOverlayComponent implements OnInit {
	isBusy: boolean = false;
	childComponentRef?: ComponentRef<DialogOverlay<any>>;
	readonly dialogRef = inject(DialogOverlayRef);
	readonly config = inject<DialogOverlayDialogConfig<any>>(DIALOG_OVERLAY_DIALOG_CONFIG);
	private readonly dynamicComponentTarget = viewChild('overlayDialogBody', {read: ViewContainerRef});

	handleKeydown(event: KeyboardEvent): void {
		if (isEscapeKey(event)) {
			this.dialogRef.close();
		}
	}

	ngOnInit(): void {
		const dynamicComponentTarget = this.dynamicComponentTarget();
		if (this.config.childComponent && dynamicComponentTarget) {
			this.childComponentRef = dynamicComponentTarget.createComponent(this.config.childComponent) as ComponentRef<DialogOverlay<any>>;
			this.childComponentRef.instance.dialogInit(this.dialogRef, this.config);
		}
	}

	getResult(): any {
		if (this.childComponentRef && this.childComponentRef.instance.dialogResult) {
			return this.childComponentRef.instance.dialogResult();
		}
	}

	ok(): void {
		if (this.isBusy || !this.config.onOkBtn) {
			return;
		}
		this.isBusy = true;
		this.config.onOkBtn().then(() => {
			this.isBusy = false;
			this.dialogRef.close();
		}).catch(() => {
			this.isBusy = false;
		});
	}

	cancel(): void {
		if (this.isBusy || !this.config.onCancelBtn) {
			return;
		}
		this.isBusy = true;
		this.config.onCancelBtn().then(() => {
			this.isBusy = false;
			this.dialogRef.close();
		}).catch(() => {
			this.isBusy = false;
		});
	}

	close(): void {
		this.dialogRef.close();
	}
}
