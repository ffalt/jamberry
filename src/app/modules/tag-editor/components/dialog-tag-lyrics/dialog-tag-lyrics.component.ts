import {Component} from '@angular/core';
import {DialogOverlay, DialogOverlayDialogConfig, DialogOverlayRef} from '@app/modules/dialog-overlay';
import {ID3v2Frames} from '@jam';

export interface LyricsEdit {
	frames: Array<ID3v2Frames.LangDescText>;
	result?: Array<ID3v2Frames.LangDescText>;
}

@Component({
    selector: 'app-dialog-tag-lyrics',
    templateUrl: './dialog-tag-lyrics.component.html',
    styleUrls: ['./dialog-tag-lyrics.component.scss'],
    standalone: false
})
export class DialogTagLyricsComponent implements DialogOverlay<LyricsEdit> {
	edit?: LyricsEdit;
	currentLyrics?: ID3v2Frames.LangDescText;

	dialogInit(reference: DialogOverlayRef, options: Partial<DialogOverlayDialogConfig<LyricsEdit>>): void {
		this.edit = options.data;
		if (this.edit) {
			this.edit.result = this.edit.frames.map(frame => ({id: frame.id, value: {...frame.value}}));
			if (this.edit.result.length === 0) {
				const frame = {id: 'USLT', value: {id: '', language: '', text: ''}};
				this.edit.result.push(frame);
			}
			this.currentLyrics = this.edit.result[0];
		}
	}

}
