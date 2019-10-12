import {CellEditor} from '@app/modules/tag-editor/components/cell-editor/cell-editor.class';
import {Component, EventEmitter, forwardRef, Input, OnChanges, Output, SimpleChanges, ViewChild} from '@angular/core';
import {RawTagEditCell} from '../../model/tag-editor.types';
import {TagEditorInlineAutocompleteComponent} from '../inline-autocomplete/tag-editor-inline-autocomplete.component';

@Component({
	selector: 'app-cell-editor-txt',
	templateUrl: 'cell-editor-txt.component.html',
	styleUrls: ['cell-editor-txt.component.scss'],
	providers: [{provide: CellEditor, useExisting: forwardRef(() => CellEditorTxtComponent)}]
})
export class CellEditorTxtComponent extends CellEditor implements OnChanges {
	original: string = '';
	val: string = '';
	@Input() cell: RawTagEditCell;
	@Output() readonly navigKeyDownRequest = new EventEmitter<{ cell: RawTagEditCell, event: KeyboardEvent }>();
	@ViewChild(TagEditorInlineAutocompleteComponent, {static: false}) editor: TagEditorInlineAutocompleteComponent;

	ngOnChanges(changes: SimpleChanges): void {
		this.changeCell(this.cell);
	}

	navigTo(): void {
		if (this.editor) {
			this.editor.startEdit();
		}
	}

	onValueChange(event: string): void {
		this.val = event;
		this.cell.changed = this.val !== this.original;
		if (this.cell.changed) {
			this.cell.parent.changed = true;
			if (this.cell.frames.length === 0) {
				this.cell.frames.push({id: this.cell.column.def.id, value: {id: this.cell.column.def.subid, text: this.val}});
			} else {
				this.cell.frames = [{id: this.cell.column.def.id, value: {id: this.cell.column.def.subid, text: this.val}}];
			}
		}
	}

	onNavigKeyDown(event: KeyboardEvent): void {
		this.navigKeyDownRequest.emit({cell: this.cell, event});
	}

	protected changeCell(cell: RawTagEditCell): void {
		if (cell) {
			this.original =
				(cell.frames.length === 0 || !cell.frames[0].value || !cell.frames[0].value.text) ?
					'' :
					this.original = cell.frames[0].value.text;
			this.val = this.original;
		}
	}

}
