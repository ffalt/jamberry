import { A11yModule } from '@angular/cdk/a11y';
import { FullscreenOverlayContainer, OverlayContainer, OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { type ModuleWithProviders, NgModule } from '@angular/core';
import { ContextMenuContentItemComponent } from './contextmenu-content-item.component';
import { ContextMenuContentComponent } from './contextmenu-content.component';
import { ContextMenuAttachDirective } from './contextmenu.attach.directive';
import { ContextMenuComponent } from './contextmenu.component';
import { ContextMenuItemDirective } from './contextmenu.item.directive';
import type { IContextMenuOptions } from './contextmenu.options';
import { ContextMenuService } from './contextmenu.service';
import { CONTEXT_MENU_OPTIONS } from './contextmenu.tokens';

@NgModule({
	exports: [
		ContextMenuAttachDirective,
		ContextMenuComponent,
		ContextMenuItemDirective
	],
	imports: [
		CommonModule,
		A11yModule,
		OverlayModule,
		ContextMenuAttachDirective,
		ContextMenuComponent,
		ContextMenuContentComponent,
		ContextMenuContentItemComponent,
		ContextMenuItemDirective
	]
})
export class ContextMenuModule {
	static forRoot(options?: IContextMenuOptions): ModuleWithProviders<ContextMenuModule> {
		return {
			ngModule: ContextMenuModule,
			providers: [
				ContextMenuService,
				{
					provide: CONTEXT_MENU_OPTIONS,
					useValue: options
				},
				{ provide: OverlayContainer, useClass: FullscreenOverlayContainer }
			]
		};
	}
}
