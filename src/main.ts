import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

/**
 * Hammerjs for gestures
 */
// eslint-disable-next-line import/no-unassigned-import
import 'hammerjs';
import {AppModule} from './app/app.module';
import {environment} from './environments/environment';

if (environment.production) {
	enableProdMode();
}

platformBrowserDynamic()
	.bootstrapModule(AppModule)
	.catch(err => {
		console.error(err);
	});
