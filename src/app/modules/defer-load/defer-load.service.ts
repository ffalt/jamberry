import { isPlatformBrowser } from '@angular/common';
import { EventEmitter, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { debounceTime, merge, type Observable, Subject, throttleTime } from 'rxjs';
import { Rect } from './rect';

export interface ScrollEvent {
	name: string;
	element?: HTMLElement;
}

export interface ScrollNotifyEvent {
	rect: Rect;
}

@Injectable({ providedIn: 'root' })
export class DeferLoadService {
	readonly isBrowser: boolean;
	readonly hasIntersectionObserver: boolean;
	scrollNotify = new EventEmitter<ScrollNotifyEvent>();
	observeNotify = new EventEmitter<Array<IntersectionObserverEntry>>();
	currentViewport: Rect = new Rect(0, 0, 0, 0);
	private readonly platformId = inject(PLATFORM_ID);
	private readonly scrollSubject = new Subject<ScrollNotifyEvent>();
	private readonly scrollObservable: Observable<ScrollNotifyEvent>;
	private intersectionObserver?: IntersectionObserver;

	constructor() {
		this.isBrowser = isPlatformBrowser(this.platformId);
		this.hasIntersectionObserver = DeferLoadService.checkIntersectionObserver();
		const observable = this.scrollSubject.asObservable();
		this.scrollObservable =
			merge(
				observable.pipe(throttleTime(300)),
				observable.pipe(debounceTime(100))
			);
		this.scrollObservable
			.subscribe(x => {
				this.scrollNotify.emit(x);
			});
		this.currentViewport = Rect.fromWindow(globalThis);
	}

	getObserver(): IntersectionObserver {
		if (this.intersectionObserver) {
			return this.intersectionObserver;
		}
		this.intersectionObserver = new IntersectionObserver(entries => {
			this.observeNotify.next(entries);
		}, { threshold: 0 });
		return this.intersectionObserver;
	}

	notifyScroll(event: ScrollEvent): void {
		if (this.hasIntersectionObserver) {
			return;
		}
		const rect = event.element ? Rect.fromElement(event.element) : Rect.fromWindow(globalThis);
		const height = (rect.bottom - rect.top);
		rect.bottom += height;
		rect.top -= height;
		this.currentViewport = rect;
		this.scrollSubject.next({ rect });
	}

	private static checkIntersectionObserver(): boolean {
		return 'IntersectionObserver' in globalThis;
	}
}
