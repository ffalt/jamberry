import {Component} from '@angular/core';
import {ContextMenuService} from '@app/modules/ngx-contextmenu';
import {TabComponent} from '@app/modules/tab-portal';
import {NavigService, PlayerService} from '@core/services';
import {Jam} from '@jam';
import {ActionsService} from '@shared/services';

@Component({
	selector: 'app-player-current-info',
	templateUrl: './player-current-info.component.html',
	styleUrls: ['./player-current-info.component.scss']
})
export class PlayerCurrentInfoComponent implements TabComponent {

	constructor(
		public player: PlayerService, public navig: NavigService,
		public actions: ActionsService, private contextMenuService: ContextMenuService) {
	}

	onActivate(): void {
		//
	}

	onContextMenu($event: Event, item: Jam.Track): void {
		//TODO: context-menu this.contextMenuService.open(ContextMenuQueueTrackComponent, item, $event);
	}

}
