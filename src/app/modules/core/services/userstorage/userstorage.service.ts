import {Injectable} from '@angular/core';
import {Jam} from '@jam';
import {Observable, Subject} from 'rxjs';
import {LocalstorageService} from '../localstorage/localstorage.service';

@Injectable({
	providedIn: 'root'
})
export class UserStorageService {
	userChange: Observable<Jam.SessionUser>;
	private subjectUser = new Subject<Jam.SessionUser>();
	private userSuffix?: string;

	constructor(private localStorageService: LocalstorageService) {
		this.userChange = this.subjectUser.asObservable();
	}

	get<T>(key: string): T | undefined {
		if (!this.userSuffix) {
			return;
		}
		return this.localStorageService.get<T>((this.userSuffix ? this.userSuffix + '.' : '') + key);
	}

	set<T>(key: string, data: T): void {
		if (!this.userSuffix) {
			return;
		}
		this.localStorageService.set<T>((this.userSuffix ? this.userSuffix + '.' : '') + key, data);
	}

	notifyUserChange(user?: Jam.SessionUser): void {
		this.userSuffix = user ? user.id : undefined;
		this.subjectUser.next(user);
	}
}
