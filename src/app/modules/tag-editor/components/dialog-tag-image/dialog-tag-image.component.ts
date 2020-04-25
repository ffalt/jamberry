import {Component} from '@angular/core';
import {DialogOverlay, DialogOverlayDialogConfig, DialogOverlayRef} from '@app/modules/dialog-overlay';
import {ID3v2Frames} from '@jam';
import {ImageCroppedEvent} from 'ngx-image-cropper';

export interface PicEdit {
	frames: Array<ID3v2Frames.Pic>;
	result?: Array<ID3v2Frames.Pic>;
}

@Component({
	selector: 'app-dialog-tag-image',
	templateUrl: './dialog-tag-image.component.html',
	styleUrls: ['./dialog-tag-image.component.scss']
})
export class DialogTagImageComponent implements DialogOverlay<PicEdit> {
	edit: PicEdit;
	maintainAspectRatio: boolean = true;
	current: { frame?: ID3v2Frames.Pic; source?: string } = {};

	dialogInit(reference: DialogOverlayRef, options: Partial<DialogOverlayDialogConfig<PicEdit>>): void {
		this.edit = options.data;
		this.edit.result = options.data.frames.map(frame => ({id: frame.id, value: {...frame.value}}));
		if (this.edit.result.length > 0) {
			this.displayFrame(this.edit.result[0]);
		}
	}

	displayFrame(frame: ID3v2Frames.Pic): void {
		const base64 = `data:${(frame.value.mimeType || 'image/jpeg')};base64,${frame.value.bin}`;
		this.current.frame = frame;
		this.current.source = base64;
	}

	onDropFile(event: DragEvent): void {
		event.preventDefault();
		this.uploadFile(event.dataTransfer.files);
	}

	// At the file input element
	selectFile(event: any): void {
		this.uploadFile(event.target.files);
	}

	// At the drag drop area
	onDragOverFile(event: MouseEvent): void {
		event.stopPropagation();
		event.preventDefault();
	}

	splitBase64(fullBase64: string): { mimeType: string; base64: string } {
		return {
			mimeType: fullBase64.slice(5, fullBase64.indexOf(';')),
			base64: fullBase64.slice(fullBase64.indexOf('base64,') + 7)
		};
	}

	buildFrame(fullBase64: string): ID3v2Frames.Pic {
		const {mimeType, base64} = this.splitBase64(fullBase64);
		return {id: 'APIC', value: {mimeType, description: '', bin: base64, pictureType: 3}};
	}

	uploadFile(files: FileList): void {
		if (files.length === 0) {
			return;
		}
		const file: File = files[0];
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = (event: any): void => {
			const fullBase64 = event.target.result;
			if (!this.current.frame) {
				this.current.frame = this.buildFrame(fullBase64);
				this.edit.result.push(this.current.frame);
			}
			this.current.source = fullBase64;
			const {mimeType, base64} = this.splitBase64(fullBase64);
			this.current.frame.value.mimeType = mimeType;
			this.current.frame.value.bin = base64;
		};
		reader.onerror = (e): void => {
			console.error(e);
		};
	}

	loadImageFailed(): void {
		// console.log('loadImageFailed');
	}

	cropperReady(): void {
		// console.log('cropperReady');
	}

	imageLoaded(): void {
		// console.log('imageLoaded');
	}

	imageCropped(event: ImageCroppedEvent): void {
		// console.log('imageCropped', event);
		if (this.current) {
			const {mimeType, base64} = this.splitBase64(event.base64);
			this.current.frame.value.mimeType = mimeType;
			this.current.frame.value.bin = base64;
		}
	}

}
