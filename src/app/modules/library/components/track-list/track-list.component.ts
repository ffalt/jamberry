import {Component, Input} from '@angular/core';
import {NavigService, PlayerService} from '@core/services';
import {Jam} from '@jam';
import {JamTrackObject} from '@library/model/objects';
import {LibraryService} from '@library/services';
import {ActionsService} from '@shared/services';

@Component({
    selector: 'app-track-list',
    templateUrl: './track-list.component.html',
    styleUrls: ['./track-list.component.scss'],
    standalone: false
})
export class TrackListComponent {
	@Input() tracks?: Array<Jam.Track>;
	@Input() showArtist: boolean = false;
	@Input() showRating: boolean = false;
	@Input() showPlayCount: boolean = false;
	@Input() showPlayDate: boolean = false;

	constructor(
		private library: LibraryService,
		public navig: NavigService, public player: PlayerService, public actions: ActionsService
	) {
	}

	onContextMenu($event: Event, item: Jam.Track): void {
		this.library.openJamObjectMenu(new JamTrackObject(item, this.library), $event);
	}

	playTrack(track: Jam.Track): void {
		this.player.startTrack(track);
	}

	tapTrack(event: Event & { tapCount?: number }, track: Jam.Track): void {
		if (event.tapCount === 2) {
			this.player.startTrack(track);
		}
	}
}
