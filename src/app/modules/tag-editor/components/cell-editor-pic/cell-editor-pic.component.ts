import {Component, ElementRef, EventEmitter, forwardRef, HostListener, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {DialogOverlayService} from '@app/modules/dialog-overlay';
import {CellEditor} from '@app/modules/tag-editor/components/cell-editor/cell-editor.class';
import {isEnterKey} from '@app/utils/keys';
import {ID3v2Frames} from '@jam';
import {RawTagEditCell} from '../../model/tag-editor.types';
import {DialogTagImageComponent, PicEdit} from '../dialog-tag-image/dialog-tag-image.component';

@Component({
	selector: 'app-cell-editor-pic',
	templateUrl: './cell-editor-pic.component.html',
	styleUrls: ['./cell-editor-pic.component.scss'],
	providers: [{provide: CellEditor, useExisting: forwardRef(() => CellEditorPicComponent)}]
})
export class CellEditorPicComponent extends CellEditor implements OnChanges {
	pics: Array<ID3v2Frames.Pic>;
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
		const data: PicEdit = {frames: this.pics.slice(0)};
		this.dialogOverlay.open({
			title: 'Tag Pictures',
			childComponent: DialogTagImageComponent,
			data,
			onOkBtn: async () => {
				this.pics = data.frames;
				this.cell.changed = true;
				this.cell.parent.changed = true;
				this.cell.frames = data.frames;
				return Promise.resolve();
			},
			onCancelBtn: async () => Promise.resolve()
		});
	}

	protected changeCell(cell: RawTagEditCell): void {
		this.pics = cell ? (cell.frames || []) : [];
	}

}
