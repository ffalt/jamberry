import { Component, input, output } from '@angular/core';
import type { RawTagEditColumn } from '../../model/tag-editor.types';
import type { TagEditor } from '../../model/tag-editor.class';
import { FormsModule } from '@angular/forms';
import { TagEditorAutocompleteComponent } from '../autocomplete/tag-editor-autocomplete.component';
import { IconDownThinComponent } from '@core/components/icons/icon-down-thin.component';

@Component({
	selector: 'app-admin-tag-editor-column-tool',
	templateUrl: './column-tool.component.html',
	styleUrls: ['./column-tool.component.scss'],
	imports: [FormsModule, IconDownThinComponent, TagEditorAutocompleteComponent]
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
