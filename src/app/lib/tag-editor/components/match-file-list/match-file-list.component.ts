import { ChangeDetectorRef, Component, inject, input, output } from '@angular/core';
import type { Matching } from '../../model/release-matching.helper';
import { MbArtistCreditsPipe } from '@core/pipes/mb-artist-credits.pipe';

@Component({
	selector: 'app-match-file-list',
	templateUrl: './match-file-list.component.html',
	styleUrls: ['./match-file-list.component.scss'],
	imports: [MbArtistCreditsPipe]
})
export class MatchFileListComponent {
	readonly matchings = input<Array<Matching>>([]);
	readonly dragStartRequest = output<{
		event: DragEvent;
		match: Matching;
	}>();

	private readonly cd = inject(ChangeDetectorRef);

	drag(event: DragEvent, match: Matching): void {
		this.cd.markForCheck();
		if (event.dataTransfer) {
			event.dataTransfer.setData('text', match.track.id);
		}
	}
}
