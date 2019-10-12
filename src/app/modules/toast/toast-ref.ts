import {OverlayRef} from '@angular/cdk/overlay';
import {Observable, Subject} from 'rxjs';

/**
 * Reference to a toast opened via the Toastr service.
 */
export class ToastRef<T> {
	/** The instance of component opened into the toast. */
	componentInstance: T;

	/** Count of duplicates of this toast */
	private duplicatesCount = 0;

	/** Subject for notifying the user that the toast has finished closing. */
	private _afterClosed = new Subject<any>();
	/** triggered when toast is activated */
	private _activate = new Subject<any>();
	/** notifies the toast that it should close before the timeout */
	private _manualClose = new Subject<any>();
	/** notifies the toast that it should reset the timeouts */
	private _resetTimeout = new Subject<any>();
	/** notifies the toast that it should count a duplicate toast */
	private _countDuplicate = new Subject<number>();

	constructor(private _overlayRef: OverlayRef) {
	}

	manualClose(): void {
		this._manualClose.next();
		this._manualClose.complete();
	}

	manualClosed(): Observable<any> {
		return this._manualClose.asObservable();
	}

	timeoutReset(): Observable<any> {
		return this._resetTimeout.asObservable();
	}

	countDuplicate(): Observable<number> {
		return this._countDuplicate.asObservable();
	}

	/**
	 * Close the toast.
	 */
	close(): void {
		this._overlayRef.detach();
		this._afterClosed.next();
		this._manualClose.next();
		this._afterClosed.complete();
		this._manualClose.complete();
		this._activate.complete();
		this._resetTimeout.complete();
		this._countDuplicate.complete();
	}

	/** Gets an observable that is notified when the toast is finished closing. */
	afterClosed(): Observable<any> {
		return this._afterClosed.asObservable();
	}

	isInactive(): boolean {
		return this._activate.isStopped;
	}

	activate(): void {
		this._activate.next();
		this._activate.complete();
	}

	/** Gets an observable that is notified when the toast has started opening. */
	afterActivate(): Observable<any> {
		return this._activate.asObservable();
	}

	/** Reset the toast timouts and count duplicates */
	onDuplicate(resetTimeout: boolean, countDuplicate: boolean): void {
		if (resetTimeout) {
			this._resetTimeout.next();
		}
		if (countDuplicate) {
			this.duplicatesCount++;
			this._countDuplicate.next(this.duplicatesCount);
		}
	}
}
