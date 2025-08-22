import { Component } from '@angular/core';
import type { DialogOverlay, DialogOverlayDialogConfig, DialogOverlayRef } from '@modules/dialog-overlay';
import type { Jam } from '@jam';
import { FormsModule } from '@angular/forms';

export interface LyricsEdit {
	frames: Array<Jam.MediaTagRawFrameLangDescText>;
	result?: Array<Jam.MediaTagRawFrameLangDescText>;
}

@Component({
	selector: 'app-dialog-tag-lyrics',
	templateUrl: './dialog-tag-lyrics.component.html',
	styleUrls: ['./dialog-tag-lyrics.component.scss'],
	imports: [FormsModule]
})
export class DialogTagLyricsComponent implements DialogOverlay<LyricsEdit> {
	edit?: LyricsEdit;
	currentLyrics?: Jam.MediaTagRawFrameLangDescText;

	dialogInit(reference: DialogOverlayRef, options: Partial<DialogOverlayDialogConfig<LyricsEdit>>): void {
		this.edit = options.data;
		if (this.edit) {
			this.edit.result = this.edit.frames.map(frame => ({ id: frame.id, value: { ...frame.value } }));
			if (this.edit.result.length === 0) {
				const frame = { id: 'USLT', value: { id: '', language: '', text: '' } };
				this.edit.result.push(frame);
			}
			this.currentLyrics = this.edit.result[0];
		}
	}
}
