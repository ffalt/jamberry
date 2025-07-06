import {Component, ElementRef, ViewEncapsulation, output, viewChild, input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
	selector: 'app-inline-edit',
	templateUrl: './inline-edit.component.html',
	providers: [{
		provide: NG_VALUE_ACCESSOR,
		useExisting: InlineEditComponent,
		multi: true
	}],
	styleUrls: ['./inline-edit.component.scss'],
	// eslint-disable-next-line @angular-eslint/use-component-view-encapsulation
	encapsulation: ViewEncapsulation.None,
	standalone: false
})
export class InlineEditComponent implements ControlValueAccessor {
	editing: boolean = false; // Is Component in edit mode?
	readonly placeholder = input<string>(''); // The type of input element
	readonly type = input<string>('text'); // The type of input element
	readonly required = input<boolean>(false); // Is input requried?
	readonly disabled = input<boolean>(false); // Is input disabled?
	readonly endEditRequest = output();
	private readonly inlineEditControl = viewChild<ElementRef>('inlineEditControl'); // input DOM element
	private editValue: string = ''; // Private variable for input value
	private preValue: string = ''; // The value before clicking to edit
	private onChange: any = Function.prototype; // Trascend the onChange event
	private onTouched: any = Function.prototype; // Trascend the onTouch event

	// Control Value Accessors for ngModel
	get value(): any {
		return this.editValue;
	}

	set value(v: any) {
		if (v !== this.editValue) {
			this.editValue = v;
			this.onChange(v);
		}
	}

	// Required for ControlValueAccessor interface
	writeValue(value: any): void {
		this.editValue = value;
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
	onBlur(): void {
		this.editing = false;
		if (this.preValue !== this.editValue) {
			this.endEditRequest.emit();
		}
	}

	apply(): void {
		this.editing = false;
		this.endEditRequest.emit();
	}

	// Start the editing process for the input element
	edit(value: string): void {
		if (this.disabled()) {
			return;
		}
		this.preValue = value;
		this.editing = true;
		// Focus on the input element just as the editing begins
		setTimeout(() => {
			const inlineEditControl = this.inlineEditControl();
			if (inlineEditControl?.nativeElement) {
				inlineEditControl.nativeElement.focus();
			}
		});
	}
}
