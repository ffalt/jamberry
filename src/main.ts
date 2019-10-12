import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from '@app/app.module';
/**
 * Hammerjs for gestures
 */
import 'hammerjs';
import {environment} from './environments/environment';

if (environment.production) {
	enableProdMode();
}

platformBrowserDynamic()
	.bootstrapModule(AppModule)
	.catch(err => {
		console.error(err);
	});
