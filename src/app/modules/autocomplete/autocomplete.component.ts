import {Component, ContentChild, Input, TemplateRef, ViewChild} from '@angular/core';
import {AutocompleteControl} from '@app/modules/autocomplete/autocomplete.types';
import {AutocompleteContentDirective} from './autocomplete-content.directive';

@Component({
	selector: 'app-autocomplete',
	exportAs: 'appAutocomplete',
	templateUrl: './autocomplete.component.html',
	styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent {
	@ViewChild('root', {static: true}) rootTemplate!: TemplateRef<any>;
	@ContentChild(AutocompleteContentDirective, {static: true}) content!: AutocompleteContentDirective;
}
