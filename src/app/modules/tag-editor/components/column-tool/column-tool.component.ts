import {Component, output, input} from '@angular/core';
import {RawTagEditColumn} from '@app/modules/tag-editor/model/tag-editor.types';
import {TagEditor} from '../../model/tag-editor.class';

@Component({
	selector: 'app-admin-tag-editor-column-tool',
	templateUrl: './column-tool.component.html',
	styleUrls: ['./column-tool.component.scss'],
	standalone: false
})
export class ColumnToolComponent {
	readonly editor = input<TagEditor>();
	readonly activeCol = input<RawTagEditColumn>();
	readonly requestClose = output();
	sourceColumnIndex: number = 0;
	multiStr: string = '';

	close(): void {
		this.requestClose.emit();
	}
}
