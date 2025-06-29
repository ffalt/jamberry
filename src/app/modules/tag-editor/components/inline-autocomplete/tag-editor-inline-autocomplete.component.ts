import {Component, ElementRef, Input, ViewChild, output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {AutocompleteDataControl, AutocompleteOption} from '@app/modules/autocomplete';

@Component({
	selector: 'app-tag-editor-inline-autocomplete',
	templateUrl: './tag-editor-inline-autocomplete.component.html',
	styleUrls: ['./tag-editor-inline-autocomplete.component.scss'],
	providers: [{
		provide: NG_VALUE_ACCESSOR,
		// eslint-disable-next-line @typescript-eslint/no-use-before-define
		useExisting: TagEditorInlineAutocompleteComponent,
		multi: true
	}],
	standalone: false
})
export class TagEditorInlineAutocompleteComponent implements ControlValueAccessor, AutocompleteDataControl {
	@Input() getList?: (data: any) => Array<string>;
	@Input() value?: string;
	@Input() data?: any;
	readonly valueChange = output<string | undefined>();
	readonly endEditRequest = output();
	readonly navigKeyDownRequest = output<KeyboardEvent>();
	@ViewChild('editorStart', {static: false}) editorStartRef?: ElementRef;
	@ViewChild('editorInput', {static: false}) editorInput?: ElementRef;

	editing: boolean = false; // Is Component in edit mode?
	list: Array<string> = [];

	private autoCompleteValue?: string = ''; // Private variable for input value
	private onChange: any = Function.prototype; // Trascend the onChange event
	private onTouched: any = Function.prototype; // Trascend the onTouch event

	startEdit(): void {
		if (this.editorStartRef) {
			this.editorStartRef.nativeElement.focus();
		}
	}

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
		if (this.autoCompleteValue !== this.value) {
			this.valueChange.emit(this.value);
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
		this.autoCompleteValue = this.value;
		if (this.getList) {
			this.list = this.getList(this.data);
		}
		setTimeout(() => {
			if (this.editorInput) {
				this.editorInput.nativeElement.focus();
			}
		});
	}

	autocompleteEnter(query: string): void {
		this.value = query;
	}

	async autocompleteGetData(query: string): Promise<Array<AutocompleteOption>> {
		if (query.length === 0) {
			return this.list.map(data => ({data}));
		}
		return this.list.filter(data => data.includes(query)).map(data => ({data}));
	}

	autocompleteSelectResult(result: AutocompleteOption): string {
		this.autoCompleteValue = result.data;
		this.value = result.data;
		return this.value || '';
	}

}
