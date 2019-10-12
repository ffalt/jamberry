import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {OptionHeaderComponent} from '@app/modules/autocomplete/option/option-header.component';
import {HighlightPipe} from '@app/modules/autocomplete/option/option-highlight.pipe';
import {AutocompleteContentDirective} from './autocomplete-content.directive';
import {AutocompleteComponent} from './autocomplete.component';
import {AutocompleteDirective} from './autocomplete.directive';
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
