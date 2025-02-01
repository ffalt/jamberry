import {Component, EventEmitter, Input, Output} from '@angular/core';
import {RawTagEditColumn} from '@app/modules/tag-editor/model/tag-editor.types';
import {TagEditor} from '../../model/tag-editor.class';

@Component({
    selector: 'app-admin-tag-editor-column-tool',
    templateUrl: './column-tool.component.html',
    styleUrls: ['./column-tool.component.scss'],
    standalone: false
})
export class ColumnToolComponent {
	@Input() editor?: TagEditor;
	@Input() activeCol?: RawTagEditColumn;
	@Output() readonly requestClose = new EventEmitter();
	sourceColumnIndex: number = 0;
	multiStr: string = '';

	close(): void {
		this.requestClose.emit();
	}
}
