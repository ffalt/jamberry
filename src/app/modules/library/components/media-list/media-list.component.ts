import {Component, Input} from '@angular/core';
import {ContextMenuService} from '@app/modules/context-menu';
import {NavigService, PlayerService} from '@core/services';
import {Jam, JamObjectType} from '@jam';
import {JamEpisodeObject, JamTrackObject} from '@library/model/objects';
import {LibraryService} from '@library/services';
import {ActionsService} from '@shared/services';
import {ContextMenuObjComponent, ContextMenuObjComponentOptions} from '../context-menu-obj/context-menu-obj.component';

@Component({
	selector: 'app-media-list',
	templateUrl: './media-list.component.html',
	styleUrls: ['./media-list.component.scss']
})
export class MediaListComponent {
	@Input() entries: Array<Jam.MediaBase>;
	@Input() showArtist: boolean = false;
	@Input() showRating: boolean = false;
	@Input() showPlayCount: boolean = false;
	@Input() showPlayDate: boolean = false;

	constructor(
		public navig: NavigService, public player: PlayerService, public actions: ActionsService,
		private contextMenuService: ContextMenuService, private library: LibraryService
	) {
	}

	onContextMenu($event: MouseEvent, item: Jam.MediaBase): void {
		const obj = item.objType === JamObjectType.track ? new JamTrackObject(item as Jam.Track, this.library) : new JamEpisodeObject(item as Jam.Episode, this.library);
		this.contextMenuService.open<ContextMenuObjComponentOptions>(ContextMenuObjComponent, obj, $event);
	}

	tapTrack(event, track: Jam.MediaBase): void {
		if (event.tapCount === 2) {
			this.player.startTrack(track);
		}
	}
}
