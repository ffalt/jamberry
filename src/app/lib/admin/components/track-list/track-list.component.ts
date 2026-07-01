import { Component, input, type OnChanges } from '@angular/core';
import type { Jam } from '@jam';
import { DurationPipe } from '@core/pipes/duration.pipe';
import { BackgroundTextListComponent } from '@core/components/background-text-list/background-text-list.component';

export interface TrackItem {
	track: Jam.Track;
	selected?: boolean;
}

@Component({
	selector: 'app-admin-track-list',
	templateUrl: './track-list.component.html',
	styleUrls: ['./track-list.component.scss'],
	imports: [DurationPipe, BackgroundTextListComponent]
})
export class TrackListComponent implements OnChanges {
	readonly tracks = input<Array<Jam.Track>>([]);
	trackItems?: Array<TrackItem>;

	ngOnChanges(): void {
		this.trackItems = this.tracks().map(track => ({ track }));
	}
}
