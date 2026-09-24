import type { Injector, ProviderToken } from '@angular/core';
import { ToastPackage } from './toast-config';

// Custom injector type specifically for instantiating components with a toast
export class ToastInjector implements Injector {
	constructor(
		private readonly toastPackage: ToastPackage,
		private readonly parentInjector: Injector
	) {
	}

	get(token: ProviderToken<any>, notFoundValue: undefined): any {
		return token === ToastPackage ? this.toastPackage : this.parentInjector.get<any>(token, notFoundValue);
	}
}
