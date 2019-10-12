import {CellEditor} from '@app/modules/tag-editor/components/cell-editor/cell-editor.class';
import {Component, ElementRef, EventEmitter, forwardRef, Input, Output} from '@angular/core';
import {RawTagEditCell} from '../../model/tag-editor.types';

@Component({
	selector: 'app-cell-editor-unknown',
	templateUrl: 'cell-editor-unknown.component.html',
	styleUrls: ['cell-editor-unknown.component.scss'],
	providers: [{provide: CellEditor, useExisting: forwardRef(() => CellEditorUnknownComponent)}]
})
export class CellEditorUnknownComponent extends CellEditor {
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

}
