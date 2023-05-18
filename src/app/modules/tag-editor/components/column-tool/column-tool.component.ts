import {Component, EventEmitter, Input, Output} from '@angular/core';
import {RawTagEditColumn, RawTagEditColumnAction} from '@app/modules/tag-editor/model/tag-editor.types';
import {TagEditor} from '../../model/tag-editor.class';

@Component({
	selector: 'app-admin-tag-editor-column-tool',
	templateUrl: './column-tool.component.html',
	styleUrls: ['./column-tool.component.scss']
})
export class ColumnToolComponent {
	@Input() editor?: TagEditor;
	@Input() activeCol?: RawTagEditColumn;
	@Output() readonly requestClose = new EventEmitter();
	sourceColumnIndex: number = 0;
	multiStr: string = '';

	trackColumnFn(index: number, value: RawTagEditColumn): string {
		return value.def.id;
	}

	trackByActionFn(index: number, value: RawTagEditColumnAction): string {
		return value.title;
	}

	close(): void {
		this.requestClose.emit();
	}
}
