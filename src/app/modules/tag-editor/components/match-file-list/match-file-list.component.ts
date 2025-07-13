import {ChangeDetectorRef, Component, inject, output, input} from '@angular/core';
import type {Matching} from '../../model/release-matching.helper';

@Component({
	selector: 'app-match-file-list',
	templateUrl: './match-file-list.component.html',
	styleUrls: ['./match-file-list.component.scss'],
	standalone: false
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
