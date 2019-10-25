import {Component, ViewChild} from '@angular/core';
import {ContextMenuHostComponentInterface} from '@app/modules/context-menu';
import {ContextMenuComponent} from '@app/modules/context-menu/context-menu.component';
import {NavigService, PlayerService} from '@core/services';
import {ActionsService, PlaylistDialogsService} from '@shared/services';

export interface ContextMenuTrackComponentOptions {
	showGoTo: boolean;
}

@Component({
	selector: 'app-context-menu-track',
	templateUrl: './context-menu-track.component.html',
	styleUrls: ['./context-menu-track.component.scss']
})
export class ContextMenuTrackComponent implements ContextMenuHostComponentInterface<ContextMenuTrackComponentOptions> {
	@ViewChild('trackMenu') contextMenu: ContextMenuComponent;
	showGoTo: boolean = true;

	constructor(
		public navig: NavigService, public player: PlayerService, public actions: ActionsService,
		public playlistDialogsService: PlaylistDialogsService
	) {

	}

	initOpts(opts: ContextMenuTrackComponentOptions): void {
		this.showGoTo = opts.showGoTo;
	}

}
