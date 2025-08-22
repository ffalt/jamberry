import { Directive, inject, TemplateRef } from '@angular/core';

@Directive({
	selector: '[appAutocompleteContent]',
	standalone: true
})
export class AutocompleteContentDirective {
	tpl = inject<TemplateRef<any>>(TemplateRef);
}
