import {OverlayRef} from '@angular/cdk/overlay';
import {Observable, Subject} from 'rxjs';

import {DialogOverlayComponent} from './dialog-overlay.component';

export class DialogOverlayRef {
	componentInstance?: DialogOverlayComponent;

	private _beforeClose = new Subject<any>();
	private _afterClosed = new Subject<any>();

	constructor(private overlayRef: OverlayRef) {
	}

	close(): void {
		if (!this.componentInstance) {
			return;
		}
		const result = this.componentInstance.getResult();
		this._beforeClose.next(result);
		this._beforeClose.complete();
		this.overlayRef.detachBackdrop();
		this.overlayRef.dispose();
		this._afterClosed.next(result);
		this._afterClosed.complete();
		this.componentInstance = undefined;
	}

	afterClosed(): Observable<any> {
		return this._afterClosed.asObservable();
	}

	beforeClose(): Observable<any> {
		return this._beforeClose.asObservable();
	}
}
