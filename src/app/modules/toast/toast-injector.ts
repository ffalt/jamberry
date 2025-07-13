import type {Injector, ProviderToken} from '@angular/core';
import {ToastPackage} from './toast-config';

/** Custom injector type specifically for instantiating components with a toast. */
export class ToastInjector implements Injector {
	constructor(
		private readonly toastPackage: ToastPackage,
		private readonly parentInjector: Injector
	) {
	}

	get(token: ProviderToken<any>, notFoundValue: undefined): any {
		if (token === ToastPackage) {
			return this.toastPackage;
		}
		return this.parentInjector.get<any>(token, notFoundValue);
	}
}
