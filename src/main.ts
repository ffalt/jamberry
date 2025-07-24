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
	// eslint-disable-next-line unicorn/prefer-top-level-await
	.catch(console.error);
