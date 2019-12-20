import {HttpEvent, HttpHandler, HttpRequest, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {share, tap} from 'rxjs/operators';

@Injectable()
export class CacheService {
	private cachedData = new Map<string, any>();

	getConfig(request: HttpRequest<any>): { needsRefresh?: boolean } | undefined {
		const path = request.url.slice(request.url.indexOf('jam/v1/') + 7);
		if ([
			'stats',
			'series/index',
			'folder/index',
			'artist/index',
			'album/index',
			'genre/list'].includes(path)) {
			return {needsRefresh: false};
		}
	}

	intercept(httpRequest: HttpRequest<any>, handler: HttpHandler): Observable<HttpEvent<any>> {
		if (httpRequest.method !== 'GET') {
			return handler.handle(httpRequest);
		}
		const cacheConfig = this.getConfig(httpRequest);
		if (!cacheConfig) {
			return handler.handle(httpRequest);
		}

		if (cacheConfig.needsRefresh || httpRequest.headers.get('reset-cache')) {
			this.cachedData.delete(httpRequest.urlWithParams);
		}

		const lastResponse = this.cachedData.get(httpRequest.urlWithParams);
		if (lastResponse) {
			return (lastResponse instanceof Observable)
				? lastResponse : of(lastResponse.clone());
		}

		const requestHandle = handler.handle(httpRequest)
			.pipe(
				tap(stateEvent => {
					if (stateEvent instanceof HttpResponse) {
						this.cachedData.set(
							httpRequest.urlWithParams,
							stateEvent.clone()
						);
					}
				}),
				share()
			);
		this.cachedData.set(httpRequest.urlWithParams, requestHandle);
		return requestHandle;
	}

}
