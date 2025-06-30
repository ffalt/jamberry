import {Component, inject} from '@angular/core';
import {TabComponent} from '@app/modules/tab-portal';
import {NavigService, PlayerService} from '@core/services';
import {ActionsService} from '@shared/services';

@Component({
	selector: 'app-player-current-info',
	templateUrl: './player-current-info.component.html',
	styleUrls: ['./player-current-info.component.scss'],
	standalone: false
})
export class PlayerCurrentInfoComponent implements TabComponent {
	readonly player = inject(PlayerService);
	readonly navig = inject(NavigService);
	readonly actions = inject(ActionsService);

	onActivate(): void {
		//
	}

	onContextMenu(/*$event: Event, item: Jam.Track*/): void {
		//TODO: context-menu this.contextMenuService.open(ContextMenuQueueTrackComponent, item, $event);
	}
}
