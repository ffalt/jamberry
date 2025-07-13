import {OverlayModule} from '@angular/cdk/overlay';
import {CommonModule} from '@angular/common';
import {type ModuleWithProviders, NgModule} from '@angular/core';

import {DefaultNoComponentGlobalConfig, type GlobalConfig, TOAST_CONFIG} from './toast-config';
import {ToastComponent} from './toast.component';
import {ToastContainerDirective} from './toast.directive';

export const DefaultGlobalConfig: GlobalConfig = {
	...DefaultNoComponentGlobalConfig
};

@NgModule({
    imports: [
        CommonModule,
        OverlayModule
    ],
    declarations: [ToastComponent, ToastContainerDirective],
    exports: [ToastComponent]
})
export class ToastModule {
	static forRoot(config: Partial<GlobalConfig> = {}): ModuleWithProviders<ToastModule> {
		return {
			ngModule: ToastModule,
			providers: [
				{
					provide: TOAST_CONFIG,
					useValue: {
						default: DefaultGlobalConfig,
						config
					}
				}
			]
		};
	}
}

@NgModule({
	imports: [
		CommonModule,
		OverlayModule
	]
})
export class ToastrComponentlessModule {
	static forRoot(config: Partial<GlobalConfig> = {}): ModuleWithProviders<ToastModule> {
		return {
			ngModule: ToastModule,
			providers: [
				{
					provide: TOAST_CONFIG,
					useValue: {
						default: DefaultNoComponentGlobalConfig,
						config
					}
				}
			]
		};
	}
}
