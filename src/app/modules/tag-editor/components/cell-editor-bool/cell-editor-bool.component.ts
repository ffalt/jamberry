import {CellEditor} from '@app/modules/tag-editor/components/cell-editor/cell-editor.class';
import {
	Component,
	ElementRef,
	EventEmitter,
	forwardRef,
	HostListener,
	Input,
	OnChanges,
	Output,
	SimpleChanges,
	ViewChild
} from '@angular/core';
import {isEnterKey} from '@app/utils/keys';
import {RawTagEditCell} from '../../model/tag-editor.types';

@Component({
	selector: 'app-cell-editor-bool',
	templateUrl: 'cell-editor-bool.component.html',
	styleUrls: ['cell-editor-bool.component.scss'],
	providers: [{provide: CellEditor, useExisting: forwardRef(() => CellEditorBoolComponent)}]
})
export class CellEditorBoolComponent extends CellEditor implements OnChanges {
	original?: boolean;
	val?: boolean;
	@Input() cell: RawTagEditCell;
	@Output() readonly navigKeyDownRequest = new EventEmitter<{ cell: RawTagEditCell, event: KeyboardEvent }>();
	@ViewChild('inputEl', {static: false}) input: ElementRef;

	constructor(protected element: ElementRef) {
		super();
	}

	navigTo(): void {
		if (this.input) {
			this.input.nativeElement.focus();
		}
	}

	ngOnChanges(changes: SimpleChanges): void {
		this.changeCell(this.cell);
	}

	onNavigKeyDown(event: KeyboardEvent): void {
		this.navigKeyDownRequest.emit({cell: this.cell, event});
	}

	@HostListener('keydown', ['$event'])
	onKeyDown(event: KeyboardEvent): void {
		if (isEnterKey(event)) {
			this.val = !this.val;
		} else {
			this.onNavigKeyDown(event);
		}
	}

	onValueChange(event: boolean): void {
		this.val = event;
		this.cell.changed = this.val !== this.original;
		if (this.cell.changed) {
			this.cell.parent.changed = true;
			this.cell.frames = [{id: this.cell.column.def.id, value: {id: this.cell.column.def.subid, bool: this.val}}];
		}
	}

	protected changeCell(cell: RawTagEditCell): void {
		if (cell) {
			this.original = (cell.frames.length === 0 || !cell.frames[0].value || !cell.frames[0].value.bool) ?
				undefined :
				cell.frames[0].value.bool;
			this.val = this.original;
		}
	}

}
