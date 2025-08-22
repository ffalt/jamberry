import { Component } from '@angular/core';
import type { DialogOverlay, DialogOverlayDialogConfig, DialogOverlayRef } from '@modules/dialog-overlay';
import type { Jam } from '@jam';
import { FormsModule } from '@angular/forms';

export interface TextListEdit {
	id: string;
	frames: Array<Jam.MediaTagRawFrameTextList>;
	result?: Array<Jam.MediaTagRawFrameTextList>;
}

@Component({
	selector: 'app-dialog-tag-textlist',
	templateUrl: './dialog-tag-textlist.component.html',
	styleUrls: ['./dialog-tag-textlist.component.scss'],
	imports: [FormsModule]
})
export class DialogTagTextlistComponent implements DialogOverlay<TextListEdit> {
	edit?: TextListEdit;
	current?: Jam.MediaTagRawFrameTextList;
	currentText?: string;

	dialogInit(reference: DialogOverlayRef, options: Partial<DialogOverlayDialogConfig<TextListEdit>>): void {
		this.edit = options.data;
		if (this.edit) {
			this.edit.result = this.edit.frames.map(frame => ({ id: frame.id, value: { ...frame.value } }));
			if (this.edit.result.length === 0) {
				const frame: Jam.MediaTagRawFrameTextList = { id: this.edit.id, value: { list: [] } };
				this.edit.result.push(frame);
			}
			this.current = this.edit.result[0];
			this.currentText = this.current.value.list.join('\n');
		}
	}

	onBlur(): void {
		if (this.current && this.currentText) {
			this.current.value.list = this.currentText.split('\n');
		}
	}
}
