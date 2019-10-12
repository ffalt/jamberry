import {Component, OnDestroy} from '@angular/core';
import {DialogOverlay, DialogOverlayDialogConfig, DialogOverlayRef} from '@app/modules/dialog-overlay';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {ReleaseMatching} from '../match-release/match-release.component';

@Component({
	selector: 'app-dialog-match-release',
	templateUrl: 'dialog-match-release.component.html',
	styleUrls: ['dialog-match-release.component.scss']
})
export class DialogMatchReleaseComponent implements DialogOverlay<ReleaseMatching>, OnDestroy {
	data: ReleaseMatching;
	protected unsubscribe = new Subject();

	dialogInit(reference: DialogOverlayRef, options: Partial<DialogOverlayDialogConfig<ReleaseMatching>>): void {
		this.data = options.data;
		options.data.close = () => {
			reference.close();
		};
		reference.beforeClose()
			.pipe(takeUntil(this.unsubscribe)).subscribe(() => {
			this.data = undefined;
		});
	}

	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}

}
