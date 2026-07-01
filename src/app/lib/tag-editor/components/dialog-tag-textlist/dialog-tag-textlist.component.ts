import { Component, signal } from '@angular/core';
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
	readonly currentText = signal<string | undefined>(undefined);
	edit?: TextListEdit;
	current?: Jam.MediaTagRawFrameTextList;

	dialogInit(_reference: DialogOverlayRef, options: Partial<DialogOverlayDialogConfig<TextListEdit>>): void {
		this.edit = options.data;
		if (this.edit) {
			this.edit.result = this.edit.frames.map(frame => ({ id: frame.id, value: { ...frame.value } }));
			if (this.edit.result.length === 0) {
				const frame: Jam.MediaTagRawFrameTextList = { id: this.edit.id, value: { list: [] } };
				this.edit.result.push(frame);
			}
			this.current = this.edit.result[0];
			this.currentText.set(this.current.value.list.join('\n'));
		}
	}

	onBlur(): void {
		const text = this.currentText();
		if (this.current && text) {
			this.current.value.list = text.split('\n');
		}
	}
}
