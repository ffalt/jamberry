import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
	selector: 'app-cell-editor-display',
	templateUrl: './cell-editor-display.component.html',
	styleUrls: ['./cell-editor-display.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CellEditorDisplayComponent {
	@Input() lines?: Array<string>;

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	trackByFn(index: number, value: string): string {
		return index.toString();
	}

}
