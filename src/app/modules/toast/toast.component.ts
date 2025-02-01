import {animate, state, style, transition, trigger} from '@angular/animations';
import {Component, HostBinding, HostListener, NgZone, OnDestroy, ViewEncapsulation} from '@angular/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {DefaultNoComponentGlobalConfig, IndividualConfig, ToastPackage} from './toast-config';

@Component({
    selector: 'app-toast-component',
    templateUrl: './toast.component.html',
    styleUrls: ['./toast.component.scss'],
    // eslint-disable-next-line @angular-eslint/use-component-view-encapsulation
    encapsulation: ViewEncapsulation.None,
    animations: [
        trigger('flyInOut', [
            state('inactive', style({ opacity: 0 })),
            state('active', style({ opacity: 1 })),
            state('removed', style({ opacity: 0 })),
            transition('inactive => active', animate('{{ easeTime }}ms {{ easing }}')),
            transition('active => removed', animate('{{ easeTime }}ms {{ easing }}'))
        ])
    ],
    preserveWhitespaces: false,
    standalone: false
})
export class ToastComponent implements OnDestroy {
	message?: string | undefined;
	title?: string;
	options: IndividualConfig;
	duplicatesCount?: number;
	originalTimeout?: number;
	/** width of progress bar */
	width = -1;
	/** a combination of toast type and options.toastClass */
	@HostBinding('class') toastClasses = '';

	/** controls animation */
	@HostBinding('@flyInOut') state = {
		value: 'inactive',
		params: {
			easeTime: DefaultNoComponentGlobalConfig.easeTime,
			easing: 'ease-in'
		}
	};

	/** hides component when waiting to be displayed */
	@HostBinding('style.display') get displayStyle(): string {
		if (this.state.value === 'inactive') {
			return 'none';
		}
		return 'inherit';
	}

	protected unsubscribe = new Subject<void>();

	private timeout: any;
	private intervalId: any;
	private hideTime?: number;

	constructor(public toastPackage: ToastPackage, protected ngZone?: NgZone) {
		this.message = toastPackage.message;
		this.title = toastPackage.title;
		this.options = toastPackage.config;
		this.originalTimeout = toastPackage.config.timeOut;
		this.toastClasses = `${toastPackage.toastType} ${
			toastPackage.config.toastClass
		}`;
		this.state.params.easeTime = this.toastPackage.config.easeTime || DefaultNoComponentGlobalConfig.easeTime;
		toastPackage.toastRef.afterActivate()
			.pipe(takeUntil(this.unsubscribe)).subscribe(() => {
			this.activateToast();
		});
		toastPackage.toastRef.manualClosed().pipe(takeUntil(this.unsubscribe))
			.subscribe(() => {
				this.remove();
			});
		toastPackage.toastRef.timeoutReset()
			.pipe(takeUntil(this.unsubscribe)).subscribe(() => {
			this.resetTimeout();
		});
		toastPackage.toastRef.countDuplicate()
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(count => {
				this.duplicatesCount = count;
			});
	}

	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
		clearInterval(this.intervalId);
		clearTimeout(this.timeout);
	}

	/**
	 * activates toast and sets timeout
	 */
	activateToast(): void {
		this.state = {...this.state, value: 'active'};
		if (!this.options.disableTimeOut && this.options.timeOut) {
			this.outsideTimeout(() => {
				this.remove();
			}, this.options.timeOut);
			this.hideTime = new Date().getTime() + this.options.timeOut;
			if (this.options.progressBar) {
				this.outsideInterval(() => {
					this.updateProgress();
				}, 10);
			}
		}
	}

	/**
	 * updates progress bar width
	 */
	updateProgress(): void {
		if (this.width === 0 || this.width === 100 || !this.options.timeOut) {
			return;
		}
		const now = new Date().getTime();
		const remaining = (this.hideTime || 0) - now;
		this.width = (remaining / this.options.timeOut) * 100;
		if (this.options.progressAnimation === 'increasing') {
			this.width = 100 - this.width;
		}
		if (this.width <= 0) {
			this.width = 0;
		}
		if (this.width >= 100) {
			this.width = 100;
		}
	}

	resetTimeout(): void {
		clearTimeout(this.timeout);
		clearInterval(this.intervalId);
		this.state = {...this.state, value: 'active'};

		this.outsideTimeout(() => {
			this.remove();
		}, this.originalTimeout || 0);
		this.options.timeOut = this.originalTimeout || 0;
		this.hideTime = new Date().getTime() + (this.options.timeOut || 0);
		this.width = -1;
		if (this.options.progressBar) {
			this.outsideInterval(() => {
				this.updateProgress();
			}, 10);
		}
	}

	/**
	 * tells toastService to remove this toast after animation time
	 */
	remove(): void {
		if (this.state.value === 'removed') {
			return;
		}
		clearTimeout(this.timeout);
		this.state = {...this.state, value: 'removed'};
		this.outsideTimeout(
			() => {
				this.toastPackage.toastRemove();
			},
			+this.toastPackage.config.easeTime
		);
	}

	@HostListener('click')
	tapToast(): void {
		if (this.state.value === 'removed') {
			return;
		}
		this.toastPackage.triggerTap();
		if (this.options.tapToDismiss) {
			this.remove();
		}
	}

	@HostListener('mouseenter')
	stickAround(): void {
		if (this.state.value === 'removed') {
			return;
		}
		clearTimeout(this.timeout);
		this.options.timeOut = 0;
		this.hideTime = 0;

		// disable progressBar
		clearInterval(this.intervalId);
		this.width = 0;
	}

	@HostListener('mouseleave')
	delayedHideToast(): void {
		if (
			this.options.disableTimeOut ||
			this.options.extendedTimeOut === 0 ||
			this.state.value === 'removed'
		) {
			return;
		}
		this.outsideTimeout(() => {
			this.remove();
		}, this.options.extendedTimeOut);
		this.options.timeOut = this.options.extendedTimeOut;
		this.hideTime = new Date().getTime() + (this.options.timeOut || 0);
		this.width = -1;
		if (this.options.progressBar) {
			this.outsideInterval(() => {
				this.updateProgress();
			}, 10);
		}
	}

	outsideTimeout(func: () => void, timeout: number): void {
		if (this.ngZone) {
			this.ngZone.runOutsideAngular(
				() =>
					(this.timeout = setTimeout(
						() => {
							this.runInsideAngular(func);
						},
						timeout
					))
			);
		} else {
			this.timeout = setTimeout(func, timeout);
		}
	}

	outsideInterval(func: () => void, timeout: number): void {
		if (this.ngZone) {
			this.ngZone.runOutsideAngular(
				() =>
					(this.intervalId = setInterval(
						() => {
							this.runInsideAngular(func);
						}, timeout
					))
			);
		} else {
			this.intervalId = setInterval(func, timeout);
		}
	}

	private runInsideAngular(func: () => void): void {
		if (this.ngZone) {
			this.ngZone.run(func);
		} else {
			func();
		}
	}
}
