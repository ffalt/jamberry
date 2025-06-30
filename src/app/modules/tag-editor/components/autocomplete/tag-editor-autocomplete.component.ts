import {ChangeDetectionStrategy, Component, OnChanges, SimpleChanges, output, input} from '@angular/core';
import {AutocompleteDataControl, AutocompleteOption} from '@app/modules/autocomplete';

@Component({
	selector: 'app-tag-editor-autocomplete',
	templateUrl: './tag-editor-autocomplete.component.html',
	styleUrls: ['./tag-editor-autocomplete.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: false
})
export class TagEditorAutocompleteComponent implements AutocompleteDataControl, OnChanges {
	list: Array<{ text: string }> = [];
	focused: boolean = false;
	edit: string = '';
	readonly standalone = input<boolean>(false);
	readonly field = input<string>('text');
	readonly value = input<string>('');
	readonly data = input<any>();
	readonly getList = input<(data: any) => Array<string>>();
	readonly onAutoComplete = input<(query: string) => Promise<Array<string>>>();
	readonly valueChange = output<string>();

	ngOnChanges(changes: SimpleChanges): void {
		if (changes.value && changes.value.currentValue && changes.value.currentValue !== this.edit) {
			this.edit = changes.value.currentValue;
		}
	}

	async autocompleteGetData(query: string): Promise<Array<AutocompleteOption>> {
		if (query.length === 0) {
			return this.list.map(data => ({data}));
		}
		return this.list.filter(data => data.text.includes(query)).map(data => ({data}));
	}

	autocompleteSelectResult(result: AutocompleteOption): string {
		this.edit = result.data.text;
		return this.edit;
	}

	autocompleteEnter(query: string): void {
		this.edit = query;
	}

	onValueChange(): void {
		if (this.value() !== this.edit) {
			this.valueChange.emit(this.edit);
		}
	}

	onFocus(): void {
		this.focused = true;
		if (this.edit === undefined) {
			this.edit = '';
		}
		const getList = this.getList();
		if (getList) {
			this.list = getList(this.data())
				.map(text => ({text}));
		}
	}

	onBlur(): void {
		this.focused = false;
		this.list = [];
	}
}
