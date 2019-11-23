import {Component} from '@angular/core';
import {DialogOverlay, DialogOverlayDialogConfig, DialogOverlayRef} from '@app/modules/dialog-overlay';
import {ID3v2Frames} from '@jam';

export interface LyricsEdit {
	frames: Array<ID3v2Frames.LangDescText>;
}

@Component({
	selector: 'app-dialog-tag-lyrics',
	templateUrl: './dialog-tag-lyrics.component.html',
	styleUrls: ['./dialog-tag-lyrics.component.scss']
})
export class DialogTagLyricsComponent implements DialogOverlay<LyricsEdit> {
	edit: LyricsEdit;
	lyrics: Array<{ frame: ID3v2Frames.LangDescText, text: string }>;
	currentLyrics: { frame: ID3v2Frames.LangDescText, text: string };

	dialogInit(reference: DialogOverlayRef, options: Partial<DialogOverlayDialogConfig<LyricsEdit>>): void {
		this.edit = options.data;
		this.lyrics = options.data.frames.map(frame => ({frame, text: frame.value.text}));
		this.currentLyrics = this.lyrics[0];
		if (!this.currentLyrics) {
			this.currentLyrics = {frame: {id: 'USLT', value: {id: '', language: '', text: ''}}, text: ''};
			this.lyrics.push(this.currentLyrics);
		}
	}

	updateResult(): void {
		this.edit.frames = this.lyrics.map(p => ({...p.frame, value: {...p.frame.value, text: p.text}}));
	}
}
