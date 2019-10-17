import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ContextMenuModule} from '@app/modules/context-menu';
import {SharedModule} from '@shared/shared.module';

import {components} from './components';

@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		ContextMenuModule
	],
	declarations: [...components],
	exports: [...components],
	providers: []
})

export class TracksModule {
}
