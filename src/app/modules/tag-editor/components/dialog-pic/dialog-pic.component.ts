import {Component} from '@angular/core';
import {DialogOverlay, DialogOverlayDialogConfig, DialogOverlayRef} from '@app/modules/dialog-overlay';
import {RawTagEditFrame} from '../../model/tag-editor.types';
import {Base64Image} from '../image-base64/image-base64.component';

export interface PicFrame {
	name: string;
	frame: RawTagEditFrame;
}

export interface PicEdit {
	frames: Array<PicFrame>;
}

@Component({
	selector: 'app-dialog-pic',
	templateUrl: './dialog-pic.component.html',
	styleUrls: ['./dialog-pic.component.scss']
})
export class DialogPicComponent implements DialogOverlay<PicEdit> {
	pics: Array<{ frame: PicFrame, pic: Base64Image }>;
	currentPic: { frame: PicFrame, pic: Base64Image };

	dialogInit(reference: DialogOverlayRef, options: Partial<DialogOverlayDialogConfig<PicEdit>>): void {
		this.pics = options.data.frames.map(frame => ({frame, pic: {mimeType: frame.frame.value.mimeType, base64: frame.frame.value.bin}}));
		this.currentPic = this.pics[0];
	}

}
