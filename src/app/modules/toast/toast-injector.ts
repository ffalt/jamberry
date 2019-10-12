import {InjectFlags, Injector} from '@angular/core';
import {ToastPackage} from './toast-config';

/** Custom injector type specifically for instantiating components with a toast. */
export class ToastInjector implements Injector {
	constructor(
		private _toastPackage: ToastPackage,
		private _parentInjector: Injector
	) {
	}

	get<T>(token: any, notFoundValue?: T, flags?: InjectFlags): T | ToastPackage {
		if (token === ToastPackage) {
			return this._toastPackage;
		}
		return this._parentInjector.get<T>(token, notFoundValue, flags);
	}
}
