import {OverlayRef} from '@angular/cdk/overlay';
import {Observable, Subject} from 'rxjs';

/**
 * Reference to a toast opened via the Toastr service.
 */
export class ToastRef<T> {
	/** The instance of component opened into the toast. */
	componentInstance!: T;

	/** Count of duplicates of this toast */
	private duplicatesCount = 0;

	/** Subject for notifying the user that the toast has finished closing. */
	private readonly afterClosedSubj = new Subject<void>();
	/** triggered when toast is activated */
	private readonly activateSubj = new Subject<void>();
	/** notifies the toast that it should close before the timeout */
	private readonly manualCloseSubj = new Subject<void>();
	/** notifies the toast that it should reset the timeouts */
	private readonly resetTimeoutSubj = new Subject<void>();
	/** notifies the toast that it should count a duplicate toast */
	private readonly countDuplicateSubj = new Subject<number>();
	private isActivateCompleted = false;

	constructor(private readonly overlayRef: OverlayRef) {
	}

	manualClose(): void {
		this.manualCloseSubj.next();
		this.manualCloseSubj.complete();
	}

	manualClosed(): Observable<any> {
		return this.manualCloseSubj.asObservable();
	}

	timeoutReset(): Observable<any> {
		return this.resetTimeoutSubj.asObservable();
	}

	countDuplicate(): Observable<number> {
		return this.countDuplicateSubj.asObservable();
	}

	/**
	 * Close the toast.
	 */
	close(): void {
		this.overlayRef.detach();
		this.afterClosedSubj.next();
		this.manualCloseSubj.next();
		this.afterClosedSubj.complete();
		this.manualCloseSubj.complete();
		this.activateSubj.complete();
		this.resetTimeoutSubj.complete();
		this.countDuplicateSubj.complete();
	}

	/** Gets an observable that is notified when the toast is finished closing. */
	afterClosed(): Observable<any> {
		return this.afterClosedSubj.asObservable();
	}

	isInactive(): boolean {
		return this.isActivateCompleted;
	}

	activate(): void {
		this.activateSubj.next();
		this.activateSubj.complete();
		this.isActivateCompleted = true;
	}

	/** Gets an observable that is notified when the toast has started opening. */
	afterActivate(): Observable<any> {
		return this.activateSubj.asObservable();
	}

	/** Reset the toast timouts and count duplicates */
	onDuplicate(resetTimeout: boolean, countDuplicate: boolean): void {
		if (resetTimeout) {
			this.resetTimeoutSubj.next();
		}
		if (countDuplicate) {
			this.duplicatesCount++;
			this.countDuplicateSubj.next(this.duplicatesCount);
		}
	}
}
