import {Directive, TemplateRef, inject} from '@angular/core';

@Directive({
	selector: '[appAutocompleteContent]',
	standalone: false
})
export class AutocompleteContentDirective {
	tpl = inject<TemplateRef<any>>(TemplateRef);
}
