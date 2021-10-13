import {Component, Input} from '@angular/core';
import {NavigService, PlayerService} from '@core/services';
import {Jam, JamObjectType} from '@jam';
import {JamEpisodeObject, JamTrackObject} from '@library/model/objects';
import {LibraryService} from '@library/services';
import {ActionsService} from '@shared/services';

@Component({
	selector: 'app-media-list',
	templateUrl: './media-list.component.html',
	styleUrls: ['./media-list.component.scss']
})
export class MediaListComponent {
	@Input() entries?: Array<Jam.MediaBase>;
	@Input() showArtist: boolean = false;
	@Input() showRating: boolean = false;
	@Input() showPlayCount: boolean = false;
	@Input() showPlayDate: boolean = false;

	constructor(private library: LibraryService, public navig: NavigService, public player: PlayerService, public actions: ActionsService) {
	}

	onContextMenu($event: Event, item: Jam.MediaBase): void {
		const obj = item.objType === JamObjectType.track ? new JamTrackObject(item as Jam.Track, this.library) : new JamEpisodeObject(item as Jam.Episode, this.library);
		this.library.openJamObjectMenu(obj, $event);
	}

	tapTrack(event: Event & { tapCount?: number }, track: Jam.MediaBase): void {
		if (event.tapCount === 2) {
			this.player.startTrack(track);
		}
	}
}
