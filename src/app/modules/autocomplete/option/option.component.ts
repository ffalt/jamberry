import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {AutocompleteControl, AutocompleteOption} from '@app/modules/autocomplete/autocomplete.types';

@Component({
	selector: 'app-autocomplete-option',
	template: '<ng-content />',
	changeDetection: ChangeDetectionStrategy.OnPush,
	styleUrls: ['./option.component.scss'],
	standalone: false,
	host: {
		'[class.active]': 'getActive',
		'(mousedown)': 'mouseDownEvent($event)'
	}
})
export class OptionComponent {
	readonly option = input<AutocompleteOption>();
	readonly control = input<AutocompleteControl>();

	get getActive(): boolean {
		const control = this.control();
		if (control) {
			return control.options[control.activeIndex] === this.option();
		}
		return false;
	}

	mouseDownEvent(event: MouseEvent): void {
		const control = this.control();
		const option = this.option();
		if (control && option) {
			control.selectOption(option);
			event.stopPropagation();
		}
	}
}
