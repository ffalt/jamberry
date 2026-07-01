import { Component, DestroyRef, inject, signal } from '@angular/core';
import type { DialogOverlay, DialogOverlayDialogConfig, DialogOverlayRef } from '@modules/dialog-overlay';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatchReleaseComponent, type ReleaseMatching } from '../match-release/match-release.component';

@Component({
	selector: 'app-dialog-match-release',
	templateUrl: './dialog-match-release.component.html',
	imports: [MatchReleaseComponent]
})
export class DialogMatchReleaseComponent implements DialogOverlay<ReleaseMatching> {
	readonly data = signal<ReleaseMatching | undefined>(undefined);
	private readonly lifeRef = inject(DestroyRef);

	dialogInit(reference: DialogOverlayRef, options: Partial<DialogOverlayDialogConfig<ReleaseMatching>>): void {
		const d = options.data;
		if (d) {
			d.close = (): void => {
				reference.close();
			};
		}
		this.data.set(d);
		reference.beforeClose()
			.pipe(takeUntilDestroyed(this.lifeRef))
			.subscribe(() => {
				this.data.set(undefined);
			});
	}
}
