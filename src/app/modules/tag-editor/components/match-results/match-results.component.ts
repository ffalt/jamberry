import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Matcher} from '@app/modules/tag-editor/components/match-release/matcher';
import {MatchingTrack, MatchRelease, MatchReleaseGroup} from '../../model/release-matching.helper';

@Component({
    selector: 'app-match-results',
    templateUrl: './match-results.component.html',
    styleUrls: ['./match-results.component.scss'],
    standalone: false
})
export class MatchResultsComponent {
	@Input() matcher?: Matcher;
	@Output() readonly chooseReleaseRequest = new EventEmitter<{ group: MatchReleaseGroup, release: MatchRelease }>();

	chooseRelease(group: MatchReleaseGroup, release: MatchRelease): void {
		this.chooseReleaseRequest.emit({group, release});
	}

	allowDrop(event: DragEvent): void {
		event.preventDefault();
	}

	drop(event: DragEvent, group: MatchReleaseGroup, release: MatchRelease, track: MatchingTrack): void {
		event.preventDefault();
		if (!event.dataTransfer) {
			return;
		}
		const id = event.dataTransfer.getData('text');
		this.matcher?.selectMatch(id, group, release, track);
	}

}
