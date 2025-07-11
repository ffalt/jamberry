import {PortalModule} from '@angular/cdk/portal';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi, withJsonpSupport} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {ContextMenuModule} from '@app/modules/ngx-contextmenu';
import {blackTheme} from '@app/modules/theme/theme.black';
import {CoreModule} from '@core/core.module';
import {ConfigurationService} from '@core/services';
import {CacheInterceptor} from '@core/services/uri-cache/cache.interceptor';
import {CacheService} from '@core/services/uri-cache/cache.service';
import {JamConfiguration, JamModule} from '@jam';
import {SharedModule} from '@shared/shared.module';
import {AppComponent} from './app.component';
import {routing} from './app.routing';
import {guards} from './guards';

import {DeferLoadModule} from './modules/defer-load';
import {DialogOverlayModule} from './modules/dialog-overlay';
import {HeaderModule} from './modules/header';
import {HotkeyModule} from './modules/hotkeys';
import {MainTabsModule} from './modules/main-tabs';
import {PlayerModule} from './modules/player';
import {darkTheme, lightTheme, catppuccinTheme, ThemeModule} from './modules/theme';
import {ToastModule} from './modules/toast';
import {pages} from './pages';

export const themeConfig = {
	themes: [lightTheme, catppuccinTheme, darkTheme, blackTheme],
	active: 'dark'
};

export function ConfigurationServiceFactory(service: ConfigurationService): JamConfiguration {
	return service;
}

@NgModule({
	declarations: [AppComponent, ...pages],
	bootstrap: [AppComponent], imports: [NoopAnimationsModule,
		BrowserModule,
		FormsModule,
		CoreModule,
		JamModule.forRoot({
			provide: JamConfiguration,
			useFactory: ConfigurationServiceFactory,
			deps: [ConfigurationService]
		}),
		DeferLoadModule.forRoot(),
		ThemeModule.forRoot(themeConfig),
		HotkeyModule.forRoot(),
		ToastModule.forRoot(),
		ContextMenuModule.forRoot({autoFocus: true}),
		DialogOverlayModule,
		MainTabsModule,
		PortalModule,
		SharedModule,
		PlayerModule,
		HeaderModule,
		routing], providers: [
		...guards,
		CacheService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: CacheInterceptor,
			multi: true
		},
		provideHttpClient(withInterceptorsFromDi(), withJsonpSupport())
	]
})
export class AppModule {
}
