import {Component, ElementRef, EventEmitter, Input, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
	selector: 'app-inline-edit',
	templateUrl: './inline-edit.component.html',
	providers: [{
		provide: NG_VALUE_ACCESSOR,
		// eslint-disable-next-line @typescript-eslint/no-use-before-define
		useExisting: InlineEditComponent,
		multi: true
	}],
	styleUrls: ['./inline-edit.component.scss'],
	// tslint:disable-next-line:use-component-view-encapsulation
	encapsulation: ViewEncapsulation.None
})
export class InlineEditComponent implements ControlValueAccessor {
	@ViewChild('inlineEditControl', {static: false}) inlineEditControl?: ElementRef; // input DOM element
	@Input() placeholder: string = ''; // The type of input element
	@Input() type: string = 'text'; // The type of input element
	@Input() required: boolean = false; // Is input requried?
	@Input() disabled: boolean = false; // Is input disabled?
	@Output() readonly endEditRequest = new EventEmitter();
	editing: boolean = false; // Is Component in edit mode?
	private _value: string = ''; // Private variable for input value
	private preValue: string = ''; // The value before clicking to edit
	private onChange: any = Function.prototype; // Trascend the onChange event
	private onTouched: any = Function.prototype; // Trascend the onTouch event

	// Control Value Accessors for ngModel
	get value(): any {
		return this._value;
	}

	set value(v: any) {
		if (v !== this._value) {
			this._value = v;
			this.onChange(v);
		}
	}

	// Required for ControlValueAccessor interface
	writeValue(value: any): void {
		this._value = value;
	}

	// Required forControlValueAccessor interface
	registerOnChange(fn: (_: any) => Record<string, unknown>): void {
		this.onChange = fn;
	}

	// Required forControlValueAccessor interface
	registerOnTouched(fn: () => Record<string, unknown>): void {
		this.onTouched = fn;
	}

	// Do stuff when the input element loses focus
	onBlur($event: Event): void {
		this.editing = false;
		this.endEditRequest.emit();
	}

	apply(): void {
		this.editing = false;
		this.endEditRequest.emit();
	}

	// Start the editing process for the input element
	edit(value: string): void {
		if (this.disabled) {
			return;
		}
		this.preValue = value;
		this.editing = true;
		// Focus on the input element just as the editing begins
		setTimeout(() => {
			if (this.inlineEditControl?.nativeElement) {
				this.inlineEditControl.nativeElement.focus();
			}
		});
	}

}
