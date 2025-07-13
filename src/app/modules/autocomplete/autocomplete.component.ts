import {Component, type TemplateRef, viewChild, contentChild} from '@angular/core';
import {AutocompleteContentDirective} from './autocomplete-content.directive';

@Component({
    selector: 'app-autocomplete',
    exportAs: 'appAutocomplete',
    templateUrl: './autocomplete.component.html',
    styleUrls: ['./autocomplete.component.scss'],
    standalone: false
})
export class AutocompleteComponent {
	readonly rootTemplate = viewChild.required<TemplateRef<any>>('root');
	readonly content = contentChild.required(AutocompleteContentDirective);
}
