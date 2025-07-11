/// <reference types="@angular/localize" />

import {AppModule} from './app/app.module';
import {enableProdMode} from '@angular/core';
import {platformBrowser} from '@angular/platform-browser';
import {environment} from './environments/environment';

if (environment.production) {
	enableProdMode();
}

platformBrowser()
	.bootstrapModule(AppModule)
	.catch((err: Error) => {
		console.error(err);
	});
