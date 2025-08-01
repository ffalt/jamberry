// @generated
// This file was automatically generated and should not be edited.

import {HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Injectable, inject} from '@angular/core';
import {JamConfiguration} from './jam.configuration';
import {type HTTPOptions, JamHttpService} from './jam.http.service';
import type {Jam} from './model/jam-rest-data';

export interface Auth {
	server: string;
	username: string;
	session: boolean;
	token?: string;
	version?: string;
	password?: string;
}

@Injectable()
export class JamAuthService {
	static readonly version = '0.2.1';
	static readonly apiPrefix = '/jam/v1';
	user?: Jam.SessionUser = undefined;
	auth?: Auth = undefined;
	checked: boolean = false;
	loaded: boolean = false;
	private readonly http = inject(JamHttpService);
	private readonly configuration = inject(JamConfiguration);

	async load(): Promise<void> {
		const o = await this.configuration.fromStorage();
		this.user = o ? o.user : undefined;
		this.auth = o ? o.auth : undefined;
		if (this.user) {
			await this.configuration.userChangeNotify(this.user);
		}
		this.loaded = true;
	}

	async check(): Promise<void> {
		this.checked = true;
		if (!this.auth?.server) {
			return;
		}
		try {
			const data = await this.http.get<Jam.Session>(`${this.auth.server}${JamAuthService.apiPrefix}/session`, this.getHTTPOptions());
			if (data.user) {
				this.user = data.user;
				this.auth.version = data.version;
				await this.configuration.toStorage({auth: this.auth, user: this.user});
			} else {
				this.user = undefined;
			}
		} catch (error) {
			return Promise.reject(error || new Error('Server error'));
		}
	}

	async canUseSession(server: string): Promise<boolean> {
		if (this.configuration.forceSessionUsage) {
			return true;
		}
		const data = await this.http.get<Jam.Session>(`${server}${JamAuthService.apiPrefix}/session`, {withCredentials: false});
		return (data.allowedCookieDomains || []).includes(this.configuration.domain());
	}

	async login(server: string, username: string, password: string, storePassword?: boolean): Promise<void> {
		const canUseSession = await this.canUseSession(server);
		try {
			const data = await this.http.post<Jam.Session>(`${server}${JamAuthService.apiPrefix}/auth/login`, {
				client: this.configuration.clientName,
				username,
				password,
				jwt: !canUseSession
			}, {withCredentials: canUseSession});
			if (!data.user) {
				throw new Error('Invalid login response');
			}
			this.user = data.user;
			this.auth = {
				server,
				username: data.user.name,
				session: canUseSession,
				token: canUseSession ? undefined : data.jwt,
				version: data.version,
				password: storePassword ? password : undefined
			};
			await this.configuration.toStorage({auth: this.auth, user: this.user});
			await this.configuration.userChangeNotify(this.user);
		} catch (error: any) {
			await this.clear();
			if (error?.error?.error) {
				return Promise.reject(new Error(error.error.error));
			}
			if (error instanceof HttpErrorResponse) {
				return Promise.reject(new Error(error.statusText));
			}
			return Promise.reject(new Error('Server Error'));
		}
	}

	getHTTPHeaders(): HttpHeaders | undefined {
		if (this.auth?.token) {
			return new HttpHeaders({Authorization: `Bearer ${this.auth.token}`});
		}
		return;
	}

	getHTTPOptions(): HTTPOptions {
		if (this.auth?.token) {
			return {withCredentials: false, headers: this.getHTTPHeaders()};
		}
		return {withCredentials: true};
	}

	async logout(): Promise<void> {
		if (this.auth) {
			const url = `${this.auth.server}${JamAuthService.apiPrefix}/auth/logout`;
			const options = this.getHTTPOptions();
			await this.clear();
			await this.http.post(url, {}, options);
		} else {
			await this.clear();
		}
	}

	async clear(): Promise<void> {
		await this.configuration.toStorage(undefined);
		await this.configuration.userChangeNotify(undefined);
		this.user = undefined;
		this.auth = undefined;
	}

	isLoggedIn(): boolean {
		return !!(this.user && this.auth);
	}
}
