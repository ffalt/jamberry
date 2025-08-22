import { ChangeDetectionStrategy, Component, input, type OnChanges, output } from '@angular/core';
import type { AutocompleteDataControl, AutocompleteOption } from '@modules/autocomplete/autocomplete.types';
import { FormsModule } from '@angular/forms';
import { AutocompleteComponent } from '@modules/autocomplete/autocomplete.component';
import { OptionHeaderComponent } from '@modules/autocomplete/option/option-header.component';
import { AutocompleteContentDirective } from '@modules/autocomplete/autocomplete-content.directive';
import { OptionComponent } from '@modules/autocomplete/option/option.component';
import { AutocompleteDirective } from '@modules/autocomplete/autocomplete.directive';

@Component({
	selector: 'app-tag-editor-autocomplete',
	templateUrl: './tag-editor-autocomplete.component.html',
	styleUrls: ['./tag-editor-autocomplete.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [FormsModule, AutocompleteComponent, OptionComponent, OptionHeaderComponent,
		AutocompleteDirective, AutocompleteContentDirective]
})
export class TagEditorAutocompleteComponent implements AutocompleteDataControl<{ text: string }>, OnChanges {
	readonly standalone = input<boolean>(false);
	readonly field = input<string>('text');
	readonly value = input<string>('');
	readonly data = input<any>();
	readonly getList = input<(data: any) => Array<string>>();
	readonly onAutoComplete = input<(query: string) => Promise<Array<string>>>();
	readonly valueChange = output<string | undefined>();
	list: Array<{ text: string }> = [];
	focused: boolean = false;
	edit?: string = '';

	ngOnChanges(changes: { value?: { currentValue?: string } }): void {
		if (changes.value?.currentValue && changes.value.currentValue !== this.edit) {
			this.edit = changes.value.currentValue;
		}
	}

	async autocompleteGetData(query: string): Promise<Array<AutocompleteOption<{ text: string }>>> {
		if (query.length === 0) {
			return this.list.map(data => ({ data }));
		}
		return this.list.filter(data => data.text.includes(query)).map(data => ({ data }));
	}

	autocompleteSelectResult(result: AutocompleteOption<{ text: string }>): string {
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
		this.edit ??= '';
		const getList = this.getList();
		if (getList) {
			this.list = getList(this.data())
				.map(text => ({ text }));
		}
	}

	onBlur(): void {
		this.focused = false;
		this.list = [];
	}
}
