import {type AfterViewInit, Directive, ElementRef, type OnDestroy, inject, output, input} from '@angular/core';
import type {Subscription} from 'rxjs';
import {DeferLoadService, type ScrollNotifyEvent} from './defer-load.service';
import {Rect} from './rect';

@Directive({
	selector: '[appDeferLoad]',
	standalone: false
})
export class DeferLoadDirective implements AfterViewInit, OnDestroy {
	readonly preRender = input<boolean>(false);
	readonly appDeferLoad = output();
	private readonly elementRef = inject(ElementRef);
	private readonly deferLoadService = inject(DeferLoadService);
	private intersectionObserver?: IntersectionObserver;
	private scrollSubscription?: Subscription;
	private observeSubscription?: Subscription;
	private timeoutId?: number;
	private readonly timeoutLoadMS: number = 50;

	ngAfterViewInit(): void {
		if (this.deferLoadService.isBrowser) {
			if (this.deferLoadService.hasIntersectionObserver) {
				this.registerIntersectionObserver();
			} else {
				this.addScrollListeners();
			}
		} else if (this.preRender()) {
			this.load();
		}
	}

	ngOnDestroy(): void {
		this.removeListeners();
	}

	private static getScrollPosition(): number {
		return window.scrollY + (document.documentElement.clientHeight || document.body.clientHeight);
	}

	private loadAndUnobserve(): void {
		this.load();
		if (this.intersectionObserver && this.elementRef.nativeElement) {
			this.intersectionObserver.unobserve(this.elementRef.nativeElement as Element);
		}
	}

	private cancelDelayLoad(): void {
		if (!this.timeoutId) {
			return; // do nothing if timeout doesn't exist
		}
		clearTimeout(this.timeoutId);
		this.timeoutId = undefined;
	}

	private delayLoad(): void {
		if (this.timeoutId) {
			return; // timeout was already set, do nothing
		}
		this.timeoutId = setTimeout(() => {
			this.loadAndUnobserve();
			this.cancelDelayLoad();
		}, this.timeoutLoadMS) as any;
	}

	private manageIntersection(entry: IntersectionObserverEntry): void {
		if (this.checkIfIntersecting(entry)) {
			this.delayLoad();
		} else {
			this.cancelDelayLoad();
		}
	}

	private registerIntersectionObserver(): void {
		if (this.intersectionObserver) {
			return;
		}
		this.intersectionObserver = this.deferLoadService.getObserver();
		if (this.intersectionObserver && this.elementRef.nativeElement) {
			this.intersectionObserver.observe(this.elementRef.nativeElement as Element);
			this.observeSubscription = this.deferLoadService.observeNotify
				.subscribe((entries: Array<IntersectionObserverEntry>) => {
					this.checkForIntersection(entries);
				});
		}
	}

	private checkForIntersection(entries: Array<IntersectionObserverEntry>): void {
		for (const entry of entries) {
			if (entry.target === this.elementRef.nativeElement) {
				this.manageIntersection(entry);
			}
		}
	};

	private checkIfIntersecting(entry: IntersectionObserverEntry): boolean {
		// For Samsung native browser, IO has been partially implemented where by the
		// callback fires, but entry object is empty. We will check manually.
		if (entry?.time) {
			return entry.isIntersecting;
		}
		return this.isVisible();
	}

	private load(): void {
		this.removeListeners();
		this.appDeferLoad.emit();
	}

	private loadFromScroll(): void {
		setTimeout(() => {
			this.load();
		});
	}

	private addScrollListeners(): void {
		this.scrollSubscription = this.deferLoadService.scrollNotify
			.subscribe((event: ScrollNotifyEvent) => {
				if (this.checkInView(event.rect)) {
					this.loadFromScroll();
				}
			});
		setTimeout(() => {
			if (this.checkInView(this.deferLoadService.currentViewport)) {
				this.loadFromScroll();
			}
		});
	}

	private removeListeners(): void {
		if (this.scrollSubscription) {
			this.scrollSubscription.unsubscribe();
		}
		if (this.observeSubscription) {
			this.observeSubscription.unsubscribe();
		}
	}

	private checkInView(rect: Rect): boolean {
		const elemRect = Rect.fromElement(this.elementRef.nativeElement);
		return elemRect.intersectsWithY(rect);
	}

	private isVisible(): boolean {
		const scrollPosition = DeferLoadDirective.getScrollPosition();
		const elementOffset = this.elementRef.nativeElement.offsetTop;
		return elementOffset <= scrollPosition;
	}
}
