import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CacheInterceptor } from './lib/core/services/uri-cache/cache.interceptor';
import type { JamConfiguration } from '@jam';
import { blackTheme, catppuccinTheme, darkTheme, lightTheme } from './modules/theme';
import type { ConfigurationService } from './lib/core/services/configuration/configuration.service';

export const themeConfig = {
	themes: [lightTheme, catppuccinTheme, darkTheme, blackTheme],
	active: 'dark'
};

export function ConfigurationServiceFactory(service: ConfigurationService): JamConfiguration {
	return service;
}

export function provideHTTPCache() {
	return {
		provide: HTTP_INTERCEPTORS,
		useClass: CacheInterceptor,
		multi: true
	};
}
