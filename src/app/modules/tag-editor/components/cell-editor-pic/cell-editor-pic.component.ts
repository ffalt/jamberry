import {Component, ElementRef, EventEmitter, forwardRef, HostListener, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {DialogOverlayService} from '@app/modules/dialog-overlay';
import {CellEditor} from '@app/modules/tag-editor/components/cell-editor/cell-editor.class';
import {isEnterKey} from '@app/utils/keys';
import {RawTagEditCell} from '../../model/tag-editor.types';
import {DialogPicComponent, PicEdit, PicFrame} from '../dialog-pic/dialog-pic.component';

export const Id3v2ValuePicTypes: { [name: string]: string; } = {
	0: 'Other',
	1: '32x32 pixels \'file icon\' (PNG only)',
	2: 'Other file icon',
	3: 'Cover (front)',
	4: 'Cover (back)',
	5: 'Leaflet page',
	6: 'Media (e.g. lable side of CD)',
	7: 'Lead artist/lead performer/soloist',
	8: 'Artist/performer',
	9: 'Conductor',
	10: 'Band/Orchestra',
	11: 'Composer',
	12: 'Lyricist/text writer',
	13: 'Recording Location',
	14: 'During recording',
	15: 'During performance',
	16: 'Movie/video screen capture',
	17: 'A bright coloured fish',
	18: 'Illustration',
	19: 'Band/artist logotype',
	20: 'Publisher/Studio logotype'
};

@Component({
	selector: 'app-cell-editor-pic',
	templateUrl: './cell-editor-pic.component.html',
	styleUrls: ['./cell-editor-pic.component.scss'],
	providers: [{provide: CellEditor, useExisting: forwardRef(() => CellEditorPicComponent)}]
})
export class CellEditorPicComponent extends CellEditor implements OnChanges {
	pics: Array<PicFrame>;
	@Input() cell: RawTagEditCell;
	@Output() readonly navigKeyDownRequest = new EventEmitter<{ cell: RawTagEditCell, event: KeyboardEvent }>();

	constructor(private dialogOverlay: DialogOverlayService, private element: ElementRef) {
		super();
	}

	navigTo(): void {
		if (this.element) {
			this.element.nativeElement.focus();
		}
	}

	@HostListener('click', ['$event'])
	clickEvent(event: MouseEvent): void {
		this.editPictures();
	}

	@HostListener('keydown', ['$event'])
	onKeyDown(event: KeyboardEvent): void {
		if (isEnterKey(event)) {
			this.editPictures();
		} else {
			this.onNavigKeyDown(event);
		}
	}

	ngOnChanges(changes: SimpleChanges): void {
		this.changeCell(this.cell);
	}

	onNavigKeyDown(event: KeyboardEvent): void {
		this.navigKeyDownRequest.emit({cell: this.cell, event});
	}

	editPictures(): void {
		const data: PicEdit = {frames: this.pics};
		this.dialogOverlay.open({
			title: 'Tag Pictures',
			childComponent: DialogPicComponent,
			data,
			onOkBtn: async () => {
				this.pics = data.frames;
				this.cell.changed = true;
				this.cell.parent.changed = true;
				return Promise.resolve();
			},
			onCancelBtn: async () => Promise.resolve()
		});
	}

	protected changeCell(cell: RawTagEditCell): void {
		this.pics = [];
		if (cell) {
			this.pics = (cell.frames || []).map((frame, index) => {
				let name = `Pic${index}`;
				if (frame.value && Id3v2ValuePicTypes[frame.value.pictureType]) {
					name = Id3v2ValuePicTypes[frame.value.pictureType];
				}
				return {name, frame};
			});
		}
	}

}
