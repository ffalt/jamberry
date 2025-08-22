import { Component, inject, input, type OnChanges } from '@angular/core';
import { Router } from '@angular/router';
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
	private readonly router = inject(Router);

	getSortValue(column: string, trackItem: TrackItem): string | number | undefined {
		switch (column) {
			case 'number': {
				return trackItem.track.tag?.trackNr;
			}
			case 'name': {
				return trackItem.track.name;
			}
			case 'artist': {
				return trackItem.track.tag?.artist;
			}
			case 'album': {
				return trackItem.track.tag?.album;
			}
			case 'duration': {
				return trackItem.track.duration;
			}
			default: {
				return;
			}
		}
	}

	ngOnChanges(): void {
		this.trackItems = this.tracks().map(track => ({ track }));
	}

	toTrackFolder(track: Jam.Track): void {
		this.router.navigate([`/admin/folder/${track.parentID}/overview`])
			.catch((error: unknown) => {
				console.error(error);
			});
	}
}
