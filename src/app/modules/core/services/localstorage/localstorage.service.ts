import {Injectable} from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class LocalstorageService {
	private readonly prefix = 'jamberry.';

	get<T>(key: string): T | undefined {
		try {
			return JSON.parse(localStorage.getItem(this.prefix + key));
		} catch (e) {
			return undefined;
		}
	}

	set<T>(key: string, data: T): void {
		if (data === undefined) {
			localStorage.removeItem(this.prefix + key);
		} else {
			localStorage.setItem(this.prefix + key, JSON.stringify(data));
		}
	}

}
