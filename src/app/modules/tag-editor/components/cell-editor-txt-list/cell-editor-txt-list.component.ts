import {Component, ElementRef, EventEmitter, forwardRef, Input, OnChanges, Output, SimpleChanges, ViewChild} from '@angular/core';
import {CellEditor} from '@app/modules/tag-editor/components/cell-editor/cell-editor.class';
import {RawTagEditCell} from '../../model/tag-editor.types';

@Component({
	selector: 'app-cell-editor-txt-list',
	templateUrl: './cell-editor-txt-list.component.html',
	styleUrls: ['./cell-editor-txt-list.component.scss'],
	providers: [{provide: CellEditor, useExisting: forwardRef(() => CellEditorTxtListComponent)}]
})
export class CellEditorTxtListComponent extends CellEditor implements OnChanges {
	original: string = '';
	val: string = '';
	@Input() cell: RawTagEditCell;
	@Output() readonly navigKeyDownRequest = new EventEmitter<{ cell: RawTagEditCell, event: KeyboardEvent }>();
	@ViewChild('memo', {static: false}) memo: ElementRef;

	ngOnChanges(changes: SimpleChanges): void {
		this.changeCell(this.cell);
	}

	navigTo(): void {
		if (this.memo) {
			this.memo.nativeElement.focus();
		}
	}

	// onKeyDown(event: KeyboardEvent): void {
	// TODO: navigate out of textarea
	// if (isArrowKeys(event)) {
	// if (this.memo.nativeElement)
	// }
	// }

	onValueChange(): void {
		this.cell.changed = this.val !== this.original;
		if (this.cell.changed) {
			this.cell.parent.changed = true;
			if (this.cell.frames.length === 0) {
				this.cell.frames.push({id: this.cell.column.def.id, value: {id: this.cell.column.def.subid, list: this.val.split('\n')}});
			} else {
				this.cell.frames = [{id: this.cell.column.def.id, value: {id: this.cell.column.def.subid, list: this.val.split('\n')}}];
			}
		}
	}

	onNavigKeyDown(event: KeyboardEvent): void {
		this.navigKeyDownRequest.emit({cell: this.cell, event});
	}

	protected changeCell(cell: RawTagEditCell): void {
		if (cell) {
			this.original =
				(cell.frames.length === 0 || !cell.frames[0].value || !cell.frames[0].value.list) ?
					'' :
					this.original = cell.frames[0].value.list.join('\n');
			this.val = this.original;
		}
	}

}
