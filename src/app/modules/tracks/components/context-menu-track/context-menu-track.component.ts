import {Component, Input, ViewChild} from '@angular/core';
import {ContextMenuComponent} from '@app/modules/context-menu/context-menu.component';
import {NavigService, PlayerService} from '@core/services';
import {Jam} from '@jam';
import {PlaylistService} from '@shared/services';
import {ActionsService} from '@shared/services';

@Component({
	selector: 'app-context-menu-track',
	templateUrl: 'context-menu-track.component.html',
	styleUrls: ['context-menu-track.component.scss']
})
export class ContextMenuTrackComponent {
	@Input() showGoTo: boolean = true;
	playlists: Array<Jam.Playlist> = [];
	@ViewChild('trackMenu') contextMenu: ContextMenuComponent;

	constructor(
		public navig: NavigService, public player: PlayerService, public actions: ActionsService,
		public playlistService: PlaylistService
	) {

	}

}
