import {Component} from '@angular/core';
import {DialogOverlay, DialogOverlayDialogConfig, DialogOverlayRef} from '@app/modules/dialog-overlay';
import {ID3v2Frames} from '@jam';

export interface TextListEdit {
	id: string;
	frames: Array<ID3v2Frames.TextList>;
	result?: Array<ID3v2Frames.TextList>;
}

@Component({
	selector: 'app-dialog-tag-textlist',
	templateUrl: './dialog-tag-textlist.component.html',
	styleUrls: ['./dialog-tag-textlist.component.scss']
})
export class DialogTagTextlistComponent implements DialogOverlay<TextListEdit> {
	edit?: TextListEdit;
	current?: ID3v2Frames.TextList;
	currentText?: string;

	dialogInit(reference: DialogOverlayRef, options: Partial<DialogOverlayDialogConfig<TextListEdit>>): void {
		this.edit = options.data;
		if (this.edit) {
			this.edit.result = this.edit.frames.map(frame => ({id: frame.id, value: {...frame.value}}));
			if (this.edit.result.length === 0) {
				const frame: ID3v2Frames.TextList = {id: this.edit.id, value: {list: []}};
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
