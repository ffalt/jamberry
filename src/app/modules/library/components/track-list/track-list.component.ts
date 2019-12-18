import {Component, Input} from '@angular/core';
import {ContextMenuService} from '@app/modules/context-menu';
import {NavigService, PlayerService} from '@core/services';
import {Jam} from '@jam';
import {JamTrackObject} from '@library/model/objects';
import {LibraryService} from '@library/services';
import {ActionsService} from '@shared/services';
import {ContextMenuObjComponent, ContextMenuObjComponentOptions} from '../context-menu-obj/context-menu-obj.component';

@Component({
	selector: 'app-track-list',
	templateUrl: './track-list.component.html',
	styleUrls: ['./track-list.component.scss']
})
export class TrackListComponent {
	@Input() tracks: Array<Jam.Track>;
	@Input() showArtist: boolean = false;
	@Input() showRating: boolean = false;
	@Input() showPlayCount: boolean = false;
	@Input() showPlayDate: boolean = false;

	constructor(
		public navig: NavigService, public player: PlayerService, public actions: ActionsService,
		private contextMenuService: ContextMenuService, private library: LibraryService
	) {
	}

	onContextMenu($event: MouseEvent, item: Jam.Track): void {
		this.contextMenuService.open<ContextMenuObjComponentOptions>(ContextMenuObjComponent, new JamTrackObject(item, this.library), $event);
	}

	tapTrack(event, track: Jam.Track): void {
		if (event.tapCount === 2) {
			this.player.startTrack(track);
		}
	}
}
