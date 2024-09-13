import {ScrollingModule} from '@angular/cdk/scrolling';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AutocompleteModule} from '@app/modules/autocomplete';
import {ContextMenuModule} from '@app/modules/ngx-contextmenu';
import {SharedModule} from '@shared/shared.module';
import {components} from './components';
import {pipes} from './pipes';
import {routing} from './tag-editor.routing';

@NgModule({
	imports: [
		CommonModule, SharedModule, FormsModule,
		ContextMenuModule, ScrollingModule, AutocompleteModule, routing, NgOptimizedImage
	],
	declarations: [...components, ...pipes],
	providers: []
})
export class TagEditorModule {
}
