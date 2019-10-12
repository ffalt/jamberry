import {OverlayModule} from '@angular/cdk/overlay';
import {CommonModule} from '@angular/common';
import {ModuleWithProviders, NgModule} from '@angular/core';

import {ContextMenuComponent} from './context-menu.component';
import {ContextMenuContentComponent} from './context-menu.content.component';
import {ContextMenuDirective} from './context-menu.directive';
import {ContextMenuItemDirective} from './context-menu.item.directive';
import {ContextMenuOptions} from './context-menu.options';
import {ContextMenuService} from './context-menu.service';
import {CONTEXT_MENU_OPTIONS} from './context-menu.tokens';

@NgModule({
	declarations: [
		ContextMenuDirective,
		ContextMenuComponent,
		ContextMenuContentComponent,
		ContextMenuItemDirective
	],
	entryComponents: [
		ContextMenuContentComponent
	],
	exports: [
		ContextMenuDirective,
		ContextMenuComponent,
		ContextMenuItemDirective
	],
	providers: [
		ContextMenuService
	],
	imports: [
		CommonModule,
		OverlayModule
	]
})
export class ContextMenuModule {
	static forRoot(options?: ContextMenuOptions): ModuleWithProviders {
		return {
			ngModule: ContextMenuModule,
			providers: [
				ContextMenuService,
				{
					provide: CONTEXT_MENU_OPTIONS,
					useValue: options
				}
			]
		};
	}
}
