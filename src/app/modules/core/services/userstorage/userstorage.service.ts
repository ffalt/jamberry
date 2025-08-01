import {Injectable, inject} from '@angular/core';
import type {Jam} from '@jam';
import {type Observable, Subject} from 'rxjs';
import {LocalstorageService} from '../localstorage/localstorage.service';

@Injectable({
	providedIn: 'root'
})
export class UserStorageService {
	userChange: Observable<Jam.SessionUser | undefined>;
	private readonly localStorageService = inject(LocalstorageService);
	private readonly subjectUser = new Subject<Jam.SessionUser | undefined>();
	private userSuffix?: string;

	constructor() {
		this.userChange = this.subjectUser.asObservable();
	}

	get<T>(key: string): T | undefined {
		if (!this.userSuffix) {
			return;
		}
		return this.localStorageService.get<T>((this.userSuffix ? `${this.userSuffix}.` : '') + key);
	}

	set<T>(key: string, data: T): void {
		if (!this.userSuffix) {
			return;
		}
		this.localStorageService.set<T>((this.userSuffix ? `${this.userSuffix}.` : '') + key, data);
	}

	notifyUserChange(user?: Jam.SessionUser): void {
		this.userSuffix = user ? user.id : undefined;
		this.subjectUser.next(user);
	}
}
