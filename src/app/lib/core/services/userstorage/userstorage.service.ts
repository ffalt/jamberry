import { inject, Injectable } from '@angular/core';
import type { Jam } from '@jam';
import { type Observable, ReplaySubject } from 'rxjs';
import { LocalstorageService } from '../localstorage/localstorage.service';

@Injectable({
	providedIn: 'root'
})
export class UserStorageService {
	userChange: Observable<Jam.SessionUser | undefined>;
	private readonly localStorageService = inject(LocalstorageService);
	private readonly subjectUser = new ReplaySubject<Jam.SessionUser | undefined>(1);
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

	set(key: string, data: unknown): void {
		if (!this.userSuffix) {
			return;
		}
		this.localStorageService.set((this.userSuffix ? `${this.userSuffix}.` : '') + key, data);
	}

	notifyUserChange(user?: Jam.SessionUser): void {
		this.userSuffix = user ? user.id : undefined;
		this.subjectUser.next(user);
	}
}
