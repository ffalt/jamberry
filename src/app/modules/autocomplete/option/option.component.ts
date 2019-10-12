import {ChangeDetectionStrategy, Component, HostBinding, HostListener, Input} from '@angular/core';
import {AutocompleteControl, AutocompleteOption} from '@app/modules/autocomplete/autocomplete.types';

@Component({
	selector: 'app-autocomplete-option',
	template: '<ng-content></ng-content>',
	changeDetection: ChangeDetectionStrategy.OnPush,
	styleUrls: ['option.component.scss']
})
export class OptionComponent {
	@Input() option: AutocompleteOption;
	@Input() control: AutocompleteControl;

	@HostBinding('class.active') get getActive(): boolean {
		if (this.control) {
			return this.control.options[this.control.activeIndex] === this.option;
		}
		return false;
	}

	@HostListener('mousedown', ['$event'])
	mouseDownEvent(event: MouseEvent): void {
		if (this.control) {
			this.control.selectOption(this.option);
			event.stopPropagation();
		}
	}
}
