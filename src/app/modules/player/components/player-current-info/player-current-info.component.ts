import {Component} from '@angular/core';
import {ContextMenuService} from '@app/modules/context-menu';
import {TabComponent} from '@app/modules/tab-portal';
import {NavigService, PlayerService} from '@core/services';
import {Jam} from '@jam';
import {ActionsService} from '@shared/services';
import {ContextMenuQueueTrackComponent} from '../context-menu-queue-track/context-menu-queue-track.component';

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

	onContextMenu($event: MouseEvent, item: Jam.Track): void {
		this.contextMenuService.open(ContextMenuQueueTrackComponent, item, $event);
	}

}
