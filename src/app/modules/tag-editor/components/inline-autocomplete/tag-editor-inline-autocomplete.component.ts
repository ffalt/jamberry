import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {AutocompleteDataControl, AutocompleteOption} from '@app/modules/autocomplete';

@Component({
	selector: 'app-tag-editor-inline-autocomplete',
	templateUrl: './tag-editor-inline-autocomplete.component.html',
	styleUrls: ['./tag-editor-inline-autocomplete.component.scss'],
	providers: [{
		provide: NG_VALUE_ACCESSOR,
		useExisting: TagEditorInlineAutocompleteComponent,
		multi: true
	}]
})
export class TagEditorInlineAutocompleteComponent implements ControlValueAccessor, AutocompleteDataControl {
	@Input() getList: (data: any) => Array<string>;
	@Input() value: string;
	@Input() data: any;
	@Output() readonly valueChange = new EventEmitter();
	@Output() readonly endEditRequest = new EventEmitter();
	@Output() readonly navigKeyDownRequest = new EventEmitter<KeyboardEvent>();
	@ViewChild('editorStart', {static: false}) editorStartRef: ElementRef;
	@ViewChild('editorInput', {static: false}) editorInput: ElementRef;

	editing: boolean = false; // Is Component in edit mode?
	list: Array<string> = [];

	private _value: string = ''; // Private variable for input value
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
		this._value = value;
	}

	// Required forControlValueAccessor interface
	registerOnChange(fn: (_: any) => {}): void {
		this.onChange = fn;
	}

	// Required forControlValueAccessor interface
	registerOnTouched(fn: () => {}): void {
		this.onTouched = fn;
	}

	// Do stuff when the input element loses focus
	onBlur(): void {
		if (this._value !== this.value) {
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
		this._value = this.value;
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
		this._value = result.data;
		this.value = result.data;
		return this.value;
	}

}
