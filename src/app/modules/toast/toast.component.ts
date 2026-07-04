import { Component, DestroyRef, inject, signal, ViewEncapsulation } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DefaultNoComponentGlobalConfig, type IndividualConfig, ToastPackage } from './toast-config';

@Component({
	selector: 'app-toast-component',
	templateUrl: './toast.component.html',
	styleUrls: ['./toast.component.scss'],
	// eslint-disable-next-line @angular-eslint/use-component-view-encapsulation
	encapsulation: ViewEncapsulation.None,
	preserveWhitespaces: false,
	host: {
		'[class]': 'toastClasses',
		'[style.display]': 'displayStyle',
		'[style.opacity]': 'opacityStyle',
		'[style.transition]': 'transitionStyle',
		'(click)': 'tapToast()',
		'(mouseenter)': 'stickAround()',
		'(mouseleave)': 'delayedHideToast()'
	}
})
export class ToastComponent {
	message?: string;
	title?: string;
	options: IndividualConfig;
	originalTimeout?: number;
	/** a combination of toast type and options.toastClass */
	toastClasses = '';
	readonly duplicatesCount = signal<number | undefined>(undefined);
	/** width of progress bar */
	readonly width = signal(-1);
	/** controls animation */
	readonly state = signal({
		value: 'inactive',
		params: {
			easeTime: DefaultNoComponentGlobalConfig.easeTime,
			easing: 'ease-in'
		}
	});

	private readonly toastPackage = inject(ToastPackage);
	private readonly lifeRef = inject(DestroyRef);
	private timeout?: ReturnType<typeof setTimeout>;
	private intervalId?: ReturnType<typeof setInterval>;
	private hideTime?: number;

	constructor() {
		this.message = this.toastPackage.message;
		this.title = this.toastPackage.title;
		this.options = this.toastPackage.config;
		this.originalTimeout = this.toastPackage.config.timeOut;
		this.toastClasses = `${this.toastPackage.toastType} ${this.toastPackage.config.toastClass}`;
		this.state.update(s => ({ ...s, params: { ...s.params, easeTime: this.toastPackage.config.easeTime || DefaultNoComponentGlobalConfig.easeTime } }));
		this.toastPackage.toastRef.afterActivate()
			.pipe(takeUntilDestroyed(this.lifeRef))
			.subscribe(() => { this.activateToast(); });
		this.toastPackage.toastRef.manualClosed()
			.pipe(takeUntilDestroyed(this.lifeRef))
			.subscribe(() => { this.remove(); });
		this.toastPackage.toastRef.timeoutReset()
			.pipe(takeUntilDestroyed(this.lifeRef))
			.subscribe(() => { this.resetTimeout(); });
		this.toastPackage.toastRef.countDuplicate()
			.pipe(takeUntilDestroyed(this.lifeRef))
			.subscribe(count => { this.duplicatesCount.set(count); });
		this.lifeRef.onDestroy(() => {
			clearInterval(this.intervalId);
			clearTimeout(this.timeout);
		});
	}

	/** hides component when waiting to be displayed */
	get displayStyle(): string {
		return this.state().value === 'inactive' ? 'none' : 'inherit';
	}

	get opacityStyle(): number {
		return this.state().value === 'active' ? 1 : 0;
	}

	get transitionStyle(): string {
		const { easeTime, easing } = this.state().params;
		return `opacity ${easeTime}ms ${easing}`;
	}

	/**
	 * activates toast and sets timeout
	 */
	activateToast(): void {
		this.state.update(s => ({ ...s, value: 'active' }));
		if (!this.options.disableTimeOut && this.options.timeOut) {
			this.outsideTimeout(() => {
				this.remove();
			}, this.options.timeOut);
			this.hideTime = Date.now() + this.options.timeOut;
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
		const w = this.width();
		if (w === 0 || w === 100 || !this.options.timeOut) {
			return;
		}
		const now = Date.now();
		const remaining = (this.hideTime ?? 0) - now;
		let next = (remaining / this.options.timeOut) * 100;
		if (this.options.progressAnimation === 'increasing') {
			next = 100 - next;
		}
		this.width.set(Math.min(100, Math.max(0, next)));
	}

	resetTimeout(): void {
		clearTimeout(this.timeout);
		clearInterval(this.intervalId);
		this.state.update(s => ({ ...s, value: 'active' }));
		this.outsideTimeout(() => {
			this.remove();
		}, this.originalTimeout ?? 0);
		this.options.timeOut = this.originalTimeout ?? 0;
		this.hideTime = Date.now() + (this.options.timeOut ?? 0);
		this.width.set(-1);
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
		if (this.state().value === 'removed') {
			return;
		}
		clearTimeout(this.timeout);
		this.state.update(s => ({ ...s, value: 'removed' }));
		this.outsideTimeout(
			() => {
				this.toastPackage.toastRemove();
			},
			Number(this.toastPackage.config.easeTime)
		);
	}

	tapToast(): void {
		if (this.state().value === 'removed') {
			return;
		}
		this.toastPackage.triggerTap();
		if (this.options.tapToDismiss) {
			this.remove();
		}
	}

	stickAround(): void {
		if (this.state().value === 'removed') {
			return;
		}
		clearTimeout(this.timeout);
		this.options.timeOut = 0;
		this.hideTime = 0;
		// disable progressBar
		clearInterval(this.intervalId);
		this.width.set(0);
	}

	delayedHideToast(): void {
		if (
			this.options.disableTimeOut ||
			this.options.extendedTimeOut === 0 ||
			this.state().value === 'removed'
		) {
			return;
		}
		this.outsideTimeout(() => {
			this.remove();
		}, this.options.extendedTimeOut);
		this.options.timeOut = this.options.extendedTimeOut;
		this.hideTime = Date.now() + (this.options.timeOut || 0);
		this.width.set(-1);
		if (this.options.progressBar) {
			this.outsideInterval(() => {
				this.updateProgress();
			}, 10);
		}
	}

	outsideTimeout(func: () => void, timeout: number): void {
		this.timeout = setTimeout(func, timeout);
	}

	outsideInterval(func: () => void, timeout: number): void {
		this.intervalId = setInterval(func, timeout);
	}
}
