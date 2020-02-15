import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild} from '@angular/core';
import {AutocompleteDataControl, AutocompleteOption} from '@app/modules/autocomplete';
import {RawTagEditCell} from '../../model/tag-editor.types';

@Component({
	selector: 'app-cell-editor-txt',
	templateUrl: './cell-editor-txt.component.html',
	styleUrls: ['./cell-editor-txt.component.scss']
})
export class CellEditorTxtComponent implements OnChanges, AfterViewInit, AutocompleteDataControl {
	original: string = '';
	val: string = '';
	@Input() cell: RawTagEditCell;
	@Output() readonly navigKeyDownRequest = new EventEmitter<{ cell: RawTagEditCell, event: KeyboardEvent }>();
	@Output() readonly navigBlur = new EventEmitter<void>();
	@Output() readonly navigChange = new EventEmitter<void>();
	@ViewChild('inputEl', {static: true}) input: ElementRef;

	ngOnChanges(changes: SimpleChanges): void {
		this.changeCell(this.cell);
	}

	onNavigKeyDown(event: KeyboardEvent): void {
		this.navigKeyDownRequest.emit({cell: this.cell, event});
	}

	changeCell(cell: RawTagEditCell): void {
		if (cell) {
			this.original =
				(cell.frames.length === 0 || !cell.frames[0].value || !cell.frames[0].value.text) ?
					'' :
					this.original = cell.frames[0].value.text;
			this.val = this.original;
		}
	}

	ngAfterViewInit(): void {
		setTimeout(() => this.input.nativeElement.focus(), 0);
	}

	onEnter(): void {
		this.onChange();
		this.navigBlur.emit();
	}

	onChange(): void {
		if (this.val !== this.original) {
			if (this.cell.frames.length === 0) {
				this.cell.frames.push({
					id: this.cell.column.def.id, value: {
						id: this.cell.column.def.subid,
						text: this.val
					}
				});
			}
			this.cell.frames[0].value.text = this.val;
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
