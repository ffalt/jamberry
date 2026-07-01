import { Component, signal } from '@angular/core';
import type { DialogOverlay, DialogOverlayDialogConfig, DialogOverlayRef } from '@modules/dialog-overlay';
import type { Jam } from '@jam';
import { type ImageCroppedEvent, ImageCropperComponent, type OutputFormat } from 'ngx-image-cropper';
import { FormsModule } from '@angular/forms';

export interface PicEdit {
	frames: Array<Jam.MediaTagRawFramePic>;
	result?: Array<Jam.MediaTagRawFramePic>;
}

@Component({
	selector: 'app-dialog-tag-image',
	templateUrl: './dialog-tag-image.component.html',
	styleUrls: ['./dialog-tag-image.component.scss'],
	imports: [FormsModule, ImageCropperComponent]
})
export class DialogTagImageComponent implements DialogOverlay<PicEdit> {
	edit?: PicEdit;
	maintainAspectRatio: boolean = true;
	readonly current = signal<{ frame?: Jam.MediaTagRawFramePic; source?: string }>({});
	format: OutputFormat = 'jpeg';

	dialogInit(reference: DialogOverlayRef, options: Partial<DialogOverlayDialogConfig<PicEdit>>): void {
		this.edit = options.data;
		if (this.edit) {
			this.edit.result = this.edit.frames.map(frame => ({ id: frame.id, value: { ...frame.value } }));
			if (this.edit.result.length > 0) {
				this.displayFrame(this.edit.result[0]);
			}
		}
	}

	displayFrame(frame: Jam.MediaTagRawFramePic): void {
		const source = `data:${(frame.value.mimeType ?? 'image/jpeg')};base64,${frame.value.bin}`;
		this.current.set({ frame, source });
	}

	onDropFile(event: DragEvent): void {
		event.preventDefault();
		this.uploadFile(event.dataTransfer?.files);
	}

	// At the file input element
	selectFile(event: Event): void {
		const input = event.target as HTMLInputElement;
		this.uploadFile(input.files ?? undefined);
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

	buildFrame(fullBase64: string): Jam.MediaTagRawFramePic {
		const { mimeType, base64 } = this.splitBase64(fullBase64);
		return { id: 'APIC', value: { mimeType, description: '', bin: base64, pictureType: 3 } };
	}

	uploadFile(files?: FileList): void {
		if (!files || files.length === 0) {
			return;
		}
		const file: File = files[0];
		const reader = new FileReader();

		const onLoad = (ev: ProgressEvent<FileReader>): void => {
			const fullBase64 = ev.target?.result;
			if (typeof fullBase64 !== 'string') {
				return;
			}
			let frame = this.current().frame;
			if (!frame) {
				frame = this.buildFrame(fullBase64);
				this.edit?.result?.push(frame);
			}
			const { mimeType, base64 } = this.splitBase64(fullBase64);
			frame.value.mimeType = mimeType;
			frame.value.bin = base64;
			this.current.set({ frame, source: fullBase64 });
		};

		const onError = (e: ProgressEvent<FileReader>): void => {
			console.error(e);
		};

		reader.addEventListener('load', onLoad, { once: true });
		reader.addEventListener('error', onError, { once: true });
		reader.readAsDataURL(file);
	}

	imageCropped(event: ImageCroppedEvent): void {
		const frame = this.current().frame;
		if (!(frame && event.base64)) {
			return;
		}
		const { mimeType, base64 } = this.splitBase64(event.base64);
		frame.value.mimeType = mimeType;
		frame.value.bin = base64;
	}
}
