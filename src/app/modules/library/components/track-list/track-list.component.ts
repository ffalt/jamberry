import {Component, Input} from '@angular/core';
import {ContextMenuService} from '@app/modules/context-menu';
import {NavigService, PlayerService} from '@core/services';
import {Jam} from '@jam';
import {ActionsService} from '@shared/services';
import {ContextMenuTrackComponent, ContextMenuTrackComponentOptions} from '../context-menu-track/context-menu-track.component';

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
		private contextMenuService: ContextMenuService
	) {
	}

	onContextMenu($event: MouseEvent, item: Jam.Track): void {
		this.contextMenuService.open<ContextMenuTrackComponentOptions>(ContextMenuTrackComponent, item, $event, {showGoTo: true});
	}

	tapTrack(event, track: Jam.Track): void {
		if (event.tapCount === 2) {
			this.player.startTrack(track);
		}
	}
}
