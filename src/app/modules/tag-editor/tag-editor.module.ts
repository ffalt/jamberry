import {ScrollingModule} from '@angular/cdk/scrolling';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AutocompleteModule} from '@app/modules/autocomplete';
import {ContextMenuModule} from '@app/modules/context-menu';
import {SharedModule} from '@shared/shared.module';
import {ImageCropperModule} from 'ngx-image-cropper';
import {components, entryComponents} from './components';
import {pipes} from './pipes';
import {routing} from './tag-editor.routing';

@NgModule({
	imports: [
		CommonModule, SharedModule, FormsModule,
		ImageCropperModule,
		ContextMenuModule, ScrollingModule, AutocompleteModule, routing
	],
	entryComponents: [...entryComponents],
	declarations: [...components, ...pipes],
	providers: []
})
export class TagEditorModule {
}
