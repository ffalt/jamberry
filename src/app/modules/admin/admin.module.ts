import {ScrollingModule} from '@angular/cdk/scrolling';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HammerModule} from '@angular/platform-browser';
import {AutocompleteModule} from '@app/modules/autocomplete';
import {ContextMenuModule} from '@app/modules/context-menu';
import {SharedModule} from '@shared/shared.module';
import {ImageCropperModule} from 'ngx-image-cropper';

import {AdminComponent} from './admin.component';
import {routing} from './admin.routing';

import {components, entryComponents} from './components';

@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		FormsModule,
		HammerModule,
		ImageCropperModule,
		ContextMenuModule,
		ScrollingModule,
		AutocompleteModule,
		routing
	],
	entryComponents: [...entryComponents],
	declarations: [AdminComponent, ...components],
	providers: []
})
export class AdminModule {
}
