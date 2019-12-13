import {Component, ViewChild} from '@angular/core';
import {ContextMenuHostComponentInterface} from '@app/modules/context-menu';
import {ContextMenuComponent} from '@app/modules/context-menu/context-menu.component';
import {NavigService, PlayerService} from '@core/services';
import {ActionsService, PlaylistDialogsService} from '@shared/services';

@Component({
	selector: 'app-context-menu-series',
	templateUrl: './context-menu-series.component.html',
	styleUrls: ['./context-menu-series.component.scss']
})
export class ContextMenuSeriesComponent implements ContextMenuHostComponentInterface<any> {
	@ViewChild('seriesMenu') contextMenu: ContextMenuComponent;

	constructor(
		public navig: NavigService, public player: PlayerService, public actions: ActionsService,
		public playlistDialogsService: PlaylistDialogsService
	) {

	}

}
