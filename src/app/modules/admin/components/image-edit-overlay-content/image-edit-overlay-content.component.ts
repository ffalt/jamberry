import {ImageEdit} from '@admin/components/artwork-edit/artwork-edit.component';
import {Component} from '@angular/core';
import {DialogOverlay, DialogOverlayDialogConfig, DialogOverlayRef} from '@app/modules/dialog-overlay';

@Component({
	selector: 'app-image-edit-overlay-content',
	templateUrl: './image-edit-overlay-content.component.html',
	styleUrls: ['./image-edit-overlay-content.scss']
})
export class ImageEditOverlayContentComponent implements DialogOverlay<ImageEdit> {
	data: ImageEdit;
	reference: DialogOverlayRef;
	loading = true;

	dialogInit(reference: DialogOverlayRef, options: Partial<DialogOverlayDialogConfig<ImageEdit>>): void {
		this.data = options.data;
		this.reference = reference;
	}

	onImageEdited(): void {
		this.reference.close();
	}
}
