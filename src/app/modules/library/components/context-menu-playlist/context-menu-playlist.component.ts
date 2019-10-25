import {Component, ViewChild} from '@angular/core';
import {ContextMenuHostComponentInterface} from '@app/modules/context-menu';
import {ContextMenuComponent} from '@app/modules/context-menu/context-menu.component';
import {NavigService, PlayerService} from '@core/services';
import {ActionsService, PlaylistDialogsService} from '@shared/services';

export interface ContextMenuPlaylistComponentOptions {
	canEdit: boolean;
}

@Component({
	selector: 'app-context-menu-playlist',
	templateUrl: 'context-menu-playlist.component.html',
	styleUrls: ['context-menu-playlist.component.scss']
})
export class ContextMenuPlaylistComponent implements ContextMenuHostComponentInterface<ContextMenuPlaylistComponentOptions> {
	@ViewChild('playlistMenu') contextMenu: ContextMenuComponent;
	canEdit: boolean = false;

	constructor(
		public navig: NavigService, public player: PlayerService, public actions: ActionsService,
		public playlistDialogsService: PlaylistDialogsService
	) {

	}

	initOpts(opts: ContextMenuPlaylistComponentOptions): void {
		this.canEdit = opts.canEdit;
	}

}
