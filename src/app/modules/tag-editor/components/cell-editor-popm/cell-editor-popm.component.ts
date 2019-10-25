import {Component, ElementRef, EventEmitter, forwardRef, HostListener, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {CellEditor} from '@app/modules/tag-editor/components/cell-editor/cell-editor.class';
import {isEnterKey} from '@app/utils/keys';
import {ID3v2Frames} from '@jam';
import {RawTagEditCell} from '../../model/tag-editor.types';

@Component({
	selector: 'app-cell-editor-popm',
	templateUrl: './cell-editor-popm.component.html',
	styleUrls: ['./cell-editor-popm.component.scss'],
	providers: [{provide: CellEditor, useExisting: forwardRef(() => CellEditorPopmComponent)}]
})
export class CellEditorPopmComponent extends CellEditor implements OnChanges {
	ratings: Array<ID3v2Frames.Popularimeter>;
	@Input() cell: RawTagEditCell;
	@Output() readonly navigKeyDownRequest = new EventEmitter<{ cell: RawTagEditCell, event: KeyboardEvent }>();

	constructor(private element: ElementRef) {
		super();
	}

	navigTo(): void {
		if (this.element) {
			this.element.nativeElement.focus();
		}
	}

	onNavigKeyDown(event: KeyboardEvent): void {
		this.navigKeyDownRequest.emit({cell: this.cell, event});
	}

	ngOnChanges(changes: SimpleChanges): void {
		this.changeCell(this.cell);
	}

	@HostListener('keydown', ['$event'])
	onKeyDown(event: KeyboardEvent): void {
		if (!isEnterKey(event)) {
			this.onNavigKeyDown(event);
		}
	}

	protected changeCell(cell: RawTagEditCell): void {
		this.ratings = [];
		if (cell) {
			this.ratings = this.cell.frames;
		}
	}

}
