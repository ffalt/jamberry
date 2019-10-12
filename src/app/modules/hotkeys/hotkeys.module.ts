import {CommonModule} from '@angular/common';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {HotkeysDirective} from './hotkeys.directive';
import {HotkeysOptions, IHotkeyOptions} from './hotkeys.options';
import {HotkeysService} from './hotkeys.service';

@NgModule({
	imports: [CommonModule],
	exports: [HotkeysDirective],
	declarations: [HotkeysDirective]
})
export class HotkeyModule {
	static forRoot(options: IHotkeyOptions = {}): ModuleWithProviders {
		return {
			ngModule: HotkeyModule,
			providers: [
				HotkeysService,
				{provide: HotkeysOptions, useValue: options}
			]
		};
	}
}