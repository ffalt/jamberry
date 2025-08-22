import { Component, type ElementRef, input, model, output, viewChild } from '@angular/core';
import { type ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import type { AutocompleteDataControl, AutocompleteOption } from '@modules/autocomplete/autocomplete.types';
import { AutocompleteDirective } from '@modules/autocomplete/autocomplete.directive';
import { OptionComponent } from '@modules/autocomplete/option/option.component';
import { OptionHeaderComponent } from '@modules/autocomplete/option/option-header.component';
import { AutocompleteComponent } from '@modules/autocomplete/autocomplete.component';
import { AutocompleteContentDirective } from '@modules/autocomplete/autocomplete-content.directive';

@Component({
	selector: 'app-tag-editor-inline-autocomplete',
	templateUrl: './tag-editor-inline-autocomplete.component.html',
	styleUrls: ['./tag-editor-inline-autocomplete.component.scss'],
	providers: [{
		provide: NG_VALUE_ACCESSOR,
		useExisting: TagEditorInlineAutocompleteComponent,
		multi: true
	}],
	imports: [FormsModule, AutocompleteComponent, AutocompleteDirective, OptionComponent, OptionHeaderComponent, AutocompleteContentDirective]
})
export class TagEditorInlineAutocompleteComponent implements ControlValueAccessor, AutocompleteDataControl<string> {
	readonly getList = input<(data: any) => Array<string>>();
	readonly value = model<string>();
	readonly data = input<any>();
	readonly valueChange = output<string | undefined>();
	readonly endEditRequest = output();
	readonly navigKeyDownRequest = output<KeyboardEvent>();
	readonly editorInput = viewChild<ElementRef<HTMLInputElement>>('editorInput');
	editing: boolean = false; // Is Component in edit mode?
	list: Array<string> = [];
	onChange: any = Function.prototype; // Trascend the onChange event
	onTouched: any = Function.prototype; // Trascend the onTouch event
	private autoCompleteValue?: string = ''; // Private variable for input value

	onNavigKeyDown(event: KeyboardEvent): void {
		this.navigKeyDownRequest.emit(event);
	}

	// Required for ControlValueAccessor interface
	writeValue(value: string): void {
		this.autoCompleteValue = value;
	}

	// Required forControlValueAccessor interface
	registerOnChange(fn: (_: any) => any): void {
		this.onChange = fn;
	}

	// Required forControlValueAccessor interface
	registerOnTouched(fn: () => any): void {
		this.onTouched = fn;
	}

	// Do stuff when the input element loses focus
	onBlur(): void {
		const value = this.value();
		if (this.autoCompleteValue !== value) {
			this.valueChange.emit(value);
		}
		this.editing = false;
		this.endEditRequest.emit();
	}

	apply(): void {
		this.editing = false;
		this.endEditRequest.emit();
	}

	// Start the editing process for the input element
	editValue(): void {
		this.list = [];
		this.editing = true;
		this.autoCompleteValue = this.value();
		const getList = this.getList();
		if (getList) {
			this.list = getList(this.data());
		}
		setTimeout(() => {
			const editorInput = this.editorInput();
			if (editorInput) {
				editorInput.nativeElement.focus();
			}
		});
	}

	autocompleteEnter(query: string): void {
		this.value.set(query);
	}

	async autocompleteGetData(query: string): Promise<Array<AutocompleteOption<string>>> {
		if (query.length === 0) {
			return this.list.map(data => ({ data }));
		}
		return this.list.filter(data => data.includes(query)).map(data => ({ data }));
	}

	autocompleteSelectResult(result: AutocompleteOption<string>): string {
		this.autoCompleteValue = result.data;
		this.value.set(result.data);
		return this.value() ?? '';
	}
}
