import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {AutocompleteContentDirective} from './autocomplete-content.directive';
import {AutocompleteComponent} from './autocomplete.component';
import {AutocompleteDirective} from './autocomplete.directive';
import {OptionHeaderComponent} from './option/option-header.component';
import {HighlightPipe} from './option/option-highlight.pipe';
import {OptionComponent} from './option/option.component';

const publicApi = [
	AutocompleteComponent,
	AutocompleteDirective,
	AutocompleteContentDirective,
	OptionComponent,
	OptionHeaderComponent,
	HighlightPipe
];

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [publicApi],
	exports: [publicApi]
})
export class AutocompleteModule {
}
