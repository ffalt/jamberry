import {Component} from '@angular/core';
import {DialogOverlay, DialogOverlayDialogConfig, DialogOverlayRef} from '@app/modules/dialog-overlay';
import {ID3v2Frames} from '@jam';
import {ImageCroppedEvent} from 'ngx-image-cropper';

export interface PicEdit {
	frames: Array<ID3v2Frames.Pic>;
}

@Component({
	selector: 'app-dialog-tag-image',
	templateUrl: './dialog-tag-image.component.html',
	styleUrls: ['./dialog-tag-image.component.scss']
})
export class DialogTagImageComponent implements DialogOverlay<PicEdit> {
	edit: PicEdit;
	pics: Array<{ frame: ID3v2Frames.Pic, base64: string, pic: { mimeType: string, base64: string } }>;
	currentPic: { frame: ID3v2Frames.Pic, base64: string, pic: { mimeType: string, base64: string } };

	dialogInit(reference: DialogOverlayRef, options: Partial<DialogOverlayDialogConfig<PicEdit>>): void {
		this.edit = options.data;
		this.pics = options.data.frames
			.map(frame => ({
				frame,
				base64: `data:${(frame.value.mimeType || 'image/jpeg')};base64,${frame.value.bin}`,
				pic: {mimeType: frame.value.mimeType, base64: frame.value.bin}
			}));
		this.currentPic = this.pics[0];
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

	updateResult(): void {
		this.edit.frames = this.pics.map(p =>
			({...p.frame, value: {...p.frame.value, mimeType: p.pic.mimeType, bin: p.pic.base64}}));
	}

	updatePicture(pic: string): void {
		const mimeType = pic.slice(5, pic.indexOf(';'));
		const base64 = pic.slice(pic.indexOf('base64,') + 7);
		if (!this.currentPic) {
			const frame: ID3v2Frames.Pic = {id: 'APIC', value: {mimeType, description: '', bin: base64, pictureType: 3}};
			this.currentPic = {frame, pic: {base64, mimeType}, base64: pic};
			this.pics.push(this.currentPic);
		} else {
			this.currentPic.pic = {base64, mimeType};
		}
		this.updateResult();
	}

	uploadFile(files: FileList): void {
		if (files.length === 0) {
			return;
		}
		const file: File = files[0];
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = (event: any) => {
			this.currentPic.base64 = event.target.result;
			this.updatePicture(event.target.result);
		};
		reader.onerror = e => {
			console.error(e);
		};
	}

	imageCropped(event: ImageCroppedEvent): void {
		this.updatePicture(event.base64);
	}

}
