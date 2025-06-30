import {AfterViewInit, Component, ElementRef, OnChanges, output, viewChild, input} from '@angular/core';
import {AutocompleteDataControl, AutocompleteOption} from '@app/modules/autocomplete';
import {RawTagEditCell} from '../../model/tag-editor.types';

@Component({
	selector: 'app-cell-editor-txt',
	templateUrl: './cell-editor-txt.component.html',
	styleUrls: ['./cell-editor-txt.component.scss'],
	standalone: false
})
export class CellEditorTxtComponent implements OnChanges, AfterViewInit, AutocompleteDataControl {
	original: string = '';
	val: string = '';
	readonly cell = input<RawTagEditCell>();
	readonly navigKeyDownRequest = output<{ cell: RawTagEditCell; event: KeyboardEvent }>();
	readonly navigBlur = output();
	readonly navigChange = output();
	readonly input = viewChild<ElementRef>('inputEl');

	ngOnChanges(): void {
		this.changeCell(this.cell());
	}

	changeCell(cell?: RawTagEditCell): void {
		if (cell) {
			this.original =
				(cell.frames.length === 0 || !cell.frames[0].value || !cell.frames[0].value.text) ?
					'' :
					this.original = cell.frames[0].value.text;
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
		this.navigBlur.emit();
	}

	onChange(): void {
		const cell = this.cell();
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
			this.navigChange.emit();
		}
	}

	onBlur(): void {
		this.onChange();
		this.navigBlur.emit();
	}

	autocompleteEnter(query: string): void {
		this.val = query;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async autocompleteGetData(query: string): Promise<Array<AutocompleteOption>> {
		// if (query.length === 0) {
		// 	return this.list.map(data => ({data}));
		// }
		// return this.list.filter(data => data.includes(query)).map(data => ({data}));
		return [];
	}

	autocompleteSelectResult(result: AutocompleteOption): string {
		this.val = result.data;
		return this.val;
	}
}
