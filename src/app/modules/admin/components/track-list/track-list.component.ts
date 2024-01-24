import {Component, Input, OnChanges} from '@angular/core';
import {Router} from '@angular/router';
import {Jam} from '@jam';

export interface TrackItem {
	track: Jam.Track;
	selected?: boolean;
}

@Component({
	selector: 'app-admin-track-list',
	templateUrl: './track-list.component.html',
	styleUrls: ['./track-list.component.scss']
})
export class TrackListComponent implements OnChanges {
	trackItems?: Array<TrackItem>;
	@Input() tracks: Array<Jam.Track> = [];

	constructor(private router: Router) {
	}

	getSortValue(column: string, trackItem: TrackItem): string | number | undefined {
		switch (column) {
			case 'number':
				return trackItem.track.tag?.trackNr;
			case 'name':
				return trackItem.track.name;
			case 'artist':
				return trackItem.track.tag?.artist;
			case 'album':
				return trackItem.track.tag?.album;
			case 'duration':
				return trackItem.track.duration;
			default:
				return;
		}
	}

	ngOnChanges(): void {
		this.trackItems = (this.tracks || []).map(track => ({track}));
	}

	toTrackFolder(track: Jam.Track): void {
		this.router.navigate([`/admin/folder/${track.parentID}/overview`])
			.catch(e => {
				console.error(e);
			});
	}
}
