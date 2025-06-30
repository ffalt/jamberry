import {ChangeDetectionStrategy, Component, input} from '@angular/core';

@Component({
	selector: 'app-cell-editor-display',
	templateUrl: './cell-editor-display.component.html',
	styleUrls: ['./cell-editor-display.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: false
})
export class CellEditorDisplayComponent {
	readonly lines = input<Array<string>>();
}
