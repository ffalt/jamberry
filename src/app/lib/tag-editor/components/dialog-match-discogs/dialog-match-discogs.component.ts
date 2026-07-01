import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import type { DialogOverlay, DialogOverlayDialogConfig, DialogOverlayRef } from '@modules/dialog-overlay';
import { MatchDiscogsComponent } from '../match-discogs/match-discogs.component';
import type { ReleaseMatching } from '../match-release/match-release.component';

@Component({
	selector: 'app-dialog-match-discogs',
	templateUrl: './dialog-match-discogs.component.html',
	imports: [MatchDiscogsComponent]
})
export class DialogMatchDiscogsComponent implements DialogOverlay<ReleaseMatching> {
	readonly data = signal<ReleaseMatching | undefined>(undefined);
	private readonly lifeRef = inject(DestroyRef);

	dialogInit(reference: DialogOverlayRef, options: Partial<DialogOverlayDialogConfig<ReleaseMatching>>): void {
		const data = options.data;
		this.data.set(data);
		if (data) {
			data.close = (): void => {
				reference.close();
			};
		}
		reference.beforeClose()
			.pipe(takeUntilDestroyed(this.lifeRef))
			.subscribe(() => {
				this.data.set(undefined);
			});
	}
}
