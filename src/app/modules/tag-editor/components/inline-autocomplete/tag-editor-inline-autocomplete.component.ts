import {Component, type ElementRef, output, viewChild, input, model} from '@angular/core';
import {type ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import type {AutocompleteDataControl, AutocompleteOption} from '@app/modules/autocomplete';

@Component({
	selector: 'app-tag-editor-inline-autocomplete',
	templateUrl: './tag-editor-inline-autocomplete.component.html',
	styleUrls: ['./tag-editor-inline-autocomplete.component.scss'],
	providers: [{
		provide: NG_VALUE_ACCESSOR,
		useExisting: TagEditorInlineAutocompleteComponent,
		multi: true
	}],
	standalone: false
})
export class TagEditorInlineAutocompleteComponent implements ControlValueAccessor, AutocompleteDataControl {
	readonly getList = input<(data: any) => Array<string>>();
	readonly value = model<string>();
	readonly data = input<any>();
	editing: boolean = false; // Is Component in edit mode?
	list: Array<string> = [];
	readonly valueChange = output<string | undefined>();
	readonly endEditRequest = output();
	readonly navigKeyDownRequest = output<KeyboardEvent>();
	readonly editorInput = viewChild<ElementRef>('editorInput');
	private autoCompleteValue?: string = ''; // Private variable for input value
	private onChange: any = Function.prototype; // Trascend the onChange event
	private onTouched: any = Function.prototype; // Trascend the onTouch event

	onNavigKeyDown(event: KeyboardEvent): void {
		this.navigKeyDownRequest.emit(event);
	}

	// Required for ControlValueAccessor interface
	writeValue(value: any): void {
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

	async autocompleteGetData(query: string): Promise<Array<AutocompleteOption>> {
		if (query.length === 0) {
			return this.list.map(data => ({data}));
		}
		return this.list.filter(data => data.includes(query)).map(data => ({data}));
	}

	autocompleteSelectResult(result: AutocompleteOption): string {
		this.autoCompleteValue = result.data;
		this.value.set(result.data);
		return this.value() || '';
	}
}
