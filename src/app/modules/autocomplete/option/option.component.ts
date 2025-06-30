import {ChangeDetectionStrategy, Component, HostBinding, HostListener, input} from '@angular/core';
import {AutocompleteControl, AutocompleteOption} from '@app/modules/autocomplete/autocomplete.types';

@Component({
	selector: 'app-autocomplete-option',
	template: '<ng-content />',
	changeDetection: ChangeDetectionStrategy.OnPush,
	styleUrls: ['./option.component.scss'],
	standalone: false
})
export class OptionComponent {
	readonly option = input<AutocompleteOption>();
	readonly control = input<AutocompleteControl>();

	@HostBinding('class.active') get getActive(): boolean {
		const control = this.control();
		if (control) {
			return control.options[control.activeIndex] === this.option();
		}
		return false;
	}

	@HostListener('mousedown', ['$event'])
	mouseDownEvent(event: MouseEvent): void {
		const control = this.control();
		const option = this.option();
		if (control && option) {
			control.selectOption(option);
			event.stopPropagation();
		}
	}
}
