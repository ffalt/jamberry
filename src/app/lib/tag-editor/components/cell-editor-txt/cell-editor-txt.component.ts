import { type AfterViewInit, Component, type ElementRef, Input, type OnChanges, output, viewChild } from '@angular/core';
import { Subject } from 'rxjs';
import type { RawTagEditCell } from '../../model/tag-editor.types';
import type { AutocompleteDataControl, AutocompleteOption } from '@modules/autocomplete/autocomplete.types';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'app-cell-editor-txt',
	templateUrl: './cell-editor-txt.component.html',
	styleUrls: ['./cell-editor-txt.component.scss'],
	imports: [FormsModule]
})
export class CellEditorTxtComponent implements OnChanges, AfterViewInit, AutocompleteDataControl<string> {
	readonly navigKeyDownRequest = output<{ cell: RawTagEditCell<string>; event: KeyboardEvent }>();
	readonly navigBlur = new Subject();
	readonly navigChange = new Subject();
	readonly input = viewChild<ElementRef<HTMLInputElement>>('inputEl');
	original: string = '';
	val: string = '';
	@Input() cell?: RawTagEditCell<{ id?: string; text: string }>;

	ngOnChanges(): void {
		this.changeCell(this.cell);
	}

	changeCell(cell?: RawTagEditCell<{ id?: string; text: string }>): void {
		if (cell) {
			this.original =
				(cell.frames.length === 0 || !cell.frames[0].value.text) ? '' : cell.frames[0].value.text;
			this.val = this.original;
		}
	}

	ngAfterViewInit(): void {
		setTimeout(() => {
			const input = this.input();
			if (input?.nativeElement) {
				input.nativeElement.focus();
			}
		}, 0);
	}

	onEnter(): void {
		this.onChange();
		this.navigBlur.next(undefined);
	}

	onChange(): void {
		const cell = this.cell;
		if (!cell) {
			return;
		}
		if (this.val !== this.original) {
			if (cell.frames.length === 0) {
				cell.frames.push({
					id: cell.column.def.id, value: {
						id: cell.column.def.subid,
						text: this.val
					}
				});
			}
			cell.frames[0].value.text = this.val;
			this.navigChange.next(undefined);
		}
	}

	onBlur(): void {
		this.onChange();
		this.navigBlur.next(undefined);
	}

	autocompleteEnter(query: string): void {
		this.val = query;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async autocompleteGetData(query: string): Promise<Array<AutocompleteOption<string>>> {
		return [];
	}

	autocompleteSelectResult(result: AutocompleteOption<string>): string {
		this.val = result.data;
		return this.val;
	}
}
