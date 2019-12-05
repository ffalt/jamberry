import {SelectionModel} from '@angular/cdk/collections';
import {Component, Input, OnChanges, OnDestroy, SimpleChanges} from '@angular/core';
import {Router} from '@angular/router';
import {Jam} from '@jam';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {JamDataSource} from '../../model/data-source';

export interface TrackItem {
	track: Jam.Track;
	selected?: boolean;
}

@Component({
	selector: 'app-admin-track-list',
	templateUrl: './track-list.component.html',
	styleUrls: ['./track-list.component.scss']
})
export class TrackListComponent implements OnChanges, OnDestroy {
	dataSource: JamDataSource<TrackItem>;
	displayedColumns: Array<string> = ['number', 'name', 'album', 'artist', 'format', 'bitRate', 'sampleRate', 'duration'];
	selection = new SelectionModel<TrackItem>(true, undefined);
	@Input() tracks: Array<Jam.Track> = [];
	@Input() showMore: boolean = false;
	protected unsubscribe = new Subject();

	constructor(private router: Router) {
		this.selection.changed
			.pipe(takeUntil(this.unsubscribe)).subscribe(a => {
			a.added.forEach(item => item.selected = true);
			a.removed.forEach(item => item.selected = false);
		});
	}

	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}

	getSortValue(column: string, trackItem: TrackItem): string | number | undefined {
		switch (column) {
			case 'number':
				return trackItem.track.tag.trackNr;
			case 'name':
				return trackItem.track.name;
			case 'artist':
				return trackItem.track.tag.artist;
			case 'album':
				return trackItem.track.tag.album;
			case 'duration':
				return trackItem.track.duration;
			default:
				break;
		}
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (this.tracks) {
			this.dataSource = new JamDataSource<TrackItem>(this.tracks.map(track => ({track})), this.getSortValue.bind(this));
		}
		const index = this.displayedColumns.indexOf('more');
		if (this.showMore) {
			if (index < 0) {
				this.displayedColumns.push('more');
			}
		} else {
			if (index >= 0) {
				this.displayedColumns = this.displayedColumns.splice(index, 1);
			}
		}
	}

	toTrackFolder(track: Jam.Track): void {
		this.router.navigate([`/admin/folder/${track.parentID}/overview`])
			.catch(e => {
				console.error(e);
			});
	}
}
