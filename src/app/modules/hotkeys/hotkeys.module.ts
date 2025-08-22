import { CommonModule } from '@angular/common';
import { type ModuleWithProviders, NgModule } from '@angular/core';
import { HotkeysDirective } from './hotkeys.directive';
import { type HotkeyOptions, HotkeysOptions } from './hotkeys.options';
import { HotkeysService } from './hotkeys.service';

@NgModule({
	imports: [CommonModule, HotkeysDirective],
	exports: [HotkeysDirective]
})
export class HotkeyModule {
	static forRoot(options: HotkeyOptions = {}): ModuleWithProviders<HotkeyModule> {
		return {
			ngModule: HotkeyModule,
			providers: [
				HotkeysService,
				{ provide: HotkeysOptions, useValue: options }
			]
		};
	}
}
