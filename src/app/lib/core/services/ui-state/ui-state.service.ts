import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class UiStateService {
	data: { [name: string]: any } = {};

	put(name: string, data: unknown): void {
		this.data[name] = data;
	}

	get<T>(name: string, defaultData: T): T {
		return (this.data[name] ?? defaultData) as T;
	}
}
