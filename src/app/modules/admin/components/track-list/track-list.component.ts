import {Component, type OnChanges, inject, input} from '@angular/core';
import {Router} from '@angular/router';
import type {Jam} from '@jam';

export interface TrackItem {
	track: Jam.Track;
	selected?: boolean;
}

@Component({
	selector: 'app-admin-track-list',
	templateUrl: './track-list.component.html',
	styleUrls: ['./track-list.component.scss'],
	standalone: false
})
export class TrackListComponent implements OnChanges {
	trackItems?: Array<TrackItem>;
	readonly tracks = input<Array<Jam.Track>>([]);
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
		this.trackItems = (this.tracks() || []).map(track => ({track}));
	}

	toTrackFolder(track: Jam.Track): void {
		this.router.navigate([`/admin/folder/${track.parentID}/overview`])
			.catch(console.error);
	}
}
