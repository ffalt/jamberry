import {OverlayRef} from '@angular/cdk/overlay';
import {Observable, Subject} from 'rxjs';

import {DialogOverlayComponent} from './dialog-overlay.component';

export class DialogOverlayRef {
	componentInstance?: DialogOverlayComponent;

	private beforeCloseSubj = new Subject<any>();
	private afterClosedSubj = new Subject<any>();

	constructor(private overlayRef: OverlayRef) {
	}

	close(): void {
		if (!this.componentInstance) {
			return;
		}
		const result = this.componentInstance.getResult();
		this.beforeCloseSubj.next(result);
		this.beforeCloseSubj.complete();
		this.overlayRef.detachBackdrop();
		this.overlayRef.dispose();
		this.afterClosedSubj.next(result);
		this.afterClosedSubj.complete();
		this.componentInstance = undefined;
	}

	afterClosed(): Observable<any> {
		return this.afterClosedSubj.asObservable();
	}

	beforeClose(): Observable<any> {
		return this.beforeCloseSubj.asObservable();
	}
}
