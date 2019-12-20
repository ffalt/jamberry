import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {CacheService} from './cache.service';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {

	constructor(private cacheService: CacheService) {
	}

	intercept(httpRequest: HttpRequest<any>, handler: HttpHandler): Observable<HttpEvent<any>> {
		return this.cacheService.intercept(httpRequest, handler);
	}
}
