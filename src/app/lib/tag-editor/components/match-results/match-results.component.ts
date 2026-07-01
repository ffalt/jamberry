import { Component, input, output } from '@angular/core';
import type { Matcher } from '../match-release/matcher';
import type { MatchingTrack, MatchRelease, MatchReleaseGroup } from '../../model/release-matching.helper';
import { ScoreBoxComponent } from '../score-box/score-box.component';
import { CommonModule } from '@angular/common';
import { JsonPipe } from '@core/pipes/json.pipe';
import { MbArtistCreditsPipe } from '@core/pipes/mb-artist-credits.pipe';
import { IconCheckmarkComponent } from '@core/components/icons/icon-checkmark.component';
import { IconMinusComponent } from '@core/components/icons/icon-minus.component';
import { IconPlusComponent } from '@core/components/icons/icon-plus.component';
import { IconTrashComponent } from '@core/components/icons/icon-trash.component';
import { IconWarningComponent } from '@core/components/icons/icon-warning.component';

@Component({
	selector: 'app-match-results',
	templateUrl: './match-results.component.html',
	styleUrls: ['./match-results.component.scss'],
	imports: [CommonModule, IconCheckmarkComponent, IconMinusComponent, IconPlusComponent, IconTrashComponent, IconWarningComponent, JsonPipe, MbArtistCreditsPipe, ScoreBoxComponent]
})
export class MatchResultsComponent {
	readonly matcher = input<Matcher>();
	readonly chooseReleaseRequest = output<{
		group: MatchReleaseGroup;
		release: MatchRelease;
	}>();

	chooseRelease(group: MatchReleaseGroup, release: MatchRelease): void {
		this.chooseReleaseRequest.emit({ group, release });
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
		this.matcher()?.selectMatch(id, group, release, track);
	}
}
