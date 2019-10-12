import {DragDropModule} from '@angular/cdk/drag-drop';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {HammerModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {ContextMenuModule} from '@app/modules/context-menu';
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
	entryComponents: [...entryComponents],
	providers: []
})
export class PlayerModule {
}
