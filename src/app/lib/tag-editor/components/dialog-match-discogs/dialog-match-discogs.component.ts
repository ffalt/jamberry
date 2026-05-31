import { Component, type OnDestroy } from '@angular/core';
import type { DialogOverlay, DialogOverlayDialogConfig, DialogOverlayRef } from '@modules/dialog-overlay';
import { Subject, takeUntil } from 'rxjs';
import { MatchDiscogsComponent } from '../match-discogs/match-discogs.component';
import type { ReleaseMatching } from '../match-release/match-release.component';

@Component({
	selector: 'app-dialog-match-discogs',
	templateUrl: './dialog-match-discogs.component.html',
	imports: [MatchDiscogsComponent]
})
export class DialogMatchDiscogsComponent implements DialogOverlay<ReleaseMatching>, OnDestroy {
	data?: ReleaseMatching;
	private readonly unsubscribe = new Subject<void>();

	dialogInit(reference: DialogOverlayRef, options: Partial<DialogOverlayDialogConfig<ReleaseMatching>>): void {
		this.data = options.data;
		if (this.data) {
			this.data.close = (): void => {
				reference.close();
			};
		}
		reference.beforeClose()
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(() => {
				this.data = undefined;
			});
	}

	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}
}
