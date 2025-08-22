import { Component, contentChild, type TemplateRef, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteContentDirective } from './autocomplete-content.directive';

@Component({
	selector: 'app-autocomplete',
	exportAs: 'appAutocomplete',
	templateUrl: './autocomplete.component.html',
	styleUrls: ['./autocomplete.component.scss'],
	imports: [
		CommonModule
	]
})
export class AutocompleteComponent {
	readonly rootTemplate = viewChild.required<TemplateRef<any>>('root');
	readonly content = contentChild.required(AutocompleteContentDirective);
}
