import {ScrollingModule} from '@angular/cdk/scrolling';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HammerModule} from '@angular/platform-browser';
import {AutocompleteModule} from '@app/modules/autocomplete';
import {ContextMenuModule} from '@app/modules/ngx-contextmenu';
import {SharedModule} from '@shared/shared.module';
import {ImageCropperComponent} from 'ngx-image-cropper';
import {AdminComponent} from './admin.component';
import {routing} from './admin.routing';

import {components} from './components';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        HammerModule,
        ContextMenuModule,
        ScrollingModule,
        AutocompleteModule,
        routing,
				ImageCropperComponent,
        NgOptimizedImage
    ],
    declarations: [AdminComponent, ...components],
    providers: []
})
export class AdminModule {
}
