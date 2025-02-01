import {ChangeDetectorRef, Component, EventEmitter, Input, Output} from '@angular/core';
import {Matching} from '../../model/release-matching.helper';

@Component({
    selector: 'app-match-file-list',
    templateUrl: './match-file-list.component.html',
    styleUrls: ['./match-file-list.component.scss'],
    standalone: false
})
export class MatchFileListComponent {
	@Input() matchings: Array<Matching> = [];
	@Output() readonly dragStartRequest = new EventEmitter<{ event: DragEvent, match: Matching }>();

	constructor(private cd: ChangeDetectorRef) {
	}

	drag(event: DragEvent, match: Matching): void {
		this.cd.markForCheck();
		if (event.dataTransfer) {
			event.dataTransfer.setData('text', match.track.id);
		}
	}

}
