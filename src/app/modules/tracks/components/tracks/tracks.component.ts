import {Component, Input, ViewChild} from '@angular/core';
import {ContextMenuService} from '@app/modules/context-menu';
import {ContextMenuTrackComponent} from '../context-menu-track/context-menu-track.component';
import {NavigService, PlayerService} from '@core/services';
import {Jam} from '@jam';
import {ActionsService} from '@shared/services';

@Component({
	selector: 'app-tracks',
	templateUrl: 'tracks.component.html',
	styleUrls: ['tracks.component.scss']
})
export class TracksComponent {
	@Input() tracks: Array<Jam.Track>;
	@Input() showArtist: boolean = false;
	@Input() showRating: boolean = false;
	@Input() showPlayCount: boolean = false;
	@Input() showPlayDate: boolean = false;
	@ViewChild(ContextMenuTrackComponent, {static: true}) trackMenu: ContextMenuTrackComponent;

	constructor(
		public navig: NavigService, public player: PlayerService, public actions: ActionsService,
		private contextMenuService: ContextMenuService
	) {
	}

	onContextMenu($event: MouseEvent, track: Jam.Track): void {
		this.contextMenuService.show.next({contextMenu: this.trackMenu.contextMenu, event: $event, item: track});
		$event.preventDefault();
		$event.stopPropagation();
	}

	tapTrack(event, track: Jam.Track): void {
		if (event.tapCount === 2) {
			this.player.startTrack(track);
		}
	}
}
