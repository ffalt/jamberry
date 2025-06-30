import {Component, inject, input} from '@angular/core';
import {NavigService, PlayerService} from '@core/services';
import {Jam, JamObjectType} from '@jam';
import {JamEpisodeObject, JamTrackObject} from '@library/model/objects';
import {LibraryService} from '@library/services';
import {ActionsService} from '@shared/services';

@Component({
	selector: 'app-media-list',
	templateUrl: './media-list.component.html',
	styleUrls: ['./media-list.component.scss'],
	standalone: false
})
export class MediaListComponent {
	readonly entries = input<Array<Jam.MediaBase>>();
	readonly showArtist = input<boolean>(false);
	readonly showRating = input<boolean>(false);
	readonly showPlayCount = input<boolean>(false);
	readonly showPlayDate = input<boolean>(false);
	readonly navig = inject(NavigService);
	readonly actions = inject(ActionsService);
	private readonly player = inject(PlayerService);
	private readonly library = inject(LibraryService);

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
