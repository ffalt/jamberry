import {PortalModule} from '@angular/cdk/portal';
import {HttpClientJsonpModule, HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {Injectable, NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule, HammerGestureConfig, HammerModule, HAMMER_GESTURE_CONFIG} from '@angular/platform-browser';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {CoreModule} from '@core/core.module';
import {ConfigurationService} from '@core/services';
import {CacheInterceptor} from '@core/services/uri-cache/cache.interceptor';
import {CacheService} from '@core/services/uri-cache/cache.service';
import {JamConfiguration, JamModule} from '@jam';
import {SharedModule} from '@shared/shared.module';

import {AppComponent} from './app.component';
import {routing} from './app.routing';
import {guards} from './guards';

import {ContextMenuModule} from './modules/context-menu';
import {DeferLoadModule} from './modules/defer-load';
import {DialogOverlayModule} from './modules/dialog-overlay';
import {HeaderModule} from './modules/header';
import {HotkeyModule} from './modules/hotkeys';
import {MainTabsModule} from './modules/main-tabs';
import {PlayerModule} from './modules/player';
import {darkTheme, lightTheme, ThemeModule} from './modules/theme';
import {ToastModule} from './modules/toast';
import {pages} from './pages';

@Injectable()
export class CustomHammerConfig extends HammerGestureConfig {
	overrides = {
		pinch: {enable: false},
		swipe: {enable: false},
		rotate: {enable: false}
	} as any;
}

const themeConfig = {
	themes: [lightTheme, darkTheme],
	active: 'dark'
};

export function ConfigurationServiceFactory(service: ConfigurationService): JamConfiguration {
	return service;
}

@NgModule({
	imports: [
		NoopAnimationsModule,
		BrowserModule,
		HttpClientModule,
		HttpClientJsonpModule,
		HammerModule,
		FormsModule,
		CoreModule,
		JamModule.forRoot(
			{
				provide: JamConfiguration,
				useFactory: ConfigurationServiceFactory,
				deps: [ConfigurationService]
			}
		),
		DeferLoadModule.forRoot(),
		ThemeModule.forRoot(themeConfig),
		HotkeyModule.forRoot(),
		ToastModule.forRoot(),
		ContextMenuModule.forRoot(),
		DialogOverlayModule,
		MainTabsModule,
		PortalModule,
		SharedModule,
		PlayerModule,
		HeaderModule,
		routing
	],
	declarations: [AppComponent, ...pages],
	providers: [
		...guards,
		{
			provide: HAMMER_GESTURE_CONFIG,
			useClass: CustomHammerConfig
		},
		CacheService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: CacheInterceptor,
			multi: true
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
