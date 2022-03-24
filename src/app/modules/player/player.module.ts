import {DragDropModule} from '@angular/cdk/drag-drop';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {HammerModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {ContextMenuModule} from '@app/modules/ngx-contextmenu';
import {SharedModule} from '@shared/shared.module';
import {components, entryComponents} from './components';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ScrollingModule,
        DragDropModule,
        HammerModule,
        ContextMenuModule,
        SharedModule
    ],
    declarations: [...components],
    exports: [...components],
    providers: []
})
export class PlayerModule {
}
